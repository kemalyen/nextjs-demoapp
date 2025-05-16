'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { FormSchema, formProductSchema } from "../../../../app/utils/validations/product"
import { createProductAction } from "@/app/actions"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";


export default function CreateProduct() {

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const form = useForm<z.infer<typeof formProductSchema>>({
        resolver: zodResolver(formProductSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0
        },
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = form;


    const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
        // call the server action
        console.log(data);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());

        console.log({ formData });
        // call the server action
        const { data: success, errors } = await createProductAction(formData);


        console.log(formData.get('name'), success, errors);

        if (errors) {
            console.error(errors);
            return;
        }

        if (success) {
            console.log("Product created successfully");
            form.reset();
            setShowSuccessModal(true);

        }
    };

    return (
        <div className="flex justify-center items-center w-full mt-6">
            <div className="w-full max-w-2xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Product description
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Product price
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

                {showSuccessModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow">
                            <p>Product created successfully!</p>
                            <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}
// Place this at the top level of your component, before the return statement
//const [showSuccessModal, setShowSuccessModal] = useState(false);

// Optionally, render a modal when showSuccessModal is true
// Example (add inside your return statement, e.g. after </Form>):
// {showSuccessModal && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white p-6 rounded shadow">
//       <p>Product created successfully!</p>
//       <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
//     </div>
//   </div>
// )}

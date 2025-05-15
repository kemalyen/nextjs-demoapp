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

import { FormSchema, formSchema } from "../../utils/validation"
import {submitForm} from "@/app/actions"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"


export default function CreateCustomer() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "kemal@example.com",
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
    console.log(data.name, data.email);

    const formData = new FormData();
    formData.append("name", data.name); 
    formData.append("email", data.email);
    // call the server action
    const { data: success, errors } = await submitForm(formData);


    console.log(formData.get('name'), success, errors);

    if (errors) {
      console.error(errors);
      return;
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
                    <Input placeholder="shadcn" {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
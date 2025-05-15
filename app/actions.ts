"use server";

import { formSchema } from "./utils/validation";
import { z } from "zod";

/* export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}; */

export async function submitForm(formData: FormData) {

    console.log("submitForm called");
    console.log({ formData });
    try {
        // fake a delay
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        //validate the FormData
        const validatedFields = formSchema.parse({
            name: formData.get("name"),
            email: formData.get("email"),
        });

        console.log({ validatedFields });

        // send validated data to database here

        return {
            errors: null,
            data: "data received and mutated",
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                errors: transformZodErrors(error),
                data: null,
            };
        }

        return {
            errors: {
                message: "An unexpected error occurred. Could not create shelf.",
            },
            data: null,
        };
    }
}
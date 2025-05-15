import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, "Name should be at least 3 characters"),
    email: z.string().email("Invalid email address"), 
});


export type FormSchema = z.infer<typeof formSchema>;
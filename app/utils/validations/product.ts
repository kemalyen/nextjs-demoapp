import { z } from "zod";

export const formProductSchema = z.object({
    name: z
        .string({ message: "Name is required" })
        .min(3, "Name should be at least 3 characters"),
    description: z.string({ message: "Description is required" })
        .min(3, "Description should be at least 3 characters"),
    price: z
        .coerce
        .number({ invalid_type_error: "Price must be a number",  required_error: "Price is required",}).int()
        .max(1000000, "Price should be at most 1,000,000")
        .min(1, "Price should be at least 1"),
    // .regex(/^\d+(\.\d{1,2})?$/, "Price should be a valid number"),
    // .refine((val) => val > 0, { message: "Price should be a positive number" }),
});


export type FormSchema = z.infer<typeof formProductSchema>;
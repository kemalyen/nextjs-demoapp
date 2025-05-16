"use server";

import { formProductSchema } from "../app/utils/validations/product";
import { z } from "zod";

import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { productsTable, usersTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

import { ZodError } from "zod";
 
export async function createProductAction(formData: FormData) {

    try {
        //validate the FormData
        const validatedFields = formProductSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
        });
  
        // send validated data to database here

        const product: typeof productsTable.$inferInsert = {
            name: validatedFields.name,
            price: validatedFields.price,
            description: validatedFields.description,
        };
       
        await db.insert(productsTable).values(product);
  
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
 
function transformZodErrors(error: z.ZodError<any>) {
    return error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
    }));
}

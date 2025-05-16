import { desc } from "drizzle-orm";
import { integer, pgTable, varchar, bigint, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().default(0),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const postsTable = pgTable("posts", {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    content: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    createdAt: bigint({ mode: "number" }),
    updatedAt: bigint({ mode: "number" }),
  });

  export const productsTable = pgTable("products", {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    price: integer().notNull(), 
    createdAt: bigint({ mode: "number" }),
    updatedAt: bigint({ mode: "number" }),
  });
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const bookTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().references(() => usersTable.id), 
  title: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 255 }),
  status: varchar({ length: 255 }).notNull(),
  rating: integer(),
  conclusion_date: varchar({ length: 255 }),
});
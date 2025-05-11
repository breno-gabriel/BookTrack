import db from "../db";
import { bookTable } from "../db/schema";
import { createBook } from "../interfaces/book";
import { eq } from "drizzle-orm";

async function createBookRepository(
  { title, author, status, avaliation }: createBook,
  user_id: string
) {
  await db
    .insert(bookTable)
    .values({ title, author, status, avaliation, user_id: Number(user_id) });
}

async function getBooksRepository() {
  const books = await db.select().from(bookTable);
  return books;
}

export { createBookRepository, getBooksRepository };

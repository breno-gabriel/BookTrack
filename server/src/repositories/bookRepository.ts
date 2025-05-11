import { eq } from "drizzle-orm";
import db from "../db";
import { bookTable } from "../db/schema";
import { createBook, updateBook } from "../interfaces/book";

async function createBookRepository(
  { title, author, status, avaliation }: createBook,
  user_id: string,
  conclusion_date: string | null
) {
  await db.insert(bookTable).values({
    title,
    author,
    status,
    avaliation,
    user_id: Number(user_id),
    conclusion_date,
  });
}

async function getBooksRepository() {
  const books = await db.select().from(bookTable);
  return books;
}

async function getBookByIdRepository(id: string) {
  const book = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.id, Number(id)));
  return book[0];
}

async function deleteBookRepository(id: string) {
  const result = await db.delete(bookTable).where(eq(bookTable.id, Number(id)));
  return result;
}

async function updateBookRepository(
  id: string,
  { title, author, status, avaliation }: updateBook,
  conclusion_date: string | null
) {
  const result = await db
    .update(bookTable)
    .set({ title, author, status, avaliation, conclusion_date })
    .where(eq(bookTable.id, Number(id)));
  return result;
}

export {
  createBookRepository,
  deleteBookRepository,
  getBookByIdRepository,
  getBooksRepository,
  updateBookRepository,
};

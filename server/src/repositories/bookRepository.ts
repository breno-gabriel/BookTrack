import db from "../db";
import { bookTable } from "../db/schema";
import { createBook } from "../interfaces/book";

async function createBookRepository(
  { title, author, status, avaliation }: createBook,
  user_id: string
) {
  await db
    .insert(bookTable)
    .values({ title, author, status, avaliation, user_id: Number(user_id) });
}

export { createBookRepository };

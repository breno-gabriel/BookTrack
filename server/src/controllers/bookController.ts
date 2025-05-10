import db from "../db";
import { bookTable } from "../db/schema";
import { BookStatus, createBook } from "../interfaces/book";
import { Request, Response } from "express";
import { createBookService } from "../services/bookService";

async function createBookController(req: Request, res: Response) {
  const { title, author, status, avaliation }: createBook = req.body;
  const user_id = req.user.id;

  const result = await createBookService({ title, author, status, avaliation }, user_id);

  res.status(result.status).json({ message: result.message });
  return;
}

export { createBookController };

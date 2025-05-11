import db from "../db";
import { bookTable } from "../db/schema";
import { BookStatus, createBook, updateBook } from "../interfaces/book";
import { Request, Response } from "express";
import { createBookService, deleteBookService, getBookByIdService, getBooksService, updateBookService } from "../services/bookService";

async function createBookController(req: Request, res: Response) {
  const { title, author, status, avaliation }: createBook = req.body;
  const user_id = req.user.id;

  const result = await createBookService(
    { title, author, status, avaliation },
    user_id
  );

  res.status(result.status).json({ message: result.message });
  return;
}

async function getBooksController(req: Request, res: Response) {
  const books = await getBooksService();
  res.json({ message: "Livros encontrados", books });
  return;
}

async function getBookByIdController(req: Request, res: Response) {
  const book = await getBookByIdService(req.params.id);
  res.json({ message: "Livro encontrado", book });
  return;
}

async function deleteBookController(req: Request, res: Response) {
  const book = await deleteBookService(req.params.id);
  res.json({ message: "Livro deletado", book });
  return;
}

async function updateBookController(req: Request, res: Response) {

    const { title, author, status, avaliation }: updateBook = req.body;
    const user_id = req.user.id;

  const result = await updateBookService(req.params.id, { title, author, status, avaliation }, user_id);
  res.status(result.status).json({ message: result.message });
  return;
}

export { createBookController, getBooksController, getBookByIdController, deleteBookController, updateBookController };

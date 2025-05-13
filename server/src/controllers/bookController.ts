import { Request, Response } from "express";
import { createBook, updateBook } from "../interfaces/book";
import {
  createBookService,
  deleteBookService,
  getBookByIdService,
  getBooksByUserIdService,
  getBooksService,
  updateBookService,
} from "../services/bookService";

async function createBookController(req: Request, res: Response) {

  const { title, author, status, rating }: createBook = req.body;
  console.log(req.body);
  const user_id = req.user.id;

  const result = await createBookService(
    { title, author, status, rating },
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
  const result = await deleteBookService(req.params.id, req.user.id);
  res.status(result.status).json({ message: result.message });
  return;
}

async function updateBookController(req: Request, res: Response) {
  const { title, author, status, rating }: updateBook = req.body;
  const user_id = req.user.id;
  const result = await updateBookService(
    req.params.id,
    {
      title,
      author,
      status,
      rating,
    },
    user_id
  );
  res.status(result.status).json({ message: result.message });
  return;
}

async function getBooksByUserIdController(req: Request, res: Response) {
  const books = await getBooksByUserIdService(req.params.id);
  res.json({ message: "Livros encontrados", books });
  return;
}

export {
  createBookController,
  deleteBookController,
  getBookByIdController, getBooksByUserIdController, getBooksController,
  updateBookController
};


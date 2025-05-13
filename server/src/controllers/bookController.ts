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
  try {
    const { title, author, status, avaliation }: createBook = req.body;
    const user_id = req.user.id;

    const result = await createBookService(
      { title, author, status, avaliation },
      user_id
    );

    res.status(result.status).json({ message: result.message });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getBooksController(req: Request, res: Response) {
  try {
    const books = await getBooksService();
    res.json({ message: "Livros encontrados", books });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getBookByIdController(req: Request, res: Response) {
  try {
    const book = await getBookByIdService(req.params.id);
    res.json({ message: "Livro encontrado", book });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteBookController(req: Request, res: Response) {
  try {
    const result = await deleteBookService(req.params.id, req.user.id);
    res.status(result.status).json({ message: result.message });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateBookController(req: Request, res: Response) {
  try {
    const { title, author, status, avaliation }: updateBook = req.body;
    const user_id = req.user.id;
    const result = await updateBookService(
      req.params.id,
      {
        title,
        author,
        status,
        avaliation,
      },
      user_id
    );
    res.status(result.status).json({ message: result.message });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getBooksByUserIdController(req: Request, res: Response) {
  try {
    const books = await getBooksByUserIdService(req.params.id);
    res.json({ message: "Livros encontrados", books });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  createBookController,
  deleteBookController,
  getBookByIdController,
  getBooksController,
  updateBookController,
  getBooksByUserIdController,
};

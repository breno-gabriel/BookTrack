import { Request, Response } from "express";
import { createBook, updateBook } from "../interfaces/book";
import {
  createBookService,
  deleteBookService,
  exportBooksService,
  getBookByIdService,
  getBooksByUserIdService,
  getBooksService,
  updateBookService,
} from "../services/bookService";
import { getUserByIdService } from "../services/userService";

async function createBookController(req: Request, res: Response) {
  try {
    const { title, author, status, rating }: createBook = req.body;
    const user_id = req.user.id;

    const result = await createBookService(
      { title, author, status, rating },
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
    const { title, author, status, rating }: updateBook = req.body;
    const user_id = req.user.id;
    console.log(user_id);
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

async function exportBooksController(req: Request, res: Response) {
  try {
    const booksCsv = await exportBooksService(req.params.id);
    res.header('Content-Type', 'text/csv');
    res.attachment('meus_livros.csv'); 
    res.send(booksCsv);
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
  getBooksByUserIdController,
  getBooksController,
  updateBookController,
  exportBooksController,
};

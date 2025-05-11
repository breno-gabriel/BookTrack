import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { BookStatus, createBook } from "../interfaces/book";
import { Request, Response } from "express";
import db from "../db";
import { bookTable } from "../db/schema";
import { eq } from "drizzle-orm";
import {
  createBookController,
  deleteBookController,
  getBookByIdController,
  getBooksController,
} from "../controllers/bookController";

const bookRouter = Router();

bookRouter.post("/create", authenticateToken, createBookController);
bookRouter.get("/", authenticateToken, getBooksController);
bookRouter.get("/:id", authenticateToken, getBookByIdController);
bookRouter.delete("/delete/:id", authenticateToken, deleteBookController);
export { bookRouter };

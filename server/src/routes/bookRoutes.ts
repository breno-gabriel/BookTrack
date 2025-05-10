import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { BookStatus, createBook } from "../interfaces/book";
import { Request, Response } from "express";
import db from "../db";
import { bookTable } from "../db/schema";
import { createBookController } from "../controllers/bookController";
import { eq } from "drizzle-orm";

const bookRouter = Router();

bookRouter.post("/create", authenticateToken, createBookController);

export { bookRouter };

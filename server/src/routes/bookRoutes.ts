import { Router } from "express";
import {
  createBookController,
  deleteBookController,
  getBookByIdController,
  getBooksController,
  updateBookController,
  getBooksByUserIdController,
} from "../controllers/bookController";
import { authenticateToken } from "../middlewares/authMiddleware";

const bookRouter = Router();

bookRouter.post("/create", authenticateToken, createBookController);
bookRouter.get("/", authenticateToken, getBooksController);
bookRouter.get("/:id", authenticateToken, getBookByIdController);
bookRouter.delete("/delete/:id", authenticateToken, deleteBookController);
bookRouter.put("/update/:id", authenticateToken, updateBookController);
bookRouter.get("/user/:id", authenticateToken, getBooksByUserIdController);
export { bookRouter };

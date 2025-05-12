import { Router } from "express";
import {
  createBookController,
  deleteBookController,
  getBookByIdController,
  getBooksByUserIdController,
  getBooksController,
  updateBookController,
} from "../controllers/bookController";
import { authenticateToken } from "../middlewares/authMiddleware";

const bookRouter = Router();

bookRouter.post("/create", authenticateToken, createBookController);
bookRouter.get("/", authenticateToken, getBooksController);
bookRouter.get("/:id", authenticateToken, getBookByIdController);
bookRouter.get("/user/:id", authenticateToken, getBooksByUserIdController);
bookRouter.delete("/delete/:id", authenticateToken, deleteBookController);
bookRouter.put("/update/:id", authenticateToken, updateBookController);
export { bookRouter };

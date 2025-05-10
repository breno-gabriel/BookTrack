import { Router } from "express";
import {
  deleteUserByIdController,
  getAllUsersController,
  getUserByIdController,
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.get("/", authenticateToken, getAllUsersController);
userRouter.get("/:id", authenticateToken, getUserByIdController);
userRouter.delete("/delete/:id", authenticateToken, deleteUserByIdController);

export { userRouter };

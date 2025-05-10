import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { getAllUsersController, getUserByIdController, deleteUserByIdController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.get("/", authenticateToken, getAllUsersController);

userRouter.get("/:id", authenticateToken, getUserByIdController);

userRouter.delete("/delete/:id", authenticateToken, deleteUserByIdController);

export { userRouter };
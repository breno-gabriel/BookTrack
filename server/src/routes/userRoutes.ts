import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { getAllUsersController, getUserByIdController, deleteUserByIdController } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", getAllUsersController);

userRouter.get("/:id", getUserByIdController);

userRouter.delete("/delete/:id", deleteUserByIdController);

export { userRouter };
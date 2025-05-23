import { Request, Response } from "express";
import {
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
} from "../services/userService";

async function getAllUsersController(req: Request, res: Response) {
  try {
    const user = await getAllUsersService();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserByIdController(req: Request, res: Response) {
  try {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUserByIdController(req: Request, res: Response) {
  try {
    const user = await deleteUserByIdService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  deleteUserByIdController,
  getAllUsersController,
  getUserByIdController,
};

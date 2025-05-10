import { Request, Response } from "express";
import { validateUserLogin, validateUserRegister } from "../services/AuthService";

async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const result = await validateUserRegister({ name, email, password });

    res.status(result.code).json({ message: result.message });
    return;

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await validateUserLogin({ email, password });

    res.status(result.code).json({ message: result.message, token: result.token });
    return;

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { login, register };

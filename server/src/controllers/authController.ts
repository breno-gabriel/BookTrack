import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db";
import { usersTable } from "../db/schema";
import config from "../config/jwt";

async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (user.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .insert(usersTable)
      .values({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "User created successfully",
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));


    if (user.length == 0 || !(await bcrypt.compare(password, user[0].password))) {
      res.status(400).json({ message: "wrong email or password" });
      return;
    }

    const token = jwt.sign(
      { id: user[0].id, name: user[0].name, email: user[0].email },
      config.secret,
      { expiresIn: config.expiresIn }
    );

    res.status(200).json({
      message: "authentication successful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { login, register };
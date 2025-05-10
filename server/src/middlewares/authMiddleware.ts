import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/jwt";

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"] as string | undefined;

  if (!token) {
    res.status(401).json({ message: "Token is required" });
    return;
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      console.log(err);
      return;
    }

    next();
  });
};

export { authenticateToken };

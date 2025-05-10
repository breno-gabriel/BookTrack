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

  try{
    const decode = jwt.decode(token, config.secret);
    req.user = decode;
    console.log(req.user);
    next();
  }catch(error){
    console.log(error);
    res.status(401).json({ message: "Token is invalid" });
  }


};

export { authenticateToken };

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/jwt";
import { CreateUserDTO, LoginUserDTO } from "../interfaces/user";
import { getUserByEmail, insertUser } from "../repositories/userRepository";

async function validateUserRegister({ name, email, password }: CreateUserDTO) {
  if (!name || !email || !password) {
    throw { code: 400, message: "Missing required fields" };
  }

  const user = await getUserByEmail(email);

  if (user.length > 0) {
    return { code: 400, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await insertUser(name, email, hashedPassword);

  return {
    code: 201,
    message: "User created successfully",
  };
}

async function validateUserLogin({ email, password }: LoginUserDTO) {
  const user = await getUserByEmail(email);

  if (user.length == 0 || !(await bcrypt.compare(password, user[0].password))) {
    return { code: 400, message: "wrong email or password" };
  }

  const token = jwt.sign(
    { id: user[0].id, name: user[0].name, email: user[0].email },
    config.secret,
    { expiresIn: config.expiresIn }
  );

  return {
    code: 200,
    message: "User logged in successfully",
    token: token,
  };
}

export { validateUserLogin, validateUserRegister };

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/jwt";
import { getUserByEmail, insertUser } from "../repositories/authRepository";
import z from "zod";

const createUserSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.string().email("Digite um email válido"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

const loginUserSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

type CreateUserDTO = z.infer<typeof createUserSchema>;
type LoginUserDTO = z.infer<typeof loginUserSchema>;

async function validateUserRegister({ name, email, password }: CreateUserDTO) {

  const result = createUserSchema.safeParse({ name, email, password });

  if (!result.success) {
    return { code: 400, message: result.error.format() };
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

  loginUserSchema.parse({ email, password });

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

import z from "zod";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.string().email("Digite um email válido"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;




import { z } from "zod";

const StatusEnum = z.enum(["Quero Ler", "Lendo", "Lido"]);

export const bookSchema = z
  .object({
    title: z
      .string()
      .min(3, "Título deve ter no mínimo 3 caracteres")
      .max(100, "Título deve ter no máximo 100 caracteres"),

    author: z.string().optional(),

    status: StatusEnum,

    rating: z
      .number()
      .int()
      .min(1, "Avaliação deve ser no mínimo 1")
      .max(5, "Avaliação deve ser no máximo 5")
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    const isRead = data.status === "Lido";
    const hasRating = data.rating !== null && data.rating !== undefined;

    if (hasRating && !isRead) { 
      ctx.addIssue({
        path: ["rating"],
        message: "Só é possível avaliar livros com status 'Lido'",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export interface book {
  id: number;
  user_id: number;
  title: string;
  author: string;
  status: string;
  rating: number | null;
  conclusion_date: string | null;
}

export interface createBook {
  title: string;
  author?: string;
  status: string;
  rating?: number | null;
}

export interface updateBook {
  title?: string;
  author?: string;
  status?: string;
  rating?: number | null;
}

export enum BookStatus {
  QUERO_LER = "Quero Ler",
  LENDO = "Lendo",
  LIDO = "Lido",
}

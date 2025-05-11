import db from "../db";
import { bookTable } from "../db/schema";
import { BookStatus, createBook } from "../interfaces/book";
import {
  createBookRepository,
  getBookByIdRepository,
  getBooksRepository,
} from "../repositories/bookRepository";

async function createBookService(
  { title, author, status, avaliation }: createBook,
  user_id: string
) {
  if (!title || !status) {
    return { status: 400, message: "Titulo e status são obrigatórios" };
  }

  if (!user_id) {
    return { status: 400, message: "User ID é obrigatório" };
  }

  if (
    status != BookStatus.QUERO_LER &&
    status != BookStatus.LENDO &&
    status != BookStatus.LIDO
  ) {
    return { status: 400, message: "Status inválido" };
  }

  if (status != BookStatus.LIDO && avaliation) {
    return { status: 400, message: "Só é possível avaliar livros lidos" };
  }

  const result = await createBookRepository(
    { title, author, status, avaliation },
    user_id
  );

  return { status: 201, message: "Livro criado com sucesso" };
}

async function getBooksService() {
  return await getBooksRepository();
}

async function getBookByIdService(id: string) {
  return await getBookByIdRepository(id);
}

export { createBookService, getBooksService, getBookByIdService };

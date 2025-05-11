import db from "../db";
import { bookTable } from "../db/schema";
import { BookStatus, createBook, updateBook } from "../interfaces/book";
import {
  createBookRepository,
  deleteBookRepository,
  getBookByIdRepository,
  getBooksRepository,
  updateBookRepository,
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

async function deleteBookService(id: string) {
  return await deleteBookRepository(id);
}

async function updateBookService(
  id: string,
  { title, author, status, avaliation }: updateBook,
  user_id: string
) {
  const book = await getBookByIdService(id);
  if (!book) {
    return { status: 404, message: "Livro não encontrado" };
  }

  if (book.status == BookStatus.LIDO) {
    return { status: 400, message: "Não é possível atualizar um livro lido" };
  }

  if (+user_id != book.user_id) {
    return {
      status: 401,
      message: "Você não tem permissão para atualizar este livro",
    };
  }

  if (!title || !status) {
    return { status: 400, message: "Titulo e status são obrigatórios" };
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

  await updateBookRepository(id, { title, author, status, avaliation });

  return { status: 200, message: "Livro atualizado com sucesso" };
}

export {
  createBookService,
  getBooksService,
  getBookByIdService,
  deleteBookService,
  updateBookService,
};

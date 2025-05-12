import { BookStatus, createBook, updateBook } from "../interfaces/book";
import { bookSchema } from "../interfaces/book";
import {
  createBookRepository,
  deleteBookRepository,
  getBookByIdRepository,
  getBooksByUserIdRepository,
  getBooksRepository,
  updateBookRepository,
} from "../repositories/bookRepository";
import { getUserByIdService } from "./userService";

async function createBookService(
  { title, author, status, avaliation }: createBook,
  user_id: string
) {
  const result = bookSchema.safeParse({
    title,
    author,
    status,
    avaliation,
  });

  if (!result.success) {
    return { status: 400, message: result.error.format() };
  }

  let conclusion_date: string | null = null;

  if (status == BookStatus.LIDO) {
    conclusion_date = new Date().toISOString();
  }

  const book = await createBookRepository(
    result.data,
    user_id,
    conclusion_date
  );

  return { status: 201, message: "Livro criado com sucesso" };
}

async function getBooksService() {
  return await getBooksRepository();
}

async function getBookByIdService(id: string) {
  return await getBookByIdRepository(id);
}

async function deleteBookService(id: string, user_id: string) {
  const book = await getBookByIdRepository(id);
  if (!book) {
    return { status: 404, message: "Livro não encontrado" };
  }

  if (+user_id != book.user_id) {
    return {
      status: 401,
      message: "Você não tem permissão para deletar este livro",
    };
  }

  await deleteBookRepository(id);

  return { status: 200, message: "Livro deletado com sucesso" };
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

  if (+user_id != book.user_id) {
    return {
      status: 401,
      message: "Você não tem permissão para atualizar este livro",
    };
  }

  if (status == BookStatus.LIDO) {
    return { status: 400, message: "Não é possível atualizar um livro lido" };
  }

  const result = bookSchema.safeParse({
    title,
    author,
    status,
    avaliation,
  });

  if (!result.success) {
    return { status: 400, message: result.error.format() };
  }

  let conclusion_date: string | null = null;

  if (status == BookStatus.LIDO) {
    conclusion_date = new Date().toISOString();
  }

  await updateBookRepository(id, result.data, conclusion_date);

  return { status: 200, message: "Livro atualizado com sucesso" };
}

async function getBooksByUserIdService(user_id: string) {

  const books = await getBooksByUserIdRepository(user_id);
  return books;
}

export {
  createBookService,
  deleteBookService,
  getBookByIdService,
  getBooksService,
  updateBookService,
  getBooksByUserIdService,
};

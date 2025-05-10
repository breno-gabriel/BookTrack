import db from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

function getUserByEmail(email: string) {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
}

function insertUser(name: string, email: string, password: string) {
  return db.insert(usersTable).values({ name, email, password });
}

function getUserById(id: number) {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

function getAllUsers() {
  return db.select().from(usersTable);
}

function deleteUserById(id: number) {
  return db.delete(usersTable).where(eq(usersTable.id, id));
}

export { getUserByEmail, insertUser, getUserById, getAllUsers, deleteUserById };

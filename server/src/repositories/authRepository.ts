import db from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

function getUserByEmail(email: string) {
    
    return db.select().from(usersTable).where(eq(usersTable.email, email));
}

function insertUser(name: string, email: string, password: string) {
    
    return db.insert(usersTable).values({ name, email, password });
}

export { getUserByEmail, insertUser };
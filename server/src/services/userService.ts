import db from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { getAllUsers, getUserById, deleteUserById } from "../repositories/userRepository";

function getAllUsersService() {
    
    return getAllUsers();
}

function getUserByIdService(id: number) {
    
    return getUserById(id);
}   

function deleteUserByIdService(id: number) {
    
    return deleteUserById(id);
}   


export { getAllUsersService, getUserByIdService, deleteUserByIdService };
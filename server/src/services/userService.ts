import {
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../repositories/userRepository";

function getAllUsersService() {
  return getAllUsers();
}

function getUserByIdService(id: number) {
  return getUserById(id);
}

function deleteUserByIdService(id: number) {
  return deleteUserById(id);
}

export { deleteUserByIdService, getAllUsersService, getUserByIdService };

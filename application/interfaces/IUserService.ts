import { User } from "../../core/entities/User";

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User } | null>;
}

import { User } from "../entities/User";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number, user: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}

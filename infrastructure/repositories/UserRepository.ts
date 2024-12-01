import { Repository } from "typeorm";
import { User } from "../../core/entities/User";
import { IUserRepository } from "../../core/interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  constructor(private repository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.repository.update(id, user);
    return this.repository.findOne({ where: { id } }) as Promise<User>;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

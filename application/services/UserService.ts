import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { User } from "../../core/entities/User";
import { JwtService } from "../../infrastructure/services/JwtService";
import { validate } from "class-validator";

export class UserService implements IUserService {
  private jwtService: JwtService;

  constructor(private userRepository: IUserRepository) {
    this.jwtService = new JwtService();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(user: User): Promise<User> {
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.toString()}`);
    }
    return this.userRepository.create(user);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User } | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return null;
    }

    const token = this.jwtService.generateToken(user);

    return { token, user };
  }
}

import { Request, Response } from "express";
import { IUserService } from "../../application/interfaces/IUserService";
import { User } from "../../core/entities/User";

export class UserController {
  constructor(private userService: IUserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User();
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;

      const createdUser = await this.userService.createUser(user);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(400).json({ message: "Error creating User" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = req.body as Partial<User>;
      const updatedUser = await this.userService.updateUser(id, user);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = await this.userService.login(email, password);
      if (data?.token) {
        res.json(data);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error during login" });
    }
  }

  // async protectedRoute(req: Request, res: Response): Promise<void> {
  //   res.json({ message: "This is a protected route", user: req.user });
  // }
}

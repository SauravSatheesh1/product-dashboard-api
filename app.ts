import express from "express";
import cors from "cors";
import multer from "multer";
import { AppDataSource } from "./infrastructure/database/typeorm.config";
import { ProductRepository } from "./infrastructure/repositories/ProductRepository";
import { UserRepository } from "./infrastructure/repositories/UserRepository";
import { ProductService } from "./application/services/ProductService";
import { UserService } from "./application/services/UserService";
import { ProductController } from "./presentation/controllers/ProductController";
import { UserController } from "./presentation/controllers/UserController";
import { Product } from "./core/entities/Product";
import { User } from "./core/entities/User";
import { authMiddleware } from "./presentation/middlewares/authMiddleWare";
import { CsvUploadService } from "./application/services/CsvUploadService";
import { CsvUploadController } from "./presentation/controllers/CsvUploadController";

const upload = multer({ storage: multer.memoryStorage() });

export const createApp = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const dataBaseInstance = AppDataSource;

  // Database connection
  await dataBaseInstance.initialize();

  // Repositories
  const productRepository = new ProductRepository(
    dataBaseInstance.getRepository(Product)
  );
  const userRepository = new UserRepository(
    dataBaseInstance.getRepository(User)
  );

  // Services
  const productService = new ProductService(productRepository);
  const userService = new UserService(userRepository);
  const csvUploadService = new CsvUploadService(productRepository);

  // Controllers
  const productController = new ProductController(productService);
  const userController = new UserController(userService);
  const csvUploadController = new CsvUploadController(csvUploadService);

  // Routes
  app.get("/products", authMiddleware, (req, res) =>
    productController.getAllProducts(req, res)
  );
  app.get("/products/:id", authMiddleware, (req, res) =>
    productController.getProductById(req, res)
  );
  app.post("/products", authMiddleware, (req, res) =>
    productController.createProduct(req, res)
  );
  app.put("/products/:id", authMiddleware, (req, res) =>
    productController.updateProduct(req, res)
  );
  app.delete("/products/:id", authMiddleware, (req, res) =>
    productController.deleteProduct(req, res)
  );

  app.post("/users", (req, res) => userController.createUser(req, res));
  app.post("/login", (req, res) => userController.login(req, res));
  app.get("/users", authMiddleware, (req, res) =>
    userController.getAllUsers(req, res)
  );
  app.get("/users/:id", authMiddleware, (req, res) =>
    userController.getUserById(req, res)
  );
  app.put("/users/:id", authMiddleware, (req, res) =>
    userController.updateUser(req, res)
  );
  app.delete("/users/:id", authMiddleware, (req, res) =>
    userController.deleteUser(req, res)
  );

  // CSV upload route
  app.post(
    "/api/upload-csv",
    authMiddleware,
    upload.single("file"),
    (req, res) => csvUploadController.uploadCsv(req, res)
  );

  return app;
};

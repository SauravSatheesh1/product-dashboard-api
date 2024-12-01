import { Request, Response } from "express";
import { IProductService } from "../../application/interfaces/IProductService";
import { Product } from "../../core/entities/Product";

export class ProductController {
  constructor(private productService: IProductService) {}

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sort = (req.query.sort as string) || "name";
      const order = (req.query.order as "asc" | "desc") || "asc";
      const products = await this.productService.getAllProducts(
        page,
        limit,
        sort,
        order
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productService.getProductById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = req.body as Product;
      const createdProduct = await this.productService.createProduct(product);
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ message: "Error creating product" });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const product = req.body as Partial<Product>;
      const updatedProduct = await this.productService.updateProduct(
        id,
        product
      );
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating product" });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
    }
  }
}

import { IProductService } from "../interfaces/IProductService";
import { IProductRepository } from "../../core/interfaces/IProductRepository";
import { Product } from "../../core/entities/Product";

export class ProductService implements IProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(
    page: number,
    limit: number,
    sort: string,
    order: "asc" | "desc"
  ): Promise<{ products: Product[]; totalPages: number }> {
    return this.productRepository.findAll(page, limit, sort, order);
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    return this.productRepository.update(id, product);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
}

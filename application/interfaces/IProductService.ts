import { Product } from "../../core/entities/Product";

export interface IProductService {
  getAllProducts(
    page: number,
    limit: number,
    sort: string,
    order: "asc" | "desc"
  ): Promise<{ products: Product[]; totalPages: number }>;
  getProductById(id: number): Promise<Product | null>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}

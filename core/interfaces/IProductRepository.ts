import { Product } from "../entities/Product";

export interface IProductRepository {
  findAll(
    page: number,
    limit: number,
    sort: string,
    order: "asc" | "desc"
  ): Promise<{ products: Product[]; totalPages: number }>;
  findById(id: number): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: number, product: Partial<Product>): Promise<Product>;
  delete(id: number): Promise<void>;
  bulkCreate(products: Product[]): Promise<number>;
}

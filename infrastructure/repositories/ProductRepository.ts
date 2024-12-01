import { QueryFailedError, Repository } from "typeorm";
import { Product } from "../../core/entities/Product";
import { IProductRepository } from "../../core/interfaces/IProductRepository";

export class ProductRepository implements IProductRepository {
  constructor(private repository: Repository<Product>) {}

  async findAll(
    page: number,
    limit: number,
    sort: string,
    order: "asc" | "desc"
  ): Promise<{ products: Product[]; totalPages: number }> {
    const [products, total] = await this.repository.findAndCount({
      order: {
        [sort]: order.toUpperCase(),
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return { products, totalPages };
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    await this.repository.update(id, product);
    return this.repository.findOne({ where: { id } }) as Promise<Product>;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async bulkCreate(products: Product[]): Promise<number> {
    try {
      const result = await this.repository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(products)
        .execute();

      return result.raw.length;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        throw new Error("One or more products have duplicate SKUs");
      }
      throw error;
    }
  }
}

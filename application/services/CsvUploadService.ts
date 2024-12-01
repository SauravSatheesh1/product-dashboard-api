import { parse } from "csv-parse";
import { Readable } from "stream";
import { IProductRepository } from "../../core/interfaces/IProductRepository";
import { Product } from "../../core/entities/Product";

export class CsvUploadService {
  constructor(private productRepository: IProductRepository) {}

  async processUpload(buffer: Buffer): Promise<number> {
    const records = await this.parseCsv(buffer);

    const products: Product[] = records.map((record) => {
      const product = new Product();
      product.name = record.product_name;
      product.price = parseFloat(record.price);
      product.sku = record.sku;
      product.description = record.description;
      return product;
    });

    const insertedCount = await this.productRepository.bulkCreate(products);

    return insertedCount;
  }

  private parseCsv(buffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const records: any[] = [];
      const parser = parse({
        columns: true,
        skip_empty_lines: true,
      });

      parser.on("readable", function () {
        let record;
        while ((record = parser.read()) !== null) {
          records.push(record);
        }
      });

      parser.on("error", function (err) {
        reject(err);
      });

      parser.on("end", function () {
        resolve(records);
      });

      Readable.from(buffer).pipe(parser);
    });
  }
}

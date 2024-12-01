import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsTable1733032493695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "sku",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "description",
            type: "text",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
  }
}

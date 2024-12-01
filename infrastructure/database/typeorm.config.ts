import { DataSource } from "typeorm";
import { Product } from "../../core/entities/Product";
import { User } from "../../core/entities/User";
import { config } from "../../config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.databaseUrl,
  ssl: true,
  entities: [Product, User],
  migrations: [],
  migrationsTableName: "migrationTracker",
  synchronize: true,
  logging: false,
});

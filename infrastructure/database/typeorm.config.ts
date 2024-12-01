import { DataSource } from "typeorm";
import { Product } from "../../core/entities/Product";
import { User } from "../../core/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  // url: "postgresql://postgres:password@localhost:5432/postgres",
  url: "postgresql://neondb_owner:GPH91cRhpTwe@ep-dawn-lake-a1v3jbi1.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=0",
  ssl: true,
  entities: [Product, User],
  migrations: [],
  migrationsTableName: "migrationTracker",
  synchronize: true,
  logging: false,
});

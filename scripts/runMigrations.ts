import { AppDataSource } from "../infrastructure/database/typeorm.config";

async function runMigrations() {
  const connection = await AppDataSource.initialize();
  try {
    const migrations = await connection.runMigrations();
    console.log("Migrations run successfully:", migrations);
  } catch (error) {
    console.error("Error running migrations:", error);
  }
}

runMigrations().catch((error) => console.error("Unhandled error:", error));

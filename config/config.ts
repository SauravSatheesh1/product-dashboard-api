import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  databaseUrl:
    process.env.DATABASE_URL || "postgres://localhost:5432/default_db",
  nodeEnv: process.env.NODE_ENV || "development",
};

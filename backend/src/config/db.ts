import { Client } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
  quiet: true,
});

export const database = new Client({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export const connectDB = async () => {
  try {
    await database.connect();
    console.log("✅ База данных подключена!");
  } catch (error) {
    console.error("Произошла ошибка подключения к БД", error);
    process.exit(1);
  }
};

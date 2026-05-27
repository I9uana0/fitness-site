import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB, database } from "./config";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
  override: true,
  quiet: true,
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен по адресу https://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Ошибка при запуске:", error);
    process.exit(1);
  }
};

startServer();

app.get("/", (req, res) => {
  res.json({ message: "hello, world!" });
});

app.get("/users", async (req, res) => {
  try {
    const result = await database.query("select * from users");
    if (!result) throw new Error("Не удалось получить пользователей");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

import express from "express";
import connectDB from "./DB/main.js";
import authRouter from "./Routes/auth.js";
import transactionRouter from "./Routes/transaction.js";
import { tokenVerify } from "./Middleware/token.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

connectDB().then(() => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: ["https://penny-tracker-server.vercel.app"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
  );

  app.get("/", (req, res) => {
    res.send("hello");
  });
  app.use("/auth", authRouter);
  app.use("/api", tokenVerify, transactionRouter);

  app.listen(4000, () => {
    console.log("server listening at http://localhost:4000");
  });
});

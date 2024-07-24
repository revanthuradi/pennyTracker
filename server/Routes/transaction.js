import express from "express";
import {
  addTransaction,
  getTransaction,
  getTotalBalance,
  getStats,
  updateTransaction,
  deleteTransaction,
} from "../Controllers/transaction.js";
const transactionRouter = express.Router();

transactionRouter.post("/add", addTransaction);
transactionRouter.get("/totalbalance", getTotalBalance);
transactionRouter.put("/updatetransaction", updateTransaction);
transactionRouter.delete("/deletetransaction", deleteTransaction);
transactionRouter.get("/gettransactions/:transactiontype", getTransaction);
transactionRouter.get("/gettransactions/statistics/:transactiontype", getStats);

export default transactionRouter;

import mongoose from "mongoose";
const transactionSchema = mongoose.Schema(
  {
    text: {
      type: String,
      requred: true,
    },
    cashIn: {
      type: Boolean,
      requred: true,
    },
    cashOut: {
      type: Boolean,
      requred: true,
    },
    amount: {
      type: Number,
      requred: true,
    },
    category: {
      type: String,
      requred: true,
    },
    transactionBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      requred: true,
    },
  },
  { timestamps: true }
);
const Transaction = mongoose.model("Transactions", transactionSchema);
export default Transaction;

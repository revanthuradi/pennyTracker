import Transaction from "../Models/transaction.js";
import getTransactions from "../Helpers/getTransactions.js";

export const addTransaction = async (req, res) => {
  const { id } = req.query;
  const { cashIn, cashOut, amount, category, text } = req.body;
  try {
    if (id) {
      const newTransaction = await Transaction.create({
        cashIn,
        cashOut,
        amount,
        category,
        text,
        transactionBy: id,
      });
      res.status(201).json({
        message: "Transaction saved",
        newTransaction,
      });
    } else {
      res.status(400).json({
        message: "Bad Request",
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getTransaction = async (req, res) => {
  const { id } = req.query;
  const { transactiontype } = req.params;
  try {
    if (id && transactiontype) {
      const transactions = await getTransactions(transactiontype, id);
      res.status(200).json({
        transactions,
      });
    } else {
      res.status(400).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

export const updateTransaction = async (req, res) => {
  const { transactionId } = req.query;
  // console.log(req.body);
  // console.log(transactionId);
  try {
    if (transactionId) {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        req.body,
        { new: true }
      );
      if (updateTransaction) {
        res.status(200).json({
          message: "Transaction Updated Successfully",
          updateTransaction,
        });
      } else {
        res.status(400).json({
          message: "Something went Wrong",
        });
      }
    } else {
      res.status(400).json({
        message: "Something went Wrong",
      });
    }
  } catch (error) {
    res.stats(400).json({
      message: "Failed to update, try again",
    });
    console.log(err);
  }
};

export const deleteTransaction = async (req, res) => {
  const { transactionId } = req.query;
  try {
    if (transactionId) {
      const result = await Transaction.findByIdAndDelete(transactionId);
      // console.log(result);
      if (result) {
        res.status(200).json({
          message: "Transaction Deleted Successfully",
        });
      } else {
        res.status(400).json({
          message: "Transaction not found",
        });
      }
    } else {
      res.status(400).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

export const getTotalBalance = async (req, res) => {
  const { id } = req.query;
  if (id) {
    let income = 0;
    let expenses = 0;
    const transaction = await Transaction.find({
      transactionBy: id,
    });

    transaction.forEach((transaction) =>
      transaction.cashIn
        ? (income += transaction.amount)
        : (expenses += transaction.amount)
    );

    res.status(200).json({
      message: "succesfull",
      balance: {
        income,
        expenses,
      },
    });
  } else {
    res.status(400);
  }
};

export const getStats = async (req, res) => {
  const { id } = req.query;
  const { transactiontype } = req.params;
  let result = [];
  let totalIncome = 0;
  try {
    if (id && transactiontype) {
      const transactions = await getTransactions(transactiontype, id);
      if (transactions.length !== 0) {
        const categoryTotals = {};
        transactions.forEach((transaction) => {
          if (transaction.cashOut) {
            if (categoryTotals[transaction.category]) {
              categoryTotals[transaction.category] += transaction.amount;
            } else {
              categoryTotals[transaction.category] = transaction.amount;
            }
          }
        });

        result = Object.keys(categoryTotals).map((category) => ({
          category: category,
          totalSpent: categoryTotals[category],
        }));

        transactions.forEach((transaction) => {
          if (transaction.cashIn) {
            totalIncome += transaction.amount;
          }
        });
      }
      res.status(200).json({
        stats: result,
        totalIncome,
      });
    } else {
      res.status(400).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

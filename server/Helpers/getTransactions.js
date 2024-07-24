import Transaction from "../Models/transaction.js";

const getTransactions = async (transactiontype, id) => {
  try {
    if (transactiontype === "recent") {
      const transactions = await Transaction.find({ transactionBy: id })
        .sort({ createdAt: -1 })
        .limit(4);

      return transactions;
    } else {
      let query = "";
      switch (transactiontype) {
        case "all":
          query = { transactionBy: id };
          break;
        case "today":
          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0);

          const endOfDay = new Date();
          endOfDay.setHours(23, 59, 59, 999);

          query = {
            transactionBy: id,
            createdAt: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          };
          break;
        case "yesterday":
          const yesterdayStart = new Date();
          yesterdayStart.setDate(yesterdayStart.getDate() - 1);
          yesterdayStart.setHours(0, 0, 0, 0);

          const yesterdayEnd = new Date();
          yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
          yesterdayEnd.setHours(23, 59, 59, 999);
          query = {
            transactionBy: id,
            createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd },
          };
          break;
        case "weekly":
          const currentDate = new Date();
          const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); 

          const startOfWeek = new Date(currentDate.setDate(firstDayOfWeek));
          startOfWeek.setHours(0, 0, 0, 0); 

          const endOfWeek = new Date(currentDate.setDate(lastDayOfWeek));
          endOfWeek.setHours(0, 0, 0, 0);
          query = {
            transactionBy: id,
            createdAt: { $gte: startOfWeek, $lte: endOfWeek },
          };
          break;
        case "monthly":
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
          );
          query = {
            transactionBy: id,
            createdAt: { $gte: startOfMonth, $lte: startOfNextMonth },
          };
          break;
        case "yearly":
          const startOfYear = new Date(new Date().getFullYear(), 0, 1);
          startOfYear.setHours(0, 0, 0, 0);

          const endOfYear = new Date(new Date().getFullYear(), 11, 31);
          endOfYear.setHours(23, 59, 59, 999);
          query = {
            transactionBy: id,
            createdAt: { $gte: startOfYear, $lte: endOfYear },
          };
          break;
        default:
          query = "";
      }
      const transactions = await Transaction.find(query).sort({
        createdAt: -1,
      });
      return transactions;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getTransactions;

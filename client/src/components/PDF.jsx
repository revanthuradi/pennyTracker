import React, { useContext } from "react";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { GoDownload } from "react-icons/go";
import moment from "moment";
const PDF = ({ transactions }) => {

  function getDate() {
    const data = [];
    transactions.forEach((t) => {
      const transactionType = t.cashIn ? "Income" : "Expenses"
      data.push([
        t.text,
        moment(t.createdAt).format("MMM Do YY"),
        t.amount,
        transactionType
      ]);
    });
    return data;
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Description", "Time", "Amount", "Transaction Type"]],
      body: getDate(),
      theme: "striped",
    });

    doc.save("transaction.pdf");
  };

  return (
    <>
      <button title="download transactions" className="active;border-none " onClick={downloadPDF}>
        <GoDownload className="text-3xl" />
      </button>
    </>
  );
};

export default PDF;

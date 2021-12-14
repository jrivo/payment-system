import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import TransactionTable from "./TransactionTable";
import data from "../data/data";

const Transactions = ({ data }) => {
  return (
    <>
      <Title>Recent Transactions</Title>
      <TransactionTable data={data} />
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more transactions
      </Link>
    </>
  );
};

export default Transactions;

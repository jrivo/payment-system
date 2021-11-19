require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const UserRouter = require("./routes/userSequelize");
const TransactionRouter = require("./routes/transactionSequelize");
const HistoryRouter = require("./routes/historySequelize");

app.use(express.json());
// app.use(express.urlencoded());
app.use("/users", UserRouter);
app.use("/transactions", TransactionRouter);
app.use("/history",HistoryRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

require("dotenv").config();
const express = require("express");
const mustacheExpress = require("mustache-express");

const app = express();
const PORT = process.env.PORT || 3000;
const UserRouter = require("./routes/userSequelize");
const TransactionRouter = require("./routes/transactionSequelize");
const MerchantRouter = require("./routes/merchantSequelize");

app.use(express.json());
// app.use(express.urlencoded());
app.use("/users", UserRouter);
app.use("/transactions", TransactionRouter);
app.use("/merchants", MerchantRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

require("dotenv").config();
const express = require("express");
const mustacheExpress = require("mustache-express");
require("./lib/mongo");

const app = express();
const PORT = process.env.PORT || 3000;
const UserRouter = require("./routes/userSequelize");
const TransactionRouter = require("./routes/transactionSequelize");
const http = require("http");
const { options } = require("pg/lib/defaults");
const MerchantRouter = require("./routes/merchantSequelize");
const CredentialsRouter = require("./routes/credentialsSequelize");
const HistoryRouter = require("./routes/historySequelize");
const OperationRouter = require("./routes/operationSequelize");
const SecurityRouter = require("./routes/security");
const verifyJwt = require("./middlewares/verifyJwt");

app.use(express.json());
// app.use(express.urlencoded());
app.use(SecurityRouter);
app.use("/user", UserRouter);

app.use(verifyJwt());
app.use("/transactions", TransactionRouter);
app.use("/merchants", MerchantRouter);
app.use("/credentials", CredentialsRouter);
app.use("/history", HistoryRouter);
app.use("/operation", OperationRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

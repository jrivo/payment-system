require("dotenv").config();
const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./lib/mongo");

const app = express();
const PORT = process.env.PORT || 3000;
const UserRouter = require("./routes/userSequelize");
const TransactionRouter = require("./routes/transactionSequelize");
const PaymentRouter = require("./routes/payment");
const http = require("http");
const { options } = require("pg/lib/defaults");
const MerchantRouter = require("./routes/merchantSequelize");
const CredentialsRouter = require("./routes/credentialsSequelize");
const HistoryRouter = require("./routes/historySequelize");
const OperationRouter = require("./routes/operationSequelize");
const SecurityRouter = require("./routes/security");
const verifyJwt = require("./middlewares/verifyJwt");

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(express.urlencoded());
app.use(SecurityRouter);
app.use("/payment", PaymentRouter);

app.use(verifyJwt());
app.use("/user", UserRouter);
app.use("/transactions", TransactionRouter);
app.use("/merchants", MerchantRouter);
app.use("/credentials", CredentialsRouter);
app.use("/history", HistoryRouter);
app.use("/operation", OperationRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

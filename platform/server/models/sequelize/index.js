const connection = require("../../lib/db");
const User = require("./User");
const Merchant = require("./Merchant");
const Transaction = require("./Transaction");
const Credentials = require("./Credentials");
const History = require("./History")

process.env.NODE_ENV === "dev" &&
  connection.sync({ alter: true }).then(() => console.log("Database synced"));

module.exports.User = User;
module.exports.Merchant = Merchant;
module.exports.Transaction = Transaction;
module.exports.Credentials = Credentials;
module.exports.History = History ;

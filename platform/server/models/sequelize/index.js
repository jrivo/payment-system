const connection = require("../../lib/db");
const User = require("./User");
const Merchant = require("./Merchant");
const Transaction = require("./Transaction");

process.env.NODE_ENV === "dev" &&
  connection.sync({ alter: true }).then(() => console.log("Database synced"));

module.exports.User = User;
module.exports.Merchant = Merchant;
module.exports.Transaction = Transaction;

const connection = require("../../lib/db");
const User = require("./User");
const Transaction = require("./Transaction");
const History = require("./History")

process.env.NODE_ENV === "dev" &&
  connection.sync({ alter: true }).then(() => console.log("Database synced"));

module.exports.User = User;
module.exports.Transaction = Transaction;
module.exports.History = History ;


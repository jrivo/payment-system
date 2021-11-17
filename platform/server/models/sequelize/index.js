const connection = require("../../lib/db");
const User = require("./User");
const Merchant = require("./Merchant");
const Transaction = require("./Transaction");
const Credentials = require("./Credentials");
const History = require("./History");
const Operation = require("./Operation");

process.env.NODE_ENV === "dev" &&
  connection.sync({ alter: true }).then(() => console.log("Database synced"));
Merchant.hasMany(User, { as: "users" });
User.belongsTo(Merchant, { as: "merchant", foreignKey: "merchantId" });
Transaction.belongsTo(Merchant, { as: "merchant", foreignKey: "merchantId" });
Merchant.hasMany(Transaction, { as: "transactions" });
History.belongsTo(Transaction, { as: "transaction", foreignKey: "transactionId" });
Transaction.hasMany(History, { as: "histories" });
Credentials.belongsTo(Merchant, { as: "merchant", foreignKey: "merchantId" });
Merchant.hasMany(Credentials, { as: "credentials" });
Operation.hasMany(History, { as: "histories" });
History.belongsTo(Operation, { as: "operation", foreignKey: "operationId" });

module.exports.User = User;
module.exports.Merchant = Merchant;
module.exports.Transaction = Transaction;
module.exports.Credentials = Credentials;
module.exports.History = History;
module.exports.Operation = Operation;

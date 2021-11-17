const connection = require("../../lib/db");
const User = require("./User");
const Merchant = require("./Merchant");
const Transaction = require("./Transaction");
const TransactionMongo = require("../mongo/transaction");
const Credentials = require("./Credentials");
const History = require("./History");
const Operation = require("./Operation");

process.env.NODE_ENV === "dev" &&
  connection.sync({ alter: true }).then(() => console.log("Database synced"));
Merchant.hasMany(User, { as: "users" });
User.belongsTo(Merchant, { as: "merchant", foreignKey: "merchantId" });
Transaction.belongsTo(Merchant, { as: "merchant", foreignKey: "merchantId" });
Merchant.hasMany(Transaction, { as: "transactions" });
Credentials.belongsTo(Merchant, { as: "merchant", foreignKey: "merchantId" });
Merchant.hasMany(Credentials, { as: "credentials" });
Operation.hasMany(History, { as: "histories" });
History.belongsTo(Operation, { as: "operation", foreignKey: "operationId" });
Transaction.hasMany(Operation, { as: "operations" });
Operation.belongsTo(Transaction, { as: "transaction", foreignKey: "transactionId" });

const denormalizeTransaction = (transaction) => {
  Transaction.findByPk(transaction.id, {
    include: [
      {
        model: Merchant,
        as: "merchant",
        attributes: ["id", "companyName", "currency"],
      },
      {
        model: Operation,
        include: [{ model: History, as: "histories" }],
        as:"operations",
        limit: 5,
        order: [["createdAt", "DESC"]],
      },
    ],
  }).then((transaction) => {
    transaction = transaction.toJSON();
    new TransactionMongo({ _id: transaction.id, ...transaction }).save();
  });
};

Transaction.addHook("afterCreate", denormalizeTransaction);
//find for merchant
Merchant.addHook("afterUpdate", denormalizeTransaction);
Merchant.addHook("afterDestroy", denormalizeTransaction);
Operation.addHook("afterUpdate", denormalizeTransaction);
Operation.addHook("afterDestroy", denormalizeTransaction);

module.exports.User = User;
module.exports.Merchant = Merchant;
module.exports.Transaction = Transaction;
module.exports.Credentials = Credentials;
module.exports.History = History;
module.exports.Operation = Operation;

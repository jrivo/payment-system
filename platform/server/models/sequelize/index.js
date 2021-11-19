const connection = require("../../lib/db");
const User = require("./User");
const Merchant = require("./Merchant");
const Transaction = require("./Transaction");
const TransactionMongo = require("../mongo/transaction");
const Credentials = require("./Credentials");
const History = require("./History");
const Operation = require("./Operation");
const { v4: uuid } = require("uuid");

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
Operation.belongsTo(Transaction, {
  as: "transaction",
  foreignKey: "transactionId",
});

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
        as: "operations",
        limit: 5,
        order: [["createdAt", "DESC"]],
      },
    ],
  }).then((transaction) => {
    transaction = JSON.parse(JSON.stringify(transaction));
    //need to replace transaction or delete it and create a new one
    TransactionMongo.findOneAndUpdate(
      { id: transaction.id },
      { ...transaction, _id: transaction.id },
      { upsert: true, new: true }
    );
    // TransactionMongo.findOneAndReplace(
    //   { _id: transaction.id },
    //   { ...transaction, _id: transaction.id }
    // );
  });
};

const denormalizeMerchantTransaction = (merchant) => {
  Transaction.findAll({ where: { merchantId: merchant.id } }).then(
    (transactions) => {
      transactions.forEach((transaction) => {
        denormalizeTransaction(transaction);
      });
    }
  );
};

const denormalizeOperationTransaction = (operation) => {
  denormalizeTransaction({ id: operation.transactionId });
};

const generateCredentials = (merchant, options) => {
  if (options.fields.includes("status") && merchant.status === "ACTIVATED") {
    Credentials.create({
      merchantId: merchant.id,
      clientToken: uuid(),
      clientSecret: uuid(),
    });
  }
};

const generateHistory = (operation) => {
  History.create({
    operationId: operation.id,
    status: operation.status,
    date: operation.updatedAt,
    transactionId: operation.transactionId,
  });
};

Transaction.addHook("afterCreate", denormalizeTransaction);
Merchant.addHook("afterUpdate", denormalizeMerchantTransaction);
Merchant.addHook("afterUpdate", generateCredentials);
Operation.addHook("afterCreate", denormalizeOperationTransaction);
Operation.addHook("afterUpdate", denormalizeOperationTransaction);
Operation.addHook("afterCreate", generateHistory);
Operation.addHook("afterUpdate", generateHistory);

module.exports.User = User;
module.exports.Merchant = Merchant;
module.exports.Transaction = Transaction;
module.exports.Credentials = Credentials;
module.exports.History = History;
module.exports.Operation = Operation;

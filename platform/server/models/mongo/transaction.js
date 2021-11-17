const Mongoose = require("mongoose");

const TransactionSchema = new Mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  client_first_name: {
    type: String,
    required: true,
  },
  client_last_name: {
    type: String,
    required: true,
  },
  client_email: {
    type: String,
    required: true,
  },
  merchant: Array,
  operations: Array,
});

const Transaction = Mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;

const Mongoose = require("mongoose");

const CurrencySchema = new Mongoose.Schema({
  _id: String,
  date: Date,
  currencyFrom: String,
  currencyTo: String,
  rate: Number
});

const Currency = Mongoose.model("Currency", CurrencySchema);

module.exports = Currency;

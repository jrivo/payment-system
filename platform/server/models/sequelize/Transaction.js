const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class Transaction extends Model {}

Transaction.init(
  {
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    currency: DataTypes.STRING,
    client_first_name: DataTypes.STRING,
    client_last_name: DataTypes.STRING,
    client_email: DataTypes.STRING,
    status: DataTypes.STRING,
    redirection_url: DataTypes.STRING,
    notification_url: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "transaction",
    paranoid: true,
  }
);

module.exports = Transaction;

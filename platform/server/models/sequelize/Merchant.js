const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class Merchant extends Model {}

Merchant.init(
  {
    companyName: DataTypes.STRING,
    KBIS: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    confirmationUrl: DataTypes.STRING,
    cancellationUrl: DataTypes.STRING,
    currency: DataTypes.STRING,
    notificationUrl: DataTypes.STRING,
    status:DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "merchant",
    paranoid: true,
  }
);

module.exports = Merchant;

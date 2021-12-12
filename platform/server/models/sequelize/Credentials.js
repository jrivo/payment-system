const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class Credentials extends Model {}

Credentials.init(
  {
    clientToken: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "credentials",
    paranoid: true,
  }
);

module.exports = Credentials;

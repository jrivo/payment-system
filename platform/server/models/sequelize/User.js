const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class User extends Model {}

User.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "user",
    paranoid: true,
  }
);

module.exports = User;

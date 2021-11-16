const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class User extends Model {}

User.init(
  {
    firstName: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "user",
    paranoid: true,
  }
);

module.exports = User;

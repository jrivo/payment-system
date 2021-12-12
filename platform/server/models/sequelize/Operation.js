const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class Operation extends Model {}

Operation.init(
  {
    type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status:DataTypes.STRING,
    date: DataTypes.DATE,
  },
  {
    sequelize: connection,
    modelName: "operation",
    paranoid: true,
  }
);

module.exports = Operation;

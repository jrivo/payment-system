const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class Operation extends Model {}

Operation.init(
  {
    type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    date: DataTypes.DATE,
    redirection_url: DataTypes.STRING,
    redirection_id: DataTypes.STRING,
    notification_url: DataTypes.STRING,
    notification_id: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "operation",
    paranoid: true,
  }
);

module.exports = Operation;

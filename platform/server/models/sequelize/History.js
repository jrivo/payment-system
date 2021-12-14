const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class History extends Model {}

History.init(
    {
        transactionId: DataTypes.STRING,
        status : DataTypes.STRING,
        date : DataTypes.DATE
    },
    {
        sequelize : connection,
        modelName : "history",
        paranoid: true,
    }
);

module.exports = History;

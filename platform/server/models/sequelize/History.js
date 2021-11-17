const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class History extends Model {}

History.init(
    {
        transaction_id : DataTypes.INTEGER,
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

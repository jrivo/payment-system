const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class History extends Model {}

History.init(
    {
        transaction_id : DataTypes.INT,
        status : DataTypes.String,
        date : DataTypes.DATE
    },
    {
        sequelize : connection,
        modelName : "history",
        paranoid: true,
    }
);

module.exports = History;

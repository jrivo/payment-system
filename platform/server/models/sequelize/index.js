const connection = require("../../lib/db");
const User = require("./User");

process.env.NODE_ENV === "dev" &&
  connection.sync({ alter: true }).then(() => console.log("Database synced"));
  
module.exports.User = User;
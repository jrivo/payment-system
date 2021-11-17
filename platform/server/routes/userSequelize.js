const { Router } = require("express");
const { User: UserModel } = require("../models/sequelize/index.js");
const router = Router();
// const bcrypt = require("bcryptjs");

router.get("", (req, res) => {
  UserModel.findAll().then((users) => {
    res.json(users);
  });
});

module.exports = router;
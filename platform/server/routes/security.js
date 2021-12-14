const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { User: UserModel } = require("../models/sequelize");
const { createToken } = require("../lib/jwt");
const jwt = require("jsonwebtoken");

const router = new Router();

router.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (password_valid) {
      token = jwt.sign(
          { email: user.email, firstName: user.firstName ,merchantId :user.merchantId},
          process.env.SECRET
      );
      res.status(200).json({
        token: token,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      res.status(400).json({ error: "password incorrect" });
    }
  } else {
    res.status(404).json({ error: "user deos not exist" });
  }
});

router.post("/register", async (req, res) => {
  const body = req.body;
  salt = await bcrypt.genSalt(10);
  UserModel.create({
    email: body.email,
    password: await bcrypt.hash(body.password, salt),
    firstName: body.firstName,
    lastName: body.lastName,
    merchantId: body.merchantId,
  })
      .then((User) => {
        res.status(201).json(User);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          res.status(400).json(err);
        } else {
          console.error(err);
          res.sendStatus(500);
        }
      });
});


module.exports = router;

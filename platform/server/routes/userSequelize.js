const { Router } = require("express");
const { where } = require("sequelize/types");
const {
  User: UserModel,
  Merchant: MerchantModel,
} = require("../models/sequelize/index.js");
const router = Router();
// const bcrypt = require("bcryptjs");

router.get("", (req, res) => {
  UserModel.findAll({
    where: req.query,
    include: [{ model: MerchantModel, as: "merchant" }],
  }).then((users) => {
    res.json(users);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByPk(id).then((User) => {
    if (User) {
      res.json(User);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  UserModel.destroy({
    where: {
      id: id,
    },
  }).then((nbRow) => {
    if (nbRow) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post("", (req, res) => {
  const body = req.body;
  UserModel.create(body)
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

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  UserModel.update(body, { where: { id: id }, returning: true })
    .then(([, [User]]) => {
      if (User) {
        res.json(User);
      } else {
        res.sendStatus(404);
      }
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

module.exports = router;

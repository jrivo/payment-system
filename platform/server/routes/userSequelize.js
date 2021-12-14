const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  User: UserModel,
  Merchant: MerchantModel,
} = require("../models/sequelize/index.js");
const router = Router();
// const bcrypt = require("bcryptjs");

router.get("", (req, res) => {
  UserModel.findAll({
    where:
        (req.user.merchantId ? {merchantId : req.user.merchantId} : {} ),
    include: [{ model: MerchantModel, as: "merchant" }],
  }).then((users) => {
    res.json(users);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByPk(id).then((User) => {
    if (User) {
      if(User.merchantId === req.user.merchantId || !req.user.merchantId) {
        res.json(User);
      }else {
        res.sendStatus(401);
      }
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

router.post("", async (req, res) => {
  const body = req.body;
  if (!req.user.merchantId){
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
  }else{
    res.sendStatus(401);
  }
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

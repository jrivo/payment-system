const { Router } = require("express");
const {
  Merchant: MerchantModel,
  User: UserModel,
  Transaction: TransactionModel,
  Credentials: CredentialsModel,
} = require("../models/sequelize/index");
const router = Router();

router.get("", (req, res) => {
  MerchantModel.findAll({
    where: req.query,
    include: [
      { model: UserModel, as: "users" },
      { model: TransactionModel, as: "transactions" },
      { model: CredentialsModel, as: "credentials" },
    ],
  }).then((merchants) => {
    if(!req.user.merchantId) {
      res.json(merchants);
    }else {
      res.sendStatus(401);
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  MerchantModel.findByPk(id).then((merchant) => {
    if (merchant) {
      if(merchant.id === req.user.merchantId || !req.user.merchantId) {
        res.json(merchant);
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
  MerchantModel.destroy({
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
  MerchantModel.create(body)
    .then((merchant) => {
      res.status(201).json(merchant);
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
  MerchantModel.update(body, { where: { id: id }, returning: true })
    .then(([, [merchant]]) => {
      if (merchant) {
        res.json(merchant);
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

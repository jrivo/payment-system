const { Router } = require("express");
const {
  Transaction: TransactionModel,
  Merchant: MerchantModel,
  Operation: OperationModel,
} = require("../models/sequelize/index");
const router = Router();

router.get("", (req, res) => {
  TransactionModel.findAll({
    where: req.query,
    include: [
      { model: MerchantModel, as: "merchant" },
      { model: OperationModel, as: "operations" },
    ],
  }).then((transactions) => {
    res.json(transactions);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  TransactionModel.findByPk(id).then((transaction) => {
    if (transaction) {
      res.json(transaction);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  TransactionModel.destroy({
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
  TransactionModel.create({ ...body })
    .then((transaction) => {
      console.log("------------------");
      console.log(transaction.dataValues);
      console.log("******************");

      res.status(201).json(transaction);
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
  TransactionModel.update(body, { where: { id: id }, returning: true })
    .then(([, [transaction]]) => {
      if (transaction) {
        res.json(transaction);
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

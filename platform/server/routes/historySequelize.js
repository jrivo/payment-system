const { Router } = require("express");
const {
  History: HistoryModel,
  Transaction: TransactionModel,
  Operation: OperationModel,
} = require("../models/sequelize/index");
const router = Router();

router.get("", (req, res) => {
  HistoryModel.findAll({
    where: req.query,
    include: [
      { model: TransactionModel, as: "transaction" },
      { model: OperationModel, as: "operation" },
    ],
  }).then((history) => {
    res.json(history);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  HistoryModel.findByPk(id).then((history) => {
    if (history) {
      res.json(history);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  HistoryModel.destroy({
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
  HistoryModel.create(body)
    .then((history) => {
      res.status(201).json(history);
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
  HistoryModel.update(body, { where: { id: id }, returning: true })
    .then(([, [history]]) => {
      if (history) {
        res.json(history);
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

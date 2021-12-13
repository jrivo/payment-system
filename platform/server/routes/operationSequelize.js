const { Router } = require("express");
const {
  Operation: OperationModel,
  History: HistoryModel,
} = require("../models/sequelize/index");
const router = Router();

router.get("", (req, res) => {
  OperationModel.findAll({
    where: req.query,
    include: [{ model: HistoryModel, as: "histories" }],
  }).then((Operations) => {
    res.json(Operations);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  OperationModel.findByPk(id).then((Operation) => {
    if (Operation) {
      res.json(Operation);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  OperationModel.destroy({
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
  OperationModel.create(body)
    .then((Operation) => {
      res.status(201).json(Operation);
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
  OperationModel.update(body, { where: { id: id }, returning: true })
    .then(([, [Operation]]) => {
      if (Operation) {
        res.json(Operation);
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

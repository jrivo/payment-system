const { Router } = require("express");
const {
  Transaction: TransactionModel,
  Operation: OperationModel,
} = require("../models/sequelize/index");
const router = Router();

const requestToPsp = () => {};

router.post("/", (req, res) => {
  OperationModel.findOne({
    where: { redirection_id: req.body.redirection_id },
  }).then((operation) => {
    if (operation) {
      const body = {
        name: req.body.name,
        card_number: req.body.card_number,
        expiration_date: req.body.expiration_date,
        csv: req.body.csv,
      };
      // remove this when psp is ready
      operation.update({ status: "pending" });
      return res.sendStatus(200);
      //------------------------
      fetch(process.env.PSP_URL, {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((res) => res.json)
        .then((res) => {
          operation.update({ status: "pending" });
          return res.sendStatus(200);
        })
        .catch((err) => res.sendStatus(500));
    } else {
      res.sendStatus(500);
    }
  });
});

router.get("/status/:id", (req, res) => {
  const id = req.params.id;
  OperationModel.findOne({
    where: { redirection_id: id },
  }).then((operation) => {
    if (operation && operation.status) {
      return res.json({ status: operation.status });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;

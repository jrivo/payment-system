const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const {
  Transaction: TransactionModel,
  Merchant: MerchantModel,
  Operation: OperationModel,
} = require("../models/sequelize/index");
const router = Router();
const {User: UserModel} = require("../models/sequelize/index.js");



router.get("", (req, res) => {
    TransactionModel.findAll({
        where:
            (req.user.merchantId ? {merchantId : req.user.merchantId} : {} ),
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
        if(transaction.merchantId === req.user.merchantId || !req.user.merchantId) {
            res.json(transaction);
        }else {
            res.sendStatus(401);
        }
    } else {
      res.sendStatus(404);
    }
  });
});

// Pas de delete
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
  const redirectionId = uuidv4(); // generating a unique id for redirection links

  TransactionModel.create(
    {
      ...body,
      redirection_url: process.env.REDIRECTION_URL,
      redirection_id: redirectionId,
      operations: [
        {
          type: body.type,
          amount: body.amount,
          status: "created",
          date: Date.now(),
        },
      ],
    },
    { include: [{ model: OperationModel, as: "operations" }] }
  )
    .then((transaction) => {
      const response = transaction;
      response["redirection_link"] = res.status(201).json(response);
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

// Pas de Modif
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  TransactionModel.update(body, { where: { id: id }, returning: true })
      .then(([, [transaction]]) => {
          if (transaction) {
              if(transaction.merchantId === req.user.merchantId || !req.user.merchantId) {
                  res.json(transaction);
              }else {
                  res.sendStatus(401);
              }
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

const { Router } = require("express");
const { Credentials: CredentialsModel } = require("../models/sequelize/index");
const router = Router();

router.get("", (req, res) => {
  CredentialsModel.findAll({
    where: req.query,
  }).then((credentials) => {
    res.json(credentials);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  CredentialsModel.findByPk(id).then((credentials) => {
    if (credentials) {
      res.json(credentials);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  CredentialsModel.destroy({
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
  CredentialsModel.create(body)
    .then((credentials) => {
      res.status(201).json(credentials);
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
  CredentialsModel.update(body, { where: { id: id }, returning: true })
    .then(([, [credentials]]) => {
      if (credentials) {
        res.json(credentials);
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

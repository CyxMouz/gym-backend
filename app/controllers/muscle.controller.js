const db = require("../models");
const Muscle = db.Muscle;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const muscle = {
    name: req.body.name,
    description: req.body.description,
  };
  Muscle.create(muscle)
    .then(() => {
      res.status(200).send({ message: "muscle created" });
    })
    .catch((err) => res.status(500).send({ local: "muscle not created" }));
};
exports.findAll = (req, res) => {
  Muscle.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find muscle ",
      });
    });
};

exports.findByName = (req, res) => {
  const name = req.params.name;
  var condition = name ? { name: { [Op.like]: `%${name}` } } : null;

  Muscle.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find muscle ",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Muscle.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "muscle not found",
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  Muscle.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Muscle updated" });
    })
    .catch((err) => res.status(500).send({ message: "Muscle not updated" }));
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Muscle.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Muscle deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Muscle not deleted" });
    });
};
exports.deleteAll = (req, res) => {
  Muscle.destroy({
    where: {},
  })
    .then(() => {
      res.status(200).send({ message: `Muscles deleted` });
    })
    .catch((err) => {
      res.status(500).send({ message: `Muscles not deleted` });
    });
};

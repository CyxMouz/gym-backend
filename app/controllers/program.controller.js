const { send } = require("express/lib/response");

const db = require("../models");
const Program = db.Program;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const program = {
    name: req.body.name,
    description: req.body.description,
  };
  Program.create(program)
    .then((data) => {
      res.status(200).send({ message: "program created", data });
    })
    .catch((err) => res.status(500).send({ local: "program not created" }));
};

exports.findAll = (req, res) => {
  Program.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find program ",
      });
    });
};

exports.findByName = (req, res) => {
  const name = req.params.name;
  var condition = name ? { name: { [Op.like]: `%${name}` } } : null;

  Program.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find program ",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Program.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "program not found",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Program.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "program updated" });
    })
    .catch((err) => res.status(500).send({ message: "program not updated" }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Program.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "program deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "program not deleted" });
    });
};

// delete groupe of program -> send {"id" : [id_1,id_2]}
exports.deleteAll = (req, res) => {
  var id = req.body.id;
  Program.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: `programs deleted` });
    })
    .catch((err) => {
      res.status(500).send({ message: `programs not deleted` });
    });
};

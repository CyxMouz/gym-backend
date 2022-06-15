const db = require("../models");
const Op = db.Sequelize.Op;
const Role = db.Role;
// Create and Save user
exports.create = (req, res) => {
  const role = {
    description: req.body.description,
  };
  Role.create(role)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "create role err",
      });
    });
};

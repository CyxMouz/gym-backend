module.exports = (app) => {
  const role = require("../controllers/role.controller");

  var router = require("express").Router();

  // Create a new postuler
  router.post("/", role.create);

  //router.post("/", ticket.next);

  app.use("/api/role", router);
};

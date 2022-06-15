module.exports = (app) => {
  const program = require("../controllers/program.controller");

  var router = require("express").Router();

  // Create a new program
  router.post("/", program.create);
  // find by programs by name
  router.get("/name/:name", program.findByName);
  // find all programs by name
  router.get("/", program.findAll);
  // find one
  router.get("/:id", program.findOne);
  // update
  router.put("/:id", program.update);
  // delete all
  router.delete("/deleteAll/", program.deleteAll);
  // delete
  router.delete("/:id", program.delete);

  app.use("/api/program", router);
};

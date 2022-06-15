module.exports = (app) => {
  const muscle = require("../controllers/muscle.controller");

  var router = require("express").Router();

  // Create a new program
  router.post("/", muscle.create);
  // find by muscles by name
  router.get("/name/:name", muscle.findByName);
  // find all muscles by name
  router.get("/", muscle.findAll);
  // find one
  router.get("/:id", muscle.findOne);
  // update
  router.put("/:id", muscle.update);
  // delete all
  router.delete("/deleteAll/", muscle.deleteAll);
  // delete
  router.delete("/:id", muscle.delete);

  app.use("/api/muscle", router);
};

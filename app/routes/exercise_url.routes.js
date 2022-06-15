module.exports = (app) => {
  const exercise_url = require("../controllers/exercise_url.controller");

  var router = require("express").Router();

  // Create multiple
  router.post("/multi", exercise_url.createMultiple);
  // Create a new program
  router.post("/", exercise_url.create);
  // find all
  router.get("/", exercise_url.findAll);
  // find one
  router.get("/:id", exercise_url.findOne);
  // update multiple
  router.put("/multi", exercise_url.updateMultiple);
  // update
  router.put("/:id", exercise_url.update);
  // delete all
  router.delete("/deleteAll/", exercise_url.deleteAll);
  // delete
  router.delete("/:id", exercise_url.delete);

  app.use("/api/exercise_url", router);
};

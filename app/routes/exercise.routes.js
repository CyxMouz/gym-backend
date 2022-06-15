module.exports = (app) => {
  const exercise = require("../controllers/exercise.controller");

  var router = require("express").Router();

  // Create a new program
  router.post("/", exercise.create);
  // find by exercises by name
  router.get("/name/:name", exercise.findByName);
  // find all exercises from selected program
  router.get("/list", exercise.findAllFromProgramme);
  // find all exercises not in  selected program
  router.get("/excludeExercises", exercise.filterExercise);
  // find all exercises
  router.get("/", exercise.findAll);
  // find one
  router.get("/:id", exercise.findOne);
  // update
  router.put("/:id", exercise.update);
  // delete all
  router.delete("/deleteAll/", exercise.deleteAll);
  // delete
  router.delete("/:id", exercise.delete);

  app.use("/api/exercise", router);
};

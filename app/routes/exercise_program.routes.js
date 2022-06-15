module.exports = (app) => {
  const exercise_program = require("../controllers/exercise_program.controller");

  var router = require("express").Router();

  // Create a new exercise_program
  router.post("/:id", exercise_program.create);

  // find all exercise_program by query exercise id & program id
  router.get("/find", exercise_program.findOne);
  // find all exercise with program
  router.get("/findAll", exercise_program.findAllWithExercise);
  // find all exercise_program by query exercise
  router.get("/finda/:exerciseId", exercise_program.findAllByExerciseId);

  // find all exercise_program by query program id
  router.get("/findByProgram/:id", exercise_program.findAllByProgramId);

  // update exercise_program
  router.put("/program/:id", exercise_program.update);
  // delete all exercise_program
  router.delete("/deleteAll/", exercise_program.deleteAll);
  // delete exercise_program
  router.delete("/program/:id", exercise_program.delete);

  app.use("/api/exercise/exercise_program", router);
};

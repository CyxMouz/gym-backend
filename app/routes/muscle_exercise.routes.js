module.exports = (app) => {
  const muscle_exercise = require("../controllers/muscle_exercise.controller");

  var router = require("express").Router();

  // Create a new program
  router.post("/", muscle_exercise.create);
  // find muscle by exercise
  router.get("/exercise/:exerciseId", muscle_exercise.getMuscleOfExercise);

  // find exercise by muscle
  router.get("/muscle/:muscleId", muscle_exercise.getAllExerciseOfMuscle);
  // delete exercise from muscle_exercise
  router.delete(
    "/exercise/:exerciseId",
    muscle_exercise.deleteExerciseFromMuscle
  );
  // delete muscle from muscle_exercise
  router.delete("/muscle/:muscleId", muscle_exercise.deleteMuscle);

  app.use("/api/muscle_exercise", router);
};

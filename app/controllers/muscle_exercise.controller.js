const db = require("../models");

const Exercise = db.Exercise;
const Muscle = db.Muscle;

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const muscle = await Muscle.findOne({
    where: {
      id: req.body.muscleId,
    },
  });

  const exercise = await Exercise.findOne({
    where: {
      id: req.body.exerciseId,
    },
  });

  await exercise
    .addMuscle(muscle, { through: "muscle_exercise" })
    .then((data) => {
      res.status(200).send({ message: "muscle exercise created", data });
    })

    .catch((err) => res.status(500).send({ local: err }));
};

exports.getMuscleOfExercise = async (req, res) => {
  await Exercise.findOne({
    where: {
      id: req.params.exerciseId,
    },
    include: Muscle,
  })
    .then((data) => {
      res.status(500).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise program ",
      });
    });
};

exports.getAllExerciseOfMuscle = async (req, res) => {
  await Muscle.findOne({
    where: {
      id: req.params.muscleId,
    },
    include: Exercise,
  })
    .then((data) => {
      res.status(500).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercises ",
      });
    });
};

exports.deleteExerciseFromMuscle = async (req, res) => {
  await Exercise_program.destroy({
    where: {
      exerciseId: req.params.exerciseId,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Exercise program deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Exercise program not deleted" });
    });
};
exports.deleteMuscle = async (req, res) => {
  await Exercise_program.destroy({
    where: {
      muscleId: req.params.muscleId,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Exercise program deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Exercise program not deleted" });
    });
};

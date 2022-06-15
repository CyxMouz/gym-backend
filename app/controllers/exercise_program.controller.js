const db = require("../models");

const Exercise = db.Exercise;
const Program = db.Program;
const Muscle = db.Muscle;
const Exercise_program = db.Exercise_program;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const program = await Program.findOne({
    where: {
      id: req.params.id,
    },
  });

  let ExerciseList = req.body;

  for (let index = 0; index < ExerciseList.length; index++) {
    program.addExercise(ExerciseList[index].id, {
      through: {
        series: ExerciseList[index].default_series,
        repitions: ExerciseList[index].default_repitions,
      },
    });
  }
};

function updateData(exo, data) {
  Exercise_program.update(data, {
    where: { exerciseId: exo[0].exerciseId, programId: exo[0].programId },
  });
}

exports.findOne = async (req, res) => {
  await Exercise_program.findOne({
    where: {
      exerciseId: req.query.exerciseId,
      programId: req.query.programId,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise program ",
      });
    });
};

exports.findAllByProgramId = async (req, res) => {
  await Program.findAll({
    where: {
      id: req.params.id,
    },
    include: Exercise,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise program ",
      });
    });
};
exports.findAllByExerciseId = async (req, res) => {
  await Exercise.findOne({
    where: {
      id: req.params.exerciseId,
    },
    include: Program,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise program ",
      });
    });
};
exports.findAllWithExercise = async (req, res) => {
  await Program.findAll({
    include: Exercise,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise program ",
      });
    });
};

exports.update = async (req, res) => {
  const program = await Program.findOne({
    where: {
      id: req.params.id,
    },
  });
  await Exercise_program.destroy({
    where: {
      programId: req.params.id,
    },
  });
  let ExerciseList = req.body;

  for (let index = 0; index < ExerciseList.length; index++) {
    program.addExercise(ExerciseList[index].id, {
      through: {
        series: ExerciseList[index].default_series,
        repitions: ExerciseList[index].default_repitions,
      },
    });
  }
  res.status(200).send({ message: "program updated" });
};
exports.delete = async (req, res) => {
  await Exercise_program.destroy({
    where: {
      programId: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Exercise program deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Exercise program not deleted" });
    });
};
exports.deleteAll = async (req, res) => {
  const exerciseId = req.body.exerciseId;
  const programId = req.body.programId;
  await Exercise_program.destroy({
    where: {
      exerciseId: exerciseId,
      programId: programId,
    },
  })
    .then(() => {
      res.status(200).send({ message: `Exercise deleted` });
    })
    .catch((err) => {
      res.status(500).send({ message: `Exercise not deleted` });
    });
};

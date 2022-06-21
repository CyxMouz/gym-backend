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
        day: ExerciseList[index].day,
      },
    });
  }
  res.send({ message: "program exercise added" });
};

exports.update = async (req, res) => {
  let userListProgram = req.body;

  console.log(userListProgram);

  let storedProgram = await Exercise_program.findAll({
    where: { programId: req.params.id },
  });
  const program = await Program.findOne({
    where: {
      id: req.params.id,
    },
    include: Exercise,
  });
  let exerciseIdList = [];
  for (let i = 0; i < userListProgram.length; i++) {
    exerciseIdList.push(userListProgram[i].id);
    let exo = await Exercise_program.findOne({
      where: { programId: req.params.id, exerciseId: userListProgram[i].id },
    });
    if (!exo) {
      let exercise = await Exercise.findOne({
        where: { id: userListProgram[i].id },
        include: Muscle,
      });

      program.addExercise(exercise, {
        through: {
          series: userListProgram[i].series,
          repitions: userListProgram[i].repitions,
          day: userListProgram[i].day,
        },
      });
    } else {
      await Exercise_program.update(
        {
          series: userListProgram[i].series,
          repitions: userListProgram[i].repitions,
          day: userListProgram[i].day,
        },
        {
          where: {
            programId: req.params.id,
            exerciseId: userListProgram[i].id,
          },
        }
      );
    }
  }

  for (let k = 0; k < storedProgram.length; k++) {
    exist = false;
    for (let j = 0; j < userListProgram.length; j++) {
      if (storedProgram[k].exerciseId == userListProgram[j].id) {
        exist = true;
        j = storedProgram.length;
      }
    }
    if (!exist) {
      let exo = await Exercise.findOne({
        where: { id: storedProgram[k].exerciseId },
      });
      program.removeExercise(exo);
    }
  }

  // for (let i = 0; i < userListProgram.length; i++) {
  //   let found = false;
  //   for (let j = 0; j < storedProgram.length; j++) {
  //     if (storedProgram[j].id == userListProgram[i].id) {
  //       found = true;
  //       storedProgram[j] = userListProgram[i];
  //       j = userListProgram.length;
  //     }
  //   }
  //   if (!found) {
  //     let exercise = await Exercise.findOne({
  //       where: { id: userListProgram[i].id },
  //       include: Muscle,
  //     });
  //     Program.addExercise(exercise, {
  //       through: {
  //         series: userListProgram[i].series,
  //         repitions: userListProgram[i].repitions,
  //         day: userListProgram[i].day,
  //       },
  //     });
  //   }
  // }

  //console.log(storedProgram);
  // Exercise_program.destroy({
  //   where: {
  //     programId: req.params.id,
  //   },
  // });
  // for (let index = 0; index < ExerciseList.length; index++) {
  //   program.addExercise(ExerciseList[index].id, {
  //     through: {
  //       series: ExerciseList[index].exercise_program.series,
  //       repitions: ExerciseList[index].exercise_program.repitions,
  //       day: ExerciseList[index].exercise_program.day,
  //     },
  //   });
  // }

  res.status(200).send(storedProgram);
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
  let fulldata = [];
  await Program.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Exercise,
        include: [Muscle],
      },
    ],
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

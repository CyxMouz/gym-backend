const db = require("../models");
var ip = require("ip");

const Exercise = db.Exercise;
const Muscle = db.Muscle;
const Op = db.Sequelize.Op;
const Exercise_image = db.Exercise_image;
exports.create = async (req, res) => {
  const exercise = {
    name: req.body.name,
    description: req.body.description,
    default_series: req.body.series,
    default_repitions: req.body.repitions,
  };

  await Exercise.create(exercise)

    .then(() => {
      //   const exerciseImage = {
      //     exerciseId: exercise.id,
      //     arrayImage: req.body.arrayImage,
      //   };
      //   if (exerciseImage.arrayImage) {
      //     addImage(exerciseImage);
      //   }
      //   const exerciseUrl = {
      //     exerciseId: exercise.id,
      //     arrayUrl: req.body.arrayUrl,
      //   };
      //   if (exerciseUrl.arrayUrl) {
      //     addUrl(exerciseUrl);
      //   }
      res.status(200).send({ message: "exercise created" });
    })

    .catch((err) => res.status(500).send({ local: err }));
};
exports.findAll = (req, res) => {
  Exercise.findAll({
    include: [Muscle, Exercise_image],
    order: [["id", "ASC"]],
  })
    .then((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].exercise_images.length > 0) {
          response[
            i
          ].exercise_images[0].name = `http://${ip.address()}:${port}/${
            response[i].exercise_images[0].name
          }`;
        }
      }

      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise ",
      });
    });
};

exports.findAllFromProgramme = (req, res) => {
  Exercise.findAll({ where: { id: req.query.data }, include: Muscle })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      let data = [];
      res.send(data);
    });
};

exports.filterExercise = (req, res) => {
  if (Object.keys(req.query).length === 0) {
    Exercise.findAll({ include: Muscle })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch(() => {
        res.status(500).send({ message: "no exercise found in database" });
      });
  } else {
    Exercise.findAll({
      where: {
        [Op.not]: {
          id: req.query.data,
        },
      },
      include: Muscle,
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch(() => {
        res.status(500).send({ message: "no exercise found" });
      });
  }
};
exports.findByName = (req, res) => {
  const name = req.params.name;
  var condition = name ? { name: { [Op.like]: `%${name}` } } : null;

  Exercise.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise ",
      });
    });
};
exports.updateImage = (req, res) => {
  Exercise_image.findOne({
    where: {
      userId: req.params.id,
    },
  }).then((data) => {
    if (data != null) {
      try {
        if (req.file == undefined) {
          res.status(200).send({ message: `You must select a file.` });
        }

        Exercise_image.destroy({
          where: {
            userId: req.params.id,
          },
        });
        fs.unlinkSync(
          __basedir + "/app/resources/static/assets/tmp/" + data.name,
          data.data
        );

        const image = {
          userId: req.params.id,
          type: req.file.mimetype,
          name: req.file.originalname,
          data: fs.readFileSync(
            __basedir +
              "/app/resources/static/assets/uploads/" +
              req.file.filename
          ),
        };
        Exercise_image.create(image).then((image) => {
          fs.writeFileSync(
            __basedir + "/app/resources/static/assets/tmp/" + image.name,
            image.data
          );
          fs.unlinkSync(
            __basedir +
              "/app/resources/static/assets/uploads/" +
              req.file.filename
          );

          res.status(200).send({ message: `File has been uploaded.` });
        });
      } catch (error) {
        res.status(500).send({ message: `File not uploaded` });
      }
    } else {
      try {
        if (req.file == undefined) {
          res.status(200).send({ message: `You must select a file.` });
        }
        const image = {
          userId: req.params.id,
          type: req.file.mimetype,
          name: req.file.originalname,
          data: fs.readFileSync(
            __basedir +
              "/app/resources/static/assets/uploads/" +
              req.file.filename
          ),
        };
        Exercise_image.create(image).then((image) => {
          fs.writeFileSync(
            __basedir + "/app/resources/static/assets/tmp/" + image.name,
            image.data
          );
          res.status(200).send({ message: `File has been uploaded.` });
        });
      } catch (error) {
        res.status(500).send({ message: `File not uploaded` });
      }
    }
  });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Exercise.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Exercise not found",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Exercise.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Exercise updated" });
    })
    .catch((err) => res.status(500).send({ message: "Exercise not updated" }));
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Exercise.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Exercise deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Exercise not deleted" });
    });
};
exports.deleteAll = (req, res) => {
  var id = req.body.id;
  Exercise.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: `Exercise deleted` });
    })
    .catch((err) => {
      res.status(500).send({ message: `Exercise not deleted` });
    });
};

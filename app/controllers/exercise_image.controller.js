const db = require("../models");

const Op = db.Sequelize.Op;
const Exercise = db.Exercise;
const Exercise_image = db.Exercise_image;
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const ip = require("ip");
exports.updateImage = async (req, res) => {
  let saved = req.file.filename;
  if (req.file == undefined) {
    res.status(400).send({ message: `You must select a file.` });
  } else {
    const { filename: img } = req.file;

    try {
      await sharp(req.file.path, { animated: true, pages: -1 })
        .resize(200, 200)
        .gif({ quality: 100 })
        .toFile(
          path.resolve(req.file.destination, "../exercise_image", img),
          (err) => {
            if (err) {
              console.log("Error " + err.toString());
            } else {
              console.log("made ");
              fs.unlink(
                __basedir + "/app/resources/static/assets/uploads/" + saved,
                (err) => {
                  if (err) {
                    console.log("error deleting " + " " + err.toString());
                  } else {
                    console.log("deleted ");
                  }
                }
              );
            }
          }
        );
    } catch (error) {
      console.log(error);
    }

    let image = {
      exerciseId: req.params.id,
      type: req.file.mimetype,
      name: req.file.filename,
      data:
        __basedir +
        "/app/resources/static/assets/exercise_image/" +
        req.file.filename,
    };

    await Exercise_image.findOne({ where: { exerciseId: image.exerciseId } })
      .then((response) => {
        if (response == null) {
          Exercise_image.create(image);

          res.status(200).send({ message: "image uploded" });
        } else {
          let old_image = response.name;
          Exercise_image.update(image, {
            where: {
              exerciseId: response.exerciseId,
            },
          });
          fs.unlinkSync(
            __basedir +
              "/app/resources/static/assets/exercise_image/" +
              old_image
          );

          res.status(200).send({ message: "image updated" });
        }
      })

      .catch((e) => {
        res.status(401).send({ message: "exercise not found" });
      });
  }
};

async function resizeImage(images) {}

exports.getImage = (req, res) => {
  // add token to identify current user
  // if (req.file == undefined) {
  //   res.send(`You must select a file.`);
  // }
  Exercise.findByPk(req.params.id, {
    include: Exercise_image,
  })
    .then((data) => {
      // const image = {
      //   userId: req.params.id,
      //   type: req.file.mimetype,
      //   name: req.file.originalname,
      //   data: fs.readFileSync(
      //     __basedir + "/app/resources/static/assets/uploads/" + req.file.filename
      //   ),
      // };

      const imageArray = {
        exerciseId: req.params.id,
        imageId: data.exercise_images[0].id,
        type: data.exercise_images[0].type,
        name: data.exercise_images[0].name,
      };
      if (req.params.id != undefined) {
        Exercise_image.findOne({
          where: {
            exerciseId: imageArray.exerciseId,
          },
        })
          .then((image) => {
            try {
              let file;
              fs.readFileSync(
                (file =
                  __basedir +
                  "/app/resources/static/assets/exercise_image/" +
                  image.name)
              );
              res.sendFile(file);
            } catch (error) {
              console.log(error);
            }
          })
          .catch((err) => {
            res.send("No image found");
          });
      }
    })
    .catch((err) => {
      res.send("No image found");
    });
};
exports.getAllImage = async (req, res) => {
  // add token to identify current user
  // if (req.file == undefined) {
  //   res.send(`You must select a file.`);
  // }
  let tabimage = [];
  let tabexercise = [];
  let tabimex = [];
  Exercise_image.findAll()
    .then((response) => {
      for (let i = 0; i < response.length; i++) {
        response[i].name = `http://${ip.address()}:${port}/${response[i].name}`;
      }
      tabimage = response;
      Exercise.findAll()
        .then((response) => {
          tabexercise = response;
          for (let i = 0; i < tabexercise.length; i++) {
            for (let y = 0; y < tabimage.length; y++) {
              if (tabexercise[i].id == tabimage[y].exerciseId) {
                tabimex.push([tabexercise[i], tabimage[y]]);
                i++;
              }
            }
            tabimex.push([tabexercise[i]]);
          }
          res.send(tabimex);
        })
        .catch((err) => {
          res.status(500).send("error while searching for exercise");
        });
    })

    .catch((err) => {
      res.status(500).send("error while searching for exercise images");
    });
};
exports.update = (req, res) => {
  const image = {
    image: req.body.image,
  };

  Exercise_image.update(image, {
    where: {
      id: req.body.id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "image updated" });
    })
    .catch((err) => ({
      message: "image not updated",
    }));
};

exports.updateMultiple = (req, res) => {
  const multiImage = {
    arrayImage: req.body.arrayImage,
  };
  multiImage.arrayImage.map((data) => {
    var image = {
      image: data.image,
    };
    Exercise_image.update(image, {
      where: {
        id: data.id,
      },
    })
      .then(() => {
        res.status(200).send({ message: "image multi updated" });
      })
      .catch((err) => ({
        message: "image multi not updated",
      }));
  });
};

exports.findAll = (req, res) => {
  Exercise_image.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise_image ",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Exercise_image.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Exercise_image not found",
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Exercise_image.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Image deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Image not deleted" });
    });
};
exports.deleteAll = (req, res) => {
  Exercise_image.destroy({
    where: {},
  })
    .then(() => {
      res.status(200).send({ message: `Image deleted` });
    })
    .catch((err) => {
      res.status(500).send({ message: `Image not all deleted` });
    });
};

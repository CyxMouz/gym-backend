const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.User;
const User_stat = db.User_stats;
const User_image = db.User_image;
const User_program = db.User_program;
const Program = db.Program;
const ip = require("ip");
var bcrypt = require("bcryptjs");
const fs = require("fs");

// Create and Save user
exports.create = (req, res) => {
  // Validate request{
  const user = {
    user_role: req.body.user_role,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone,
    birth: req.body.birth,
    address: req.body.address,
    email: req.body.email,
    note: req.body.note,
    gender: req.body.gender,
  };

  User.create(user)
    .then((data) => {
      res.send({ message: "User was registered successfully!", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Register user error.",
      });
    });
};

exports.insertImage = (req, res) => {
  try {
    if (req.file == undefined) {
      res.status(200).send({ message: `You must select a file.` });
    }
    const image = {
      userId: req.params.id,
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.file.filename
      ),
    };
    User_image.create(image).then((image) => {
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/tmp/" + image.name,
        image.data
      );
      res.status(200).send({ message: `File has been uploaded.` });
    });
  } catch (error) {
    res.status(500).send({ message: `File not uploaded` });
  }
};
exports.updateImage = (req, res) => {
  User_image.findOne({
    where: {
      userId: req.params.id,
    },
  }).then((data) => {
    if (data != null) {
      try {
        if (req.file == undefined) {
          res.status(200).send({ message: `You must select a file.` });
        }

        User_image.destroy({
          where: {
            userId: req.params.id,
          },
        });
        fs.unlinkSync(
          __basedir + "/app/resources/static/assets/tmp/" + data.name,
          data.data
        );

        let image = {
          userId: req.params.id,
          type: req.file.mimetype,
          name: req.file.originalname,
          data: fs.readFileSync(
            __basedir +
              "/app/resources/static/assets/uploads/" +
              req.file.filename
          ),
        };

        User_image.create(image).then((image) => {
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
        let image = {
          userId: req.params.id,
          type: req.file.mimetype,
          name: req.file.originalname,
          data: fs.readFileSync(
            __basedir +
              "/app/resources/static/assets/uploads/" +
              req.file.filename
          ),
        };
        User_image.create(image).then((image) => {
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
exports.getImage = (req, res) => {
  // add token to identify current user
  // if (req.file == undefined) {
  //   res.send(`You must select a file.`);
  // }
  User.findByPk(req.params.id, {
    include: User_image,
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
        userId: req.params.id,
        id: data.user_images[0].id,
        type: data.user_images[0].type,
        name: data.user_images[0].name,
      };
      if (req.params.id == undefined) {
        res.send(`File not Found`);
      } else {
        User_image.findOne({
          where: {
            userId: imageArray.userId,
            id: imageArray.id,
          },
        }).then((image) => {
          if (image) {
            try {
              let file;
              fs.readFileSync(
                (file =
                  __basedir + "/app/resources/static/assets/tmp/" + image.name)
              );
              res.sendFile(file);
            } catch (error) {
              console.log(error);
            }
          }
        });
      }
    })
    .catch((err) => {
      res.json({ message: "No image found" });
    });
};
exports.update = (req, res) => {
  var id = req.params.id;
  User.update(req.body, {
    where: [{ id: id }],
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    });
};
exports.delete = (req, res) => {
  var id = req.params.id;
  User.destroy({
    where: { id: id },
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, {
    //attributes: { exclude: "password" },
    include: [User_stat, User_image],
  })
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};
exports.findAll = (req, res) => {
  var condition = req.body.condition ? { [Op.iLike]: `%${""}%` } : null;
  User.findAll({
    where: condition,
    include: User_image,
    order: [["id", "ASC"]],
  })
    .then((data) => {
      for (let index = 0; index < data.length; index++) {
        if (data[index].user_images[0]) {
          data[index].user_images[0].name = `http://${ip.address()}:${port}/${
            data[index].user_images[0].name
          }`;
        }
      }
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};
exports.findAllUserWithProgram = (req, res) => {
  User.findAll({
    include: User_program,
    order: [["id", "ASC"]],
  })
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

exports.createProgram = async (req, res) => {
  const user = await User.findOne({ where: { id: req.body.userId } });
  const program = await Program.findOne({
    where: { id: req.body.programId },
  });
  await user
    .addProgram(program)
    .then((data) => {
      res.status(200).send({
        message: `programme ${program.name} succesfully assigned to user ${
          user.first_name + " " + user.last_name
        }`,
      });
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};
exports.updateProgram = async (req, res) => {
  await User_program.update(req.body, {
    where: {
      userId: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};
exports.deleteProgram = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.userId } });
  const program = await Program.findOne({
    where: { id: req.params.programId },
  });
  await user
    .removeProgram(program)
    .then((data) => {
      res.status(200).send({
        message: `program ${program.name} succefully deleted from user ${
          user.first_name + " " + user.last_name
        }`,
      });
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};
exports.getAllProgram = async (req, res) => {
  await User.findAll({ include: Program })
    .then((data) => {
      let user_program = [];
      data.forEach((element) => {
        let program = [];
        for (let index = 0; index < element.programs.length; index++) {
          program.push({
            id: element.programs[index].id,
            name: element.programs[index].name,
          });
        }
        user_program.push({
          id: element.id,
          first_name: element.first_name,
          last_name: element.last_name,
          program,
        });
      });

      res.status(200).send(user_program);
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

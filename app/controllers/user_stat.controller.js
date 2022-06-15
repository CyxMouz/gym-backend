const res = require("express/lib/response");
const db = require("../models");

const Op = db.Sequelize.Op;
const User = db.User;
const User_stat = db.User_stats;
const User_weight_history = db.User_weight_history;

exports.setStat = (req, res) => {
  const stat = {
    last_weight: req.body.weight,
    height: req.body.height,
    userId: req.params.userId,
  };
  console.log(req.params);
  User_stat.create(stat)
    .then(() => {
      res.status(200).send({ message: "stats inserted" });
    })
    .catch(() => {
      res.status(500).send({
        message: "error stat not set",
      });
    });
};

exports.getStat = (req, res) => {
  console.log(res.userId);
  User_stat.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => res.status(404).send({ message: "not found!" }));
};

exports.update = (req, res) => {
  User_stat.findOne({
    where: {
      userId: req.params.userId,
    },
  })
    .then((data) => {
      console.log("update stat", req.body);
      const weight_history = {
        userId: req.params.userId,
        weight: data.last_weight,
        date: new Date(),
      };
      const weight_now = {
        userId: req.params.userId,
        last_weight: req.body.weight,
        height: req.body.height,
      };
      updateHistory(weight_history);
      updateWeight(weight_now);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: "error stat not found or can't be updated" });
    });
};

function updateHistory(weight_history) {
  User_weight_history.create(weight_history)
    .then((data) => {
      console.log(`hisotry weight updated ${data}`);
    })
    .catch(() => {
      console.log(`updating history weight failed!`);
    });
}

function updateWeight(weight_now) {
  User_stat.update(weight_now, {
    where: {
      userId: weight_now.userId,
    },
  })
    .then((data) => {
      console.log(`weight updated ${data}`);
    })
    .catch(() => {
      console.log(`updating weight failed`);
    });
}

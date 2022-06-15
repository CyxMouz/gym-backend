const db = require("../models");

const Op = db.Sequelize.Op;
const Exercise = db.Exercise;
const Exercise_url = db.Exercise_url;

// exercise parameter => { exerciseId: 1, arrayUrl: [ 'url_1', 'url_2' ] }
exports.createMultiple = (req, res) => {
  const multiUrl = {
    exerciseId: req.body.exerciseId,
    arrayUrl: req.body.arrayUrl,
  };
  multiUrl.arrayUrl.map((data) => {
    var url = {
      exerciseId: multiUrl.exerciseId,
      url: data,
    };
    Exercise_url.create(url)
      .then(() => {
        res.status(200).send({ message: "url created" });
      })
      .catch((err) => ({
        message: "url not created",
      }));
  });
};

exports.create = (req, res) => {
  const Url = {
    exerciseId: req.body.exerciseId,
    url: req.body.url,
  };
  Exercise_url.create(Url)
    .then(() => {
      res.status(200).send({ message: "url created" });
    })
    .catch((err) => ({
      message: "url not created",
    }));
};

exports.update = (req, res) => {
  const Url = {
    url: req.body.url,
  };

  Exercise_url.update(Url, {
    where: {
      exerciseId: req.body.exerciseId,
      id: req.body.id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "url updated" });
    })
    .catch((err) => ({
      message: "url not updated",
    }));
};

exports.updateMultiple = (req, res) => {
  const multiUrl = {
    arrayUrl: req.body.arrayUrl,
  };
  multiUrl.arrayUrl.map((data) => {
    var url = {
      url: data.url,
    };
    Exercise_url.update(url, {
      where: {
        id: data.id,
      },
    })
      .then(() => {
        res.status(200).send({ message: "url multi updated" });
      })
      .catch((err) => ({
        message: "url multi not updated",
      }));
  });
};

exports.findAll = (req, res) => {
  Exercise_url.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "can't find Exercise_url ",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Exercise_url.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Exercise_url not found",
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Exercise_url.destroy({
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
  Exercise_url.destroy({
    where: {},
  })
    .then(() => {
      res.status(200).send({ message: `Exercise deleted` });
    })
    .catch((err) => {
      res.status(500).send({ message: `Exercise not all deleted` });
    });
};

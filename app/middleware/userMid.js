const db = require("../models");
const User = db.User;

VerifyInformations = (req, res, next) => {
  try {
    if (!req.body.first_name) {
      res.status(401).json({
        message: "first name is missing",
      });
      return;
    }
    if (!req.body.last_name) {
      res.status(401).json({
        message: "last name is missing",
      });
      return;
    }
    if (!req.body.email) {
      res.status(401).json({
        message: "email is missing",
      });
      return;
    }
    if (!req.body.password) {
      res.status(401).json({
        message: "password is missing",
      });
      return;
    }

    next();
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

const checkInfor = {
  VerifyInformations: VerifyInformations,
};

module.exports = checkInfor;

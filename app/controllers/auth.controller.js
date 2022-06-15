const db = require("../models");
const config = require("../config/auth.config");
const UserModel = require("../models/user.model");
const User = db.User;
const Role = db.Role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
//const userModel = require("../models/user.model");
// const {refreshToken: RefreshToken } = db;
// const { RefreshToken } = require("../models");

const RefreshToken = db.RefreshTokens;
// const emailVlidator = require("../Validator/emailValidator");
// const userController = require("../controllers/user.controller");

exports.signin = (req, res) => {
  console.log(req.body);
  User.scope({ exclude: ["password"] })
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      // var token = jwt.sign({ id: user.id }, config.secret, {
      //   expiresIn: 86400// 24 hours

      // });

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = RefreshToken.createToken(user).then(() => {
        res.status(200).send({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = (req, res) => {
  const { refreshToken: refrechToken } = req.body;

  if (refrechToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = refrechToken.findOne({ where: { token: requestToken } });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (refreshToken.verifyExpiration(refreshToken)) {
      refreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const jwt = require("jsonwebtoken");

const config = require("../config/auth.config.js");
const { TokenExpiredError } = jwt;

const db = require("../models");
const User = db.User;

// isConnected = (req,res, next) => {
//   let token = req;
//   if (!token){
//     console.log(" Notconnected ")

//     return;
//   }
//   else {
//     return console.log(" connected")

//   }
// };
var getToken = async function (req, res, next) {
  await req.headers["x-access-token"];
  next();
};
var decodedToken = async function (req, res, next) {
  let token = await getToken(req);
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    next();
    return (req.userId = decoded.id);
  });
};

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: `Unauthorized!`,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};
isOwner = (req, res, next) => {
  console.log(req.accessToken);
  // jwt.verify(token, config.secret, (err, decoded) => {
  //   req.body.userId
  // }
  User.findByPk(req.body.userId).then((user) => {
    if (req.id === req.userId) {
      next();
      return;
    } else {
      res.status(400).send({
        message: "bad request",
      });
    }
  });
};

// verifyBnadem = (req, res, next) => {
//   let token = req.headers["x-access-token"];
//   if (!token) {
//     console.log("makach token")
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     console.log("req.params.id = ",req.params.id," decoded.id = ", decoded.id)
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!"
//       });
//     }
//     if (req.params.id == decoded.id) {
//       console.log("nta kho");
//      next();
//      return;
//     }
//     res.status(400).send({
//       message : "not you! "
//     });
//     console.log("machi nta")
//   });
// };

verifyBnadem = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    console.log("makach token");
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(
      "req.params.id = ",
      req.params.id,
      " decoded.id = ",
      decoded.id
    );
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    if (req.params.id == decoded.id) {
      console.log("nta kho");
      next();
      return;
    }
    res.status(400).send({
      message: "not you! ",
    });
    console.log("machi nta");
  });
};

verifyUser = (req, res) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    console.log("makach token");
  }
  console.log("kayen token");
  jwt.verify(token, config.secret, (err, decoded) => {
    //console.log("req.params.id = ",req.params.id," decoded.id = ", decoded.id)
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    User.findByPk(decoded.id).then((user) => {
      if (!user) {
        console.log("req.body.userId", req.body.userId);
        return res.status(400).send({
          message: "User doesn't exist",
        });
      } else if (req.body.userId != user.id) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isOwner: isOwner,
  verifyBnadem: verifyBnadem,
  verifyUser: verifyUser,
  //isValidToken : isValidToken,
  //isConnected: isConnected,
};
module.exports = authJwt;

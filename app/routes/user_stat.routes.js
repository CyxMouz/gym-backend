const { authJwt, verifySignUp } = require("../middleware");

module.exports = (app) => {
  const user_stat = require("../controllers/user_stat.controller");

  var router = require("express").Router();

  // app.post("/api/user_stat/", [authJwt.verifyToken]);
  // app.get("/api/user_stat/:id", [authJwt.verifyToken]);
  // app.put("/api/user_stat/", [authJwt.verifyToken]);

  // Create a new user
  router.post("/:userId", user_stat.setStat);
  router.put("/:userId", user_stat.update);
  router.get("/:id", user_stat.getStat);
  //   // Retrieve all user
  //   router.get("/all", user.findAll);

  //   // Retrieve a single user with id
  //   router.get("/:id", user.findOne);

  //   // Update a user with id
  //   router.put("/update", user.update);

  //   // Delete user with id
  //   router.delete("/:id", user.delete);

  app.use("/api/user_stat", router);
};

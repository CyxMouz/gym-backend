module.exports = (app) => {
  const user_program = require("../controllers/user.controller");

  var router = require("express").Router();

  // Create a new user
  router.post("/", user_program.createProgram);
  router.put("/:id", user_program.updateProgram);
  router.get("/all", user_program.getAllProgram);
  router.delete("/:userId/:programId", user_program.deleteProgram);
  //   // Retrieve all user
  //   router.get("/all", user.findAll);

  //   // Retrieve a single user with id
  //   router.get("/:id", user.findOne);

  //   // Update a user with id
  //   router.put("/update", user.update);

  //   // Delete user with id
  //   router.delete("/:id", user.delete);

  app.use("/api/user/user_program", router);
};

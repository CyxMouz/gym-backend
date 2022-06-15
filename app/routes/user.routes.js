const { authJwt, verifySignUp } = require("../middleware");
const upload = require("../middleware/uploadMid");
const checkInfo = require("../middleware/userMid");
module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.post("/api/user/", [verifySignUp.checkDuplicateEmailOrPhone]);
  // app.put("/api/user/update", [verifySignUp.checkDuplicateEmailOrPhone]);
  // app.get("/api/user/all", [authJwt.verifyToken]);

  // Create a new user
  router.post("/", [checkInfo.VerifyInformations], user.create);

  // Create a user image
  router.post(
    "/image/user/:id",
    upload.single("uploadedImage"),
    user.insertImage
  );
  router.put(
    "/image/user/:id",
    upload.single("uploadedImage"),
    user.updateImage
  );
  router.get("/image/:id", user.getImage);

  // Retrieve all user
  router.get("/all", user.findAll);
  // retrieve user with program
  router.get("/program", user.findAllUserWithProgram);
  // Retrieve a single user with id
  router.get("/:id", user.findOne);

  // Update a user with id
  router.put("/:id", user.update);

  // Delete user with id
  router.delete("/:id", user.delete);

  app.use("/api/user", router);
};

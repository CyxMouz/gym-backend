const upload = require("../middleware/uploadMid");

module.exports = (app) => {
  const exercise_image = require("../controllers/exercise_image.controller");

  var router = require("express").Router();

  // update
  router.post(
    "/:id",

    upload.single("uploadedImage"),
    exercise_image.updateImage
  );
  // router.put("/:id", upload.single("uploadedImage"), async function (req, res) {
  //   const imagePath = path.join(
  //     __basedir + "/app/resources/static/assets/exercise_image/"
  //   );
  //   const fileUpload = new Resize(imagePath);
  //   if (!req.file) {
  //     res.status(401).json({ error: "Please provide an image" });
  //   }
  //   const filename = await fileUpload.save(req.file.buffer);
  //   return res.status(200).json({ name: filename });
  // });
  // find all
  router.get("/", exercise_image.getAllImage);
  // find one
  router.get("/:id", exercise_image.getImage);
  // delete all
  router.delete("/deleteAll", exercise_image.deleteAll);
  // delete
  router.delete("/:id", exercise_image.delete);

  app.use("/api/exercise_image", router);
};

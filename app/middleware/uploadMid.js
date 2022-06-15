const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/app/resources/static/assets/uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-gym-${file.originalname}`);
  },
});

//var storage = multer.memoryStorage();

var upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = upload;

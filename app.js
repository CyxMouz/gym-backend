const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origins: ["http://localhost:8081"],
  },
});
global.port = 8080;

const bodyParser = require("body-parser");

const cors = require("cors");
const db = require("./app/models");
var path = require("path");
const socketController = require("./app/controllers/socket.controller");

var corsOptions = {
  origin: "http://localhost:8081",
};

//app.use(cookieParser())
app.use(express.json());
app.use(
  express.static(__dirname + "/app/resources/static/assets/exercise_image/"),
  express.static(__dirname + "/app/resources/static/assets/tmp/")
);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "10mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
global.__basedir = __dirname;
const Op = db.Sequelize.Op;
const Role = db.Role;
const Muscle = db.Muscle;
const Exercise = db.Exercise;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/user_stat.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/program.routes")(app);
require("./app/routes/exercise.routes")(app);
require("./app/routes/exercise_url.routes")(app);
require("./app/routes/exercise_image.routes")(app);
require("./app/routes/exercise_program.routes")(app);
require("./app/routes/muscle.routes")(app);
require("./app/routes/muscle_exercise.routes")(app);
require("./app/routes/user_program.routes")(app);
require("./app/controllers/socket.controller")(server);
//db.sequelize.sync({ alter: true });
//db.sequelize.sync();
//drop the table if it already exists

// db.sequelize.sync({ alter: true, force: true }).then(() => {
//   console.log("Drop and re-sync db.");

//   initial();
// });
// db.sequelize.sync().then(() => {
//   //init_muscle();
//   //init_role();
//   //init_exercise();
//   //init_muscle_exercise();
// });
init_role = async () => {
  const role = [
    { id: 1, description: "admin" },
    { id: 2, description: "modo" },
    { id: 3, description: "member" },
  ];
  for (i = 0; i < role.length; i++) {
    Role.create(role[i]);
  }
};

init_muscle = async () => {
  const muscle = [
    { id: 1, name: "Pectoraux" },
    { id: 2, name: "??paules" },
    { id: 3, name: "Biceps" },
    { id: 4, name: "Triceps" },
    { id: 5, name: "Quadriceps" },
    { id: 6, name: "Ischio-jambiers" },
    { id: 7, name: "Dorsaux" },
    { id: 8, name: "Fessiers" },
    { id: 9, name: "Abdominaux" },
    { id: 10, name: "Mollets" },
  ];
  for (i = 0; i < muscle.length; i++) {
    Muscle.create(muscle[i]);
  }
};
init_exercise_photo = async () => {
  const image_exercise = [await Exercise.insert];
};
init_exercise = async () => {
  const exercise = [
    // Pectoraux : 1-8
    { id: 1, name: "Pec deck" },
    { id: 2, name: "D??velopp?? machine" },
    { id: 3, name: "??cart??s aux c??bles" },
    { id: 4, name: "D??velopp?? aux halt??res" },
    { id: 5, name: "D??velopp?? couch??" },
    { id: 6, name: "D??velopp?? inclin?? ?? la barre" },
    { id: 7, name: "Ecart??s aux halt??res" },
    { id: 8, name: "Pull over" },

    // ??paules : 9-16
    { id: 9, name: "??l??vations lat??rales aux halt??res" },
    { id: 10, name: "D??velopp?? ?? la machine" },
    { id: 11, name: "D??velopp?? militaire aux halt??res" },
    { id: 12, name: "El??vations lat??rales" },
    { id: 13, name: "Oiseau arri??re ??paules" },
    { id: 14, name: "D??velopp?? militaire ?? la barre" },
    { id: 15, name: "Birds aux halt??res" },
    { id: 16, name: "Shrugs trap??zes" },

    // Biceps : 17-22
    { id: 17, name: "Curl aux halt??res" },
    { id: 18, name: "Curl au pupitre Larry Scott" },
    { id: 19, name: "Curl barre EZ" },
    { id: 20, name: "Curls alternatifs" },
    { id: 21, name: "Curl concentr??" },
    { id: 22, name: "Curl au c??ble" },

    // Triceps : 23-29
    { id: 23, name: "Extensions ?? la poulie haute" },
    { id: 24, name: "Dips entre deux bancs" },
    { id: 25, name: "Extensions en supination" },
    { id: 26, name: "D??velopp?? couch?? serr??" },
    { id: 27, name: "Dips" },
    { id: 28, name: "Barre au front" },
    { id: 29, name: "Kick back" },

    // Quadriceps : 30-33
    { id: 30, name: "Leg extension" },
    { id: 31, name: "Presse ?? cuisse" },
    { id: 32, name: "Squat ?? la barre guid??e" },
    { id: 33, name: "Squat ?? la barre libre" },

    // Ischio-jambiers : 34-36
    { id: 34, name: "Leg curl assis" },
    { id: 35, name: "Leg curl allong??" },
    { id: 36, name: "Soulev?? de terre jambes tendues" },

    // Dorsaux : 37-40
    { id: 37, name: "Tirages horizontal et vertical ?? la poulie" },
    { id: 38, name: "B??cheron rowing halt??re, unilat??ral" },
    { id: 39, name: "Tirage vertical prise serr??e" },
    { id: 40, name: "Rowing buste pench?? ?? la barre" },

    // Fessiers : 41-45
    { id: 41, name: "Balancier et machine ?? abductions" },
    { id: 42, name: "Fentes avant" },
    { id: 43, name: "Balancier extensions arri??res" },
    { id: 44, name: "Soulev?? de terre jambes tendues ?? la barre guid??e" },
    { id: 45, name: "Hip thrust" },

    // Abdominaux : 46-50
    { id: 46, name: "Crunch combin?? au sol" },
    { id: 47, name: "Relev?? de jambes ?? la chaise romaine" },
    { id: 48, name: "Crunch ?? la machine" },
    { id: 49, name: "Crunch ?? la poulie haute" },
    { id: 50, name: "Abs hip thrust" },

    // Mollets : 51-53
    { id: 51, name: "Extensions ?? la machine ?? mollet" },
    { id: 52, name: "Extensions unilat??rales" },
    { id: 53, name: "Assis, machine ?? sol??aires" },
  ];
  for (i = 0; i < exercise.length; i++) {
    await Exercise.create(exercise[i]);
  }
};

init_muscle_exercise = async () => {
  const muscle_exercise = [
    // Pectoraux : 1-8
    { muscleId: 1, exerciseId: 1 },
    { muscleId: 1, exerciseId: 2 },
    { muscleId: 1, exerciseId: 3 },
    { muscleId: 1, exerciseId: 4 },
    { muscleId: 1, exerciseId: 5 },
    { muscleId: 1, exerciseId: 6 },
    { muscleId: 1, exerciseId: 7 },
    { muscleId: 1, exerciseId: 8 },
    // ??paules : 9-16
    { muscleId: 2, exerciseId: 9 },
    { muscleId: 2, exerciseId: 10 },
    { muscleId: 2, exerciseId: 11 },
    { muscleId: 2, exerciseId: 12 },
    { muscleId: 2, exerciseId: 13 },
    { muscleId: 2, exerciseId: 14 },
    { muscleId: 2, exerciseId: 15 },
    { muscleId: 2, exerciseId: 16 },

    // Biceps : 17-22
    { muscleId: 3, exerciseId: 17 },
    { muscleId: 3, exerciseId: 18 },
    { muscleId: 3, exerciseId: 19 },
    { muscleId: 3, exerciseId: 20 },
    { muscleId: 3, exerciseId: 21 },
    { muscleId: 3, exerciseId: 22 },

    // Triceps : 23-29
    { muscleId: 4, exerciseId: 23 },
    { muscleId: 4, exerciseId: 24 },
    { muscleId: 4, exerciseId: 25 },
    { muscleId: 4, exerciseId: 26 },
    { muscleId: 4, exerciseId: 27 },
    { muscleId: 4, exerciseId: 28 },
    { muscleId: 4, exerciseId: 29 },

    // Quadriceps : 30-33
    { muscleId: 5, exerciseId: 30 },
    { muscleId: 5, exerciseId: 31 },
    { muscleId: 5, exerciseId: 32 },
    { muscleId: 5, exerciseId: 33 },
    // Ischio-jambiers : 34-36
    { muscleId: 6, exerciseId: 34 },
    { muscleId: 6, exerciseId: 35 },
    { muscleId: 6, exerciseId: 36 },
    // Dorsaux : 37-40
    { muscleId: 7, exerciseId: 37 },
    { muscleId: 7, exerciseId: 38 },
    { muscleId: 7, exerciseId: 39 },
    { muscleId: 7, exerciseId: 40 },
    // Fessiers : 41-45
    { muscleId: 8, exerciseId: 41 },
    { muscleId: 8, exerciseId: 42 },
    { muscleId: 8, exerciseId: 43 },
    { muscleId: 8, exerciseId: 44 },
    { muscleId: 8, exerciseId: 45 },
    // Abdominaux : 46-50
    { muscleId: 9, exerciseId: 46 },
    { muscleId: 9, exerciseId: 47 },
    { muscleId: 9, exerciseId: 48 },
    { muscleId: 9, exerciseId: 49 },
    { muscleId: 9, exerciseId: 50 },
    // Mollets : 51-53
    { muscleId: 10, exerciseId: 51 },
    { muscleId: 10, exerciseId: 52 },
    { muscleId: 10, exerciseId: 53 },
  ];
  var data_musclea, data_exoa;
  for (i = 0; i < muscle_exercise.length; i++) {
    data_exoa = await Exercise.findOne({
      where: { id: muscle_exercise[i].exerciseId },
    });
    data_musclea = await Muscle.findOne({
      where: { id: muscle_exercise[i].muscleId },
    });
    data_exoa.addMuscle(data_musclea, { through: "muscle_exercise" });
  }
};
//connected_user = 0;
// io.on("connection", (socket) => {
//   connected_user++;
//   console.log("a user connected", connected_user),
//     socket.on("disconnect", () => {
//       console.log("user disconnected", connected_user);
//       connected_user--;
//     });
// });

io.on("connection", socketController);

server.listen(port, () => {
  console.log(`server running on port : ${port}`);
});

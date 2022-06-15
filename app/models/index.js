const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

// database call
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,

  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
// import
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.User_stats = require("./user_stats.model")(sequelize, Sequelize);
db.User_weight_history = require("./user_weight_history.model")(
  sequelize,
  Sequelize
);
db.User_image = require("./user_image.model")(sequelize, Sequelize);
db.Role = require("./role.model")(sequelize, Sequelize);

db.RefreshTokens = require("../models/refreshToken.model.js")(
  sequelize,
  Sequelize
);
db.Program = require("./program.model")(sequelize, Sequelize);

db.Muscle = require("./muscle.mode")(sequelize, Sequelize);
db.Muscle_image = require("./muscle_image.model")(sequelize, Sequelize);

db.Exercise = require("./exercise.model")(sequelize, Sequelize);
db.Exercise_url = require("./exercise_url.model")(sequelize, Sequelize);
db.Exercise_image = require("./exercise_image.model")(sequelize, Sequelize);
db.Exercise_program = require("./exercise_program.model")(sequelize, Sequelize);

// user stats
db.User.hasMany(db.User_stats, { onDelete: "cascade", hooks: true });
db.User_stats.belongsTo(db.User, {
  foreignKey: "userId",
});

// user weight history
db.User.hasMany(db.User_weight_history, { onDelete: "cascade", hooks: true });
db.User_weight_history.belongsTo(db.User, {
  foreignKey: "userId",
});
// user image
db.User.hasMany(db.User_image, { onDelete: "cascade", hooks: true });
db.User_image.belongsTo(db.User, {
  foreignKey: "userId",
});

// user refresh token
db.User.hasOne(db.RefreshTokens, {
  onDelete: "cascade",
  hooks: true,
  foreignKey: "userId",
});
db.RefreshTokens.belongsTo(db.User, {
  foreignKey: "userId",
  constraints: false,
});

// program user
db.User.belongsToMany(db.Program, {
  through: "user_program",
  onDelete: "cascade",
  hooks: true,
});
db.Program.belongsToMany(db.User, { through: "user_program" });

// exercise specified
db.Exercise.belongsToMany(db.Program, { through: db.Exercise_program });
db.Program.belongsToMany(db.Exercise, {
  through: db.Exercise_program,
  onDelete: "cascade",
  hooks: true,
});

// exercise muscle
db.Exercise.belongsToMany(db.Muscle, { through: "muscle_exercise" });
db.Muscle.belongsToMany(db.Exercise, {
  through: "muscle_exercise",
  onDelete: "cascade",
  hooks: true,
});

// exercise image
db.Exercise.hasMany(db.Exercise_image, { onDelete: "cascade", hooks: true });
db.Exercise_image.belongsTo(db.Exercise, {
  foreignKey: "exerciseId",
});
// exercise url
db.Exercise.hasMany(db.Exercise_url, { onDelete: "cascade", hooks: true });
db.Exercise_url.belongsTo(db.Exercise, {
  foreignKey: "exerciseId",
});
// muscle image
db.Muscle.hasMany(db.Muscle_image, { onDelete: "cascade", hooks: true });
db.Muscle_image.belongsTo(db.Muscle, {
  foreignKey: "muscleId",
});
// roles
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

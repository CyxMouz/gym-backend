module.exports = (sequelize, Sequelize) => {
  const Exercise_image = sequelize.define("exercise_image", {
    type: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    data: {
      type: Sequelize.BLOB("long"),
    },
  });
  return Exercise_image;
};

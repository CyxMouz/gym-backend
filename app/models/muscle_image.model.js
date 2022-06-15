module.exports = (sequelize, Sequelize) => {
  const Muscle_image = sequelize.define("muscle_image", {
    image: {
      type: Sequelize.STRING,
    },
  });
  return Muscle_image;
};

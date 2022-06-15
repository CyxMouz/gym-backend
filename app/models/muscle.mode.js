module.exports = (sequelize, Sequelize) => {
  const Muscle = sequelize.define("muscle", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Muscle;
};

module.exports = (sequelize, Sequelize) => {
  const Exercise = sequelize.define("exercise", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.STRING,
    },
    default_series: {
      type: Sequelize.INTEGER,
    },
    default_repitions: {
      type: Sequelize.INTEGER,
    },
  });
  return Exercise;
};

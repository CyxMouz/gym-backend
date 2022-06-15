module.exports = (sequelize, Sequelize) => {
  const Exercise_program = sequelize.define("exercise_program", {
    series: {
      type: Sequelize.STRING,
    },
    repitions: {
      type: Sequelize.STRING,
    },
  });
  return Exercise_program;
};

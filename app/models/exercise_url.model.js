module.exports = (sequelize, Sequelize) => {
  const Exercise_url = sequelize.define("exercise_url", {
    url: {
      type: Sequelize.STRING,
    },
  });
  return Exercise_url;
};

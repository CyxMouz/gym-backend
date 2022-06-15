module.exports = (sequelize, Sequelize) => {
  const Program = sequelize.define("program", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Program;
};

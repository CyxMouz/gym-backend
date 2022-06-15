module.exports = (sequelize, Sequelize) => {
  const User_weight_history = sequelize.define("user_weight_history", {
    weight: {
      type: Sequelize.FLOAT,
    },
    date: {
      type: Sequelize.DATE,
    },
  });
  return User_weight_history;
};

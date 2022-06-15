module.exports = (sequelize, Sequelize) => {
  const User_stats = sequelize.define("user_stat", {
    last_weight: {
      type: Sequelize.FLOAT,
    },
    height: {
      type: Sequelize.FLOAT,
    },
    injured_since: {
      type: Sequelize.DATE,
    },
    injured_until: {
      type: Sequelize.DATE,
    },
  });
  return User_stats;
};

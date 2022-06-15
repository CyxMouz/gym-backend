module.exports = (sequelize, Sequelize) => {
  const User_image = sequelize.define("user_image", {
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
  return User_image;
};

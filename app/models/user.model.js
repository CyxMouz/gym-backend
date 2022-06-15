const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      user_role: {
        type: Sequelize.BIGINT,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },

      phone: {
        type: Sequelize.STRING,
      },
      birth: {
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
      },
      accessToken: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
        min: 6,
        allowNull: false,
        notEmpty: true,
      },
    },
    {
      // freezeTableName : true means it will leave table name as its defined, false means it will be in plural
      //freezeTableName: true,
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        },
      },
    }
  );

  User.createToken = async function () {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();

    let user = await this.create({
      token: _token,
      // expiryDate: expiredAt.getTime(),
    });

    return user.token;
  };

  return User;
};

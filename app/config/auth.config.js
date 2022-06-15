module.exports = {
  secret: "minato-secret-key",
  jwtExpiration: 86400, // 24 hour
  jwtRefreshExpiration: 86400, // 24 hours
};

//node ./node_modules/sequelize-auto-migrations/bin/makemigration.js

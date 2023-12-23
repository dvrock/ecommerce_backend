var Sequelize = require("sequelize");

// Creating a sequelize object for DB connection
const sequelize = new Sequelize(
  "eccommerce",
  "root",
  "123456",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = {
  sequelize,
  Sequelize,
};


const Credentials = require("./credential");
const { sequelize, Sequelize } = require("../database");


const CredentialsModel = Credentials(sequelize, Sequelize);
module.exports = {
  CredentialsModel
};

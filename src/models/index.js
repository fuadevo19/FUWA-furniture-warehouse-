const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user")(sequelize, Sequelize.DataTypes);

const db = {
  Sequelize,
  sequelize,
  User,
};

module.exports = db;

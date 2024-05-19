const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fuwa", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

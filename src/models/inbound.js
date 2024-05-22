const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./product");

const Inbound = sequelize.define(
  "Inbound",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reference_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

Product.hasMany(Inbound, { foreignKey: "product_id" });
Inbound.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Inbound;

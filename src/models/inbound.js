const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./product");

const Inbound = sequelize.define("Inbound", {
  datetime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  reference_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const InboundProduct = sequelize.define("InboundProducts", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Inbound.belongsToMany(Product, { through: InboundProduct });
Product.belongsToMany(Inbound, { through: InboundProduct });

module.exports = { Inbound, InboundProduct };

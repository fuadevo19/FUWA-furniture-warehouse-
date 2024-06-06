const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OutboundProduct = sequelize.define(
    "OutboundProduct",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      outbound_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Outbounds",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return OutboundProduct;
};

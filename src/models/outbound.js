const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Outbound = sequelize.define(
    "Outbound",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Outbound;
};

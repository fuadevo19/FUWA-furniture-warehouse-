const { Op } = require("sequelize");
const Product = require("../models/product");

const countStockLevels = async () => {
  try {
    const BarangTersedia = await Product.count({
      where: {
        stock: {
          [Op.gt]: 10,
        },
      },
    });

    const BarangHampirHabis = await Product.count({
      where: {
        stock: {
          [Op.lte]: 10,
        },
      },
    });

    const BarangHabis = await Product.count({
      where: {
        stock: 0,
      },
    });

    return {
      BarangTersedia,
      BarangHampirHabis,
      BarangHabis,
    };
  } catch (error) {
    console.error("Error counting products with stock levels:", error);
    throw error;
  }
};

module.exports = countStockLevels;

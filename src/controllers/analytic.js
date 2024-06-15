const { Op } = require("sequelize");
const Product = require("../models/product");

const countStockLevels = async () => {
  try {
    const barang_tersedia = await Product.count({
      where: {
        stock: {
          [Op.gt]: 10,
        },
      },
    });

    const barang_hampir_habis = await Product.count({
      where: {
        stock: {
          [Op.lte]: 10,
        },
      },
    });

    const barang_habis = await Product.count({
      where: {
        stock: 0,
      },
    });

    return {
      barang_tersedia,
      barang_hampir_habis,
      barang_habis,
    };
  } catch (error) {
    console.error("Error counting products with stock levels:", error);
    throw error;
  }
};

module.exports = countStockLevels;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("../models/product");
const Outbound = require("../models/outbound")(sequelize);
const OutboundProduct = require("../models/outboundProduct")(sequelize);

// Define associations
Outbound.hasMany(OutboundProduct, { foreignKey: "outbound_id" });
OutboundProduct.belongsTo(Product, { foreignKey: "product_id" });

const createOutbound = async (req, res) => {
  const { datetime, customer_id, customer_name, customer_address, customer_number, status, products } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const outbound = await Outbound.create(
      {
        datetime,
        customer_id,
        customer_name,
        customer_address,
        customer_number,
        status,
      },
      { transaction }
    );

    for (const product of products) {
      const { id, quantity } = product;
      const existingProduct = await Product.findByPk(id, { transaction });

      if (existingProduct && existingProduct.stock >= quantity) {
        existingProduct.stock -= quantity;
        await existingProduct.save({ transaction });

        await OutboundProduct.create(
          {
            outbound_id: outbound.id,
            product_id: id,
            quantity,
          },
          { transaction }
        );
      } else {
        throw new Error(`Insufficient stock for product id: ${id}`);
      }
    }

    await transaction.commit();
    res.status(201).json({ message: "Outbound created successfully" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getOutbounds = async (req, res) => {
  try {
    const outbounds = await Outbound.findAll({
      include: [
        {
          model: OutboundProduct,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "description", "sku", "weight", "size", "zone"],
            },
          ],
        },
      ],
    });

    res.status(200).json(outbounds);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createOutbound,
  getOutbounds,
};

const { Inbound, InboundProduct } = require("../models/inbound");
const Product = require("../models/product");

exports.createInbound = async (req, res) => {
  const { datetime, reference_number, supplier_id, products } = req.body;

  try {
    const inbound = await Inbound.create({
      datetime,
      reference_number,
      supplier_id,
    });

    await Promise.all(
      products.map(async (product) => {
        const inboundProduct = await InboundProduct.create({
          InboundId: inbound.id,
          ProductId: product.id,
          quantity: product.quantity,
          name: product.name,
          description: product.description,
          sku: product.sku,
          size: product.size,
          weight: product.weight,
          zone: product.zone,
        });

        const existingProduct = await Product.findByPk(product.id);
        existingProduct.stock += product.quantity;
        await existingProduct.save();

        return inboundProduct;
      })
    );

    const result = await Inbound.findByPk(inbound.id, {
      include: [
        {
          model: Product,
          through: {
            attributes: ["quantity", "name", "description", "sku", "size", "weight", "zone"],
          },
        },
      ],
    });

    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllInbounds = async (req, res) => {
  try {
    const inbounds = await Inbound.findAll({
      include: [
        {
          model: Product,
          through: {
            attributes: ["quantity", "name", "description", "sku", "size", "weight", "zone"],
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      results: inbounds.length,
      data: inbounds,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInboundById = async (req, res) => {
  const { id } = req.params;

  try {
    const inbound = await Inbound.findByPk(id, {
      include: [
        {
          model: Product,
          through: {
            attributes: ["quantity", "name", "description", "sku", "size", "weight", "zone"],
          },
        },
      ],
    });

    if (!inbound) {
      return res.status(404).json({ message: "Inbound not found" });
    }

    res.status(200).json({
      status: "success",
      data: inbound,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteInbound = async (req, res) => {
  const { id } = req.params;

  try {
    const inbound = await Inbound.findByPk(id);

    if (!inbound) {
      return res.status(404).json({ message: "Inbound not found" });
    }

    await InboundProduct.destroy({ where: { InboundId: id } });
    await inbound.destroy();

    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateInbound = async (req, res) => {
  const { id } = req.params;
  const { datetime, reference_number, supplier_id, products } = req.body;

  try {
    const inbound = await Inbound.findByPk(id);

    if (!inbound) {
      return res.status(404).json({ message: "Inbound not found" });
    }

    await inbound.update({ datetime, reference_number, supplier_id });

    const existingInboundProducts = await InboundProduct.findAll({
      where: { InboundId: id },
    });
    await Promise.all(
      existingInboundProducts.map(async (inboundProduct) => {
        const existingProduct = await Product.findByPk(inboundProduct.ProductId);
        existingProduct.stock -= inboundProduct.quantity;
        await existingProduct.save();
      })
    );

    await InboundProduct.destroy({ where: { InboundId: id } });

    await Promise.all(
      products.map(async (product) => {
        const inboundProduct = await InboundProduct.create({
          InboundId: inbound.id,
          ProductId: product.id,
          quantity: product.quantity,
          name: product.name,
          description: product.description,
          sku: product.sku,
          size: product.size,
          weight: product.weight,
          zone: product.zone,
        });

        const existingProduct = await Product.findByPk(product.id);
        existingProduct.stock += product.quantity;
        await existingProduct.save();

        return inboundProduct;
      })
    );

    const result = await Inbound.findByPk(inbound.id, {
      include: [
        {
          model: Product,
          through: {
            attributes: ["quantity", "name", "description", "sku", "size", "weight", "zone"],
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

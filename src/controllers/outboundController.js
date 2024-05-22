const Outbound = require("../models/outbound");
const Product = require("../models/product");

// Menambahkan barang keluar dan mengurangi stok produk
exports.addOutbound = async (req, res) => {
  const {
    product_id,
    quantity,
    customer_name,
    customer_address,
    customer_number,
  } = req.body;

  try {
    const outbound = await Outbound.create({
      product_id,
      quantity,
      customer_name,
      customer_address,
      customer_number,
    });

    // Cari produk berdasarkan ID dan kurangi stok
    const product = await Product.findByPk(product_id);
    if (product) {
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      product.stock -= quantity; // Reduce stock
      await product.save();
    }

    res
      .status(201)
      .json({ message: "Outbound added and stock updated", outbound });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menampilkan semua barang keluar
exports.getAllOutbounds = async (req, res) => {
  try {
    const outbounds = await Outbound.findAll({
      include: {
        model: Product,
        attributes: ["id", "name"],
      },
    });

    const formattedResults = outbounds.map((outbound) => ({
      outbound_id: outbound.id,
      datetime: outbound.datetime,
      customer_name: outbound.customer_name,
      customer_address: outbound.customer_address,
      customer_number: outbound.customer_number,
      products: [
        {
          id: outbound.Product.id,
          name: outbound.Product.name,
          quantity: outbound.quantity,
        },
      ],
    }));

    res.json({
      status: "success",
      results: formattedResults.length,
      data: formattedResults,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menampilkan barang keluar berdasarkan ID
exports.getOutboundById = async (req, res) => {
  const { id } = req.params;

  try {
    const outbound = await Outbound.findByPk(id, {
      include: {
        model: Product,
        attributes: ["id", "name"],
      },
    });

    if (!outbound) {
      return res.status(404).json({ message: "Outbound not found" });
    }

    const formattedResult = {
      outbound_id: outbound.id,
      datetime: outbound.datetime,
      customer_name: outbound.customer_name,
      customer_address: outbound.customer_address,
      customer_number: outbound.customer_number,
      products: [
        {
          id: outbound.Product.id,
          name: outbound.Product.name,
          quantity: outbound.quantity,
        },
      ],
    };

    res.json({
      status: "success",
      data: formattedResult,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus barang keluar dan memperbarui stok produk
exports.deleteOutbound = async (req, res) => {
  const { id } = req.params;

  try {
    const outbound = await Outbound.findByPk(id);

    if (!outbound) {
      return res.status(404).json({ message: "Outbound not found" });
    }

    const product = await Product.findByPk(outbound.product_id);
    if (product) {
      product.stock += outbound.quantity; // Revert stock
      await product.save();
    }

    await outbound.destroy();

    res.status(200).json({ message: "Outbound deleted and stock updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Memperbarui barang keluar dan memperbarui stok produk
exports.updateOutbound = async (req, res) => {
  const { id } = req.params;
  const {
    product_id,
    quantity,
    customer_name,
    customer_address,
    customer_number,
  } = req.body;

  try {
    const outbound = await Outbound.findByPk(id);

    if (!outbound) {
      return res.status(404).json({ message: "Outbound not found" });
    }

    // Update stock based on the difference in quantities
    const product = await Product.findByPk(outbound.product_id);
    if (product) {
      if (product.stock + outbound.quantity < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      product.stock += outbound.quantity; // Revert stock by old quantity
      product.stock -= quantity; // Reduce stock by new quantity
      await product.save();
    }

    // Update the outbound entry
    outbound.product_id = product_id;
    outbound.quantity = quantity;
    outbound.customer_name = customer_name;
    outbound.customer_address = customer_address;
    outbound.customer_number = customer_number;
    await outbound.save();

    res
      .status(200)
      .json({ message: "Outbound updated and stock adjusted", outbound });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Inbound = require("../models/inbound");
const Product = require("../models/product");

// Menambahkan barang masuk dan memperbarui stok produk
exports.addInbound = async (req, res) => {
  const { product_id, quantity, reference_number } = req.body;

  try {
    const inbound = await Inbound.create({
      product_id,
      quantity,
      reference_number,
    });

    // Cari produk berdasarkan ID dan tambahkan stok
    const product = await Product.findByPk(product_id);
    if (product) {
      product.stock += quantity; // Update stock
      await product.save();
    }

    res
      .status(201)
      .json({ message: "Inbound added and stock updated", inbound });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menampilkan semua barang masuk
exports.getAllInbounds = async (req, res) => {
  try {
    const inbounds = await Inbound.findAll({
      include: {
        model: Product,
        attributes: ["id", "name"],
      },
    });

    const formattedResults = inbounds.map((inbound) => ({
      inbound_id: inbound.id,
      datetime: inbound.date,
      reference_number: inbound.reference_number,
      products: [
        {
          id: inbound.Product.id,
          name: inbound.Product.name,
          quantity: inbound.quantity,
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

// Menampilkan barang masuk berdasarkan ID
exports.getInboundById = async (req, res) => {
  const { id } = req.params;

  try {
    const inbound = await Inbound.findByPk(id, {
      include: {
        model: Product,
        attributes: ["id", "name"],
      },
    });

    if (!inbound) {
      return res.status(404).json({ message: "Inbound not found" });
    }

    const formattedResult = {
      inbound_id: inbound.id,
      datetime: inbound.date,
      reference_number: inbound.reference_number,
      products: [
        {
          id: inbound.Product.id,
          name: inbound.Product.name,
          quantity: inbound.quantity,
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

// Menghapus barang masuk dan memperbarui stok produk
exports.deleteInbound = async (req, res) => {
  const { id } = req.params;

  try {
    const inbound = await Inbound.findByPk(id);

    if (!inbound) {
      return res.status(404).json({ message: "Inbound not found" });
    }

    const product = await Product.findByPk(inbound.product_id);
    if (product) {
      product.stock -= inbound.quantity; // Reduce stock
      await product.save();
    }

    await inbound.destroy();

    res.status(200).json({ message: "Inbound deleted and stock updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Memperbarui barang masuk dan memperbarui stok produk
exports.updateInbound = async (req, res) => {
  const { id } = req.params;
  const { product_id, quantity, reference_number } = req.body;

  try {
    const inbound = await Inbound.findByPk(id);

    if (!inbound) {
      return res.status(404).json({ message: "Inbound not found" });
    }

    // Update stock based on the difference in quantities
    const product = await Product.findByPk(inbound.product_id);
    if (product) {
      product.stock -= inbound.quantity; // Reduce stock by old quantity
      product.stock += quantity; // Increase stock by new quantity
      await product.save();
    }

    // Update the inbound entry
    inbound.product_id = product_id;
    inbound.quantity = quantity;
    inbound.reference_number = reference_number;
    await inbound.save();

    res
      .status(200)
      .json({ message: "Inbound updated and stock adjusted", inbound });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

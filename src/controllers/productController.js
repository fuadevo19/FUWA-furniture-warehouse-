const Product = require("../models/product");

// Menampilkan semua produk
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan produk baru
exports.addProduct = async (req, res) => {
  const { name, description, sku, weight, size, zone, stock } = req.body;
  console.log(req.body); // Tambahkan log ini untuk melihat data yang diterima
  try {
    const newProduct = await Product.create({
      name,
      description,
      sku,
      weight,
      size,
      zone,
      stock,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(400).json({ message: error.message });
  }
};

// Menampilkan produk berdasarkan ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengupdate produk
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, sku, weight, size, zone, stock } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.update({
        name,
        description,
        sku,
        weight,
        size,
        zone,
        stock,
      });
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus produk
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

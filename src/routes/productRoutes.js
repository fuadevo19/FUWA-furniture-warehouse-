const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticate = require("../middlewares/auth");

router.get("/products", authenticate, productController.getAllProducts);
router.post("/products", authenticate, productController.addProduct);
router.get("/products/:id", authenticate, productController.getProductById);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;

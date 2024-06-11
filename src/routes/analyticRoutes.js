const express = require("express");
const countStockLevels = require("../controllers/analytic");

const router = express.Router();

router.get("/analytic", async (req, res) => {
  try {
    const stockLevels = await countStockLevels();
    res.status(200).json(stockLevels);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;

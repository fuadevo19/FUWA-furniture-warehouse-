const express = require("express");
const {
  createInbound,
  getAllInbounds,
  getInboundById,
  updateInbound,
  deleteInbound,
} = require("../controllers/inboundController");

const router = express.Router();

router.post("/inbound", createInbound);
router.get("/inbound", getAllInbounds);
router.get("/inbound/:id", getInboundById);
router.put("/inbound/:id", updateInbound);
router.delete("/inbound/:id", deleteInbound);

module.exports = router;

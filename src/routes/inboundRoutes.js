const express = require("express");
const { createInbound, getAllInbounds, getInboundById, updateInbound, deleteInbound } = require("../controllers/inboundController");
const authenticate = require("../middlewares/auth");
const router = express.Router();

router.post("/inbound", authenticate, createInbound);
router.get("/inbound", authenticate, getAllInbounds);
router.get("/inbound/:id", authenticate, getInboundById);
router.put("/inbound/:id", updateInbound);
router.delete("/inbound/:id", deleteInbound);

module.exports = router;

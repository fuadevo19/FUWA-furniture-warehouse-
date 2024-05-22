const express = require("express");
const router = express.Router();
const outboundController = require("../controllers/outboundController");

router.get("/outbounds", outboundController.getAllOutbounds);
router.get("/outbounds/:id", outboundController.getOutboundById);
router.post("/outbounds", outboundController.addOutbound);
router.delete("/outbounds/:id", outboundController.deleteOutbound);
router.put("/outbounds/:id", outboundController.updateOutbound); // Route for updating outbound

module.exports = router;

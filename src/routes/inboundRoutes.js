const express = require("express");
const router = express.Router();
const inboundController = require("../controllers/inboundController");

router.get("/inbounds", inboundController.getAllInbounds);
router.get("/inbounds/:id", inboundController.getInboundById);
router.post("/inbounds", inboundController.addInbound);
router.delete("/inbounds/:id", inboundController.deleteInbound);
router.put("/inbounds/:id", inboundController.updateInbound);

module.exports = router;

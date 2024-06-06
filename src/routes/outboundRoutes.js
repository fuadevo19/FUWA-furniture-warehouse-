const express = require("express");
const router = express.Router();
const outboundController = require("../controllers/outboundController");
//const authenticate = require("../middlewares/auth");

router.post("/outbound", outboundController.createOutbound);
router.get("/outbound", outboundController.getOutbounds);
router.put("/outbound/:id", outboundController.updateOutboundStatus);
module.exports = router;

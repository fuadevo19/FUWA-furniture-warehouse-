const express = require("express");
const router = express.Router();
const outboundController = require("../controllers/outboundController");
//const authenticate = require("../middlewares/auth");

router.post("/outbound", outboundController.createOutbound);

module.exports = router;

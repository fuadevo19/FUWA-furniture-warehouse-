const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const inboundRoutes = require("./routes/inboundRoutes");
const outboundRoutes = require("./routes/outboundRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", inboundRoutes);
app.use("/api", outboundRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

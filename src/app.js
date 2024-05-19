const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const sequelize = require("./config/database");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server berjalan di port ${PORT}`);
});

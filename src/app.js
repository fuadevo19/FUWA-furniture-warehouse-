const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

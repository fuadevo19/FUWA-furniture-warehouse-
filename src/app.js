const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const inboundRoutes = require("./routes/inboundRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", inboundRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

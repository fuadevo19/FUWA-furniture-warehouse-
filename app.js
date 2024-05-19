const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./src/config/database");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use("/api", productRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

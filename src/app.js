const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server berjalan di port ${PORT}`);
});

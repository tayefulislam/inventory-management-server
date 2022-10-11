const express = require("express");
const app = express();

const cors = require("cors");

const mongoose = require("mongoose");
const { json } = require("express");

// middle ware
app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");

app.get("/", (req, res) => {
  res.send("Route is working");
});

// add new product
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);

module.exports = app;

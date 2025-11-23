// backend/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // baca routes/index.js

const app = express();
// Middleware Globalapp.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing Utama
app.use("/api", routes);

// Default Route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend API is running 🚀",
  });
});

module.exports = app;
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const paymentRoutes = require("../routes/payment.routes");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;

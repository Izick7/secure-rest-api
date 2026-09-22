const express = require("express");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const authLimiter = require("./middleware/rateLimitMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Secure REST API is running"
    });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
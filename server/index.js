

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/authRoute");

require("dotenv").config();

const MONGO_DB_URL = process.env.DB_URL || "";
const PORT = process.env.PORT || "";

const app = express();

// MIDDLEWARES
app.use(cors()); // Use cors middleware correctly
app.use(express.json());

// ROUTE
app.use("/api/auth", authRoute);

// MONGODB CONNECTION
mongoose
  .connect(MONGO_DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  // Fix parameter order for error handling middleware
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// SERVER
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

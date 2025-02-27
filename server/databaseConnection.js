const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS configuration with dynamic origin handling
const allowedOrigins = [
  "http://localhost:3000", // Local frontend
  "http://ec2-15-206-148-161.ap-south-1.compute.amazonaws.com", // Deployed frontend
  "http://15.206.148.161",
  "http://3.111.19.139",
  "http://thelabel39.com",
  "https://thelabel39.com",
  "http://localhost:5000", // Local frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman) or listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors({ origin: "*" })); // Apply CORS middleware
app.use(express.json()); // Only need to call this once

// MongoDB Connection
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

// Routes and static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const ProductRoutes = require("./routes/event");
app.use("/api", ProductRoutes);

// Serve static files
app.use(express.static("uploads"));

// Error handling
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

// 🔧 Fixed allowed origins — no trailing slashes
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://ec2-15-206-148-161.ap-south-1.compute.amazonaws.com",
  "http://15.206.148.161",
  "https://3.111.19.139",
  "http://3.111.19.139",
  "https://thelabel39.com",
  "http://thelabel39.com",
  "http://localhost:5000",
  "https://label39-ishankadam-19-sakecacins-projects.vercel.app",
  "https://label39-1.onrender.com",
];

// ✅ CORS options with origin normalization and logging
const corsOptions = {
  origin: (origin, callback) => {
    const normalizedOrigin = origin?.replace(/\/$/, "");
    console.log("Request Origin:", origin);

    if (!origin || allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// 🔁 Preflight requests
app.options("*", cors(corsOptions));

// JSON Parser
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

// Routes and static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const ProductRoutes = require("./routes/event");
app.use("/api", ProductRoutes);

// Error handler
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

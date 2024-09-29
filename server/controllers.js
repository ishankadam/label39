const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());

// Serve static files from the cropped_images directory
app.use("/cropped_images", express.static("cropped_images"));

const upload = multer({ dest: "uploads/" }); // Temp folder to store uploaded files

// POST route to handle file upload and processing

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

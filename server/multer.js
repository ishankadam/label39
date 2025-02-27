const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Set up multer storage with dynamic destination based on category
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Parse products data from the request body
    const productsData = JSON.parse(req.body.products);

    // Find the category for the current file based on index
    const fileIndex = req.files?.length || 0;
    const productCategory = productsData[fileIndex]?.category;

    if (!productCategory) {
      return cb(new Error("Product category is missing"));
    }

    // Define the folder path dynamically based on the category
    const categoryFolder = path.join("uploads", productCategory);

    // Create the directory if it doesn't exist
    fs.mkdirSync(categoryFolder, { recursive: true });

    cb(null, categoryFolder); // Set the destination to the category folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"));
    }
  },
});

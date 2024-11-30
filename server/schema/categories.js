const mongoose = require("mongoose");

// Define the schema
const categorySchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return typeof v === "number"; // Ensure it's a number
      },
      message: "Value must be a number",
    },
  },
  name: {
    type: String,
    required: true, // Make name required
  },
  description: {
    type: String, // Assuming category is a string
    required: true, // Make category required
  },
  image: {
    type: Array,
    required: true, // Make url required for each image
  },
});

// Create the model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

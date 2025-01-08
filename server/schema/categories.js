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
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  order: {
    type: Number,
  },
  isActive: { type: Boolean, default: true },
  value: { type: String },
});

// Create the model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

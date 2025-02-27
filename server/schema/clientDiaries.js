const mongoose = require("mongoose");

// Define the schema
const clientDiariesSchema = new mongoose.Schema({
  clientDiariesId: {
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
  image: {
    type: Array,
    required: true,
  },
  videoSrc: {
    type: String,
  },
  productId: {
    type: Object,
    required: true,
  },
  isActive: { type: Boolean, default: true },
  priority: { type: Number },
});

// Create the model
const clientDiaries = mongoose.model("clientDiaries", clientDiariesSchema);

module.exports = clientDiaries;

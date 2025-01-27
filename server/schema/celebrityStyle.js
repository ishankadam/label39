const mongoose = require("mongoose");

// Define the schema
const celebrityStyleSchema = new mongoose.Schema({
  celebrityStyleId: {
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
});

// Create the model
const CelebrityStyle = mongoose.model("celebrityStyle", celebrityStyleSchema);

module.exports = CelebrityStyle;

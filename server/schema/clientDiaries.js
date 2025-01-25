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
  isActive: { type: Boolean, default: true },
});

// Create the model
const ClientDiaries = mongoose.model("ClientDiaries", clientDiariesSchema);

module.exports = ClientDiaries;

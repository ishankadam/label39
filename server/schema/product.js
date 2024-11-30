const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        if (typeof v === "string" || v instanceof String) {
          return false;
        }
      },
      message: "Value is not a  number",
    },
  },
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  sizes: { type: Object },
  garmentDetails: { type: Array },
  deliveryIn: { type: Array },
  images: { type: Array },
  bestseller: { type: Boolean },
  asSeenOn: { type: String },
  videoSrc: { type: String },
});

// Create the model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

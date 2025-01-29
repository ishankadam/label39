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
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  sizes: { type: Object, required: true },
  garmentDetails: { type: Array },
  deliveryIn: { type: Array, required: true },
  images: { type: Array, required: true },
  bestseller: { type: Boolean },
  soldOut: { type: Boolean, default: false },
  asSeenOn: { type: String },
  videoSrc: { type: String },
  isActive: { type: Boolean, default: true },
  color: { type: Array },
  priority: { type: Number },
  readyToShip: { type: Boolean, default: true },
  fabric: { type: String },
  sale: { type: Object },
});

// Create the model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

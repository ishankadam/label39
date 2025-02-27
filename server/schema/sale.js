const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discountType: {
      type: String,
      enum: ["Percentage", "Amount"], // Either a percentage discount or a fixed amount
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0, // Percentage or amount value
    },
    products: {
      type: Object,
    },
    isActive: {
      type: Boolean,
      default: true, // Toggle to deactivate the sale
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;

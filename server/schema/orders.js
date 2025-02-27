const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  paymentId: { type: String, required: true },
  checkoutData: { type: Object },
  paymentInfo: { type: Object },
  cartItems: { type: Array },
  status: {
    type: String,
    default: "placed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);

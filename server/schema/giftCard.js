const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    uqiue: true,
  },
  transactions: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
  expiryDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
});

//create mode
const Giftcard = mongoose.model("Giftcard", giftCardSchema);

module.exports = Giftcard;

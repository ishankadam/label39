const Razorpay = require("razorpay");
require("dotenv").config();
const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_SECRET;

console.log("key_id", key_id);
console.log("key_secret", key_secret);

const razorpayInstance = new Razorpay({
  key_id: key_id, // Replace with your key_id
  key_secret: key_secret, // Replace with your key_secret
});

module.exports = razorpayInstance;

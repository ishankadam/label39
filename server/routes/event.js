const express = require("express");
const cors = require("cors");
const router = express.Router();
const controller = require("../controller/controllers");
const Razorpay = require("razorpay");
const corsOptions = {
  origin: `http://localhost:3000`, // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

router.use(cors(corsOptions)); // Apply CORS middleware
router.use(express.json()); // Middleware to parse JSON request bodies

// Routes
router.get("/getData", controller.get_all_data);
router.post("/createProduct", controller.create_product);

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: 50000, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Error handling middleware
router.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

module.exports = router;

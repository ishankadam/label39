const express = require("express");
const cors = require("cors");
const router = express.Router();
const controller = require("../controller/controllers");

router.use(express.json()); // Middleware to parse JSON request bodies

// Routes
router.post("/getProducts", controller.get_all_Products);
router.post("/createProduct", controller.create_product);

router.post("/createOrder", controller.createPayment);

// Create Delivery Order
router.post("/createDelivery", controller.createDeliveryOrder);

// Track Delivery Order
router.get("/trackOrder/:trackingId", controller.trackDeliveryOrder);
// Error handling middleware
router.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

module.exports = router;

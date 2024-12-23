const express = require("express");
const cors = require("cors");
const router = express.Router();
const controller = require("../controller/controllers");

router.use(express.json()); // Middleware to parse JSON request bodies

// Routes for products
router.post("/getProducts", controller.get_all_products);
router.post(
  "/createProduct",
  controller.upload.array("images"),
  controller.create_product
);

router.put(
  "/editProduct",
  controller.upload.array("images"),
  controller.edit_product
);

router.put("/product/:id/disable", controller.toggleProductStatus);

// Routes for categories
router.get("/getCategories", controller.get_all_categories);

// Routes for Testimonials
router.get("/getTestimonials", controller.get_all_testimonials);

// Create Delivery Order
router.post("/createOrder", controller.createPayment);
router.post("/createDelivery", controller.createDeliveryOrder);

// Track Delivery Order
router.get("/trackOrder/:trackingId", controller.trackDeliveryOrder);

//create Category
router.post(
  "/createCategory",
  controller.upload.array("image"),
  controller.create_category
);

// Edit Category
router.put(
  "/editCategory",
  controller.upload.array("image"),
  controller.edit_category
);

router.put("/category/:id/disable", controller.toggleCategoryStatus);

//create user
router.post("/createUser", controller.create_user);

//Fetch all users
router.get("/getUsers", controller.get_all_users);

// Check Login Credentials
router.post("/login", controller.checkLoginCredentials);

// Error handling middleware
router.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

module.exports = router;

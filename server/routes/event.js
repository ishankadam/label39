const express = require("express");
const router = express.Router();
const controller = require("../controller/controllers");

router.use(express.json()); // Middleware to parse JSON request bodies

// Routes for products
router.post("/getProducts", controller.get_all_products);

// Route for products to be dsipalyed on homepage
router.post("/getProductsForHomepage", controller.getProductsForHomepage);

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

router.put("/update-priorities", controller.updateProductPriorities);

router.put(
  "/update-clientDiaries-priorities",
  controller.updateClientDiariesPriority
);

router.put(
  "/update-celebrityStyles-priorities",
  controller.updateCelebrityStylePriority
);

// Routes for categories
router.get("/getCategories", controller.get_all_categories);

// Routes for Testimonials
router.get("/getTestimonials", controller.get_all_testimonials);

// Create Delivery Order
router.post("/createOrder", controller.createPayment);

router.post("/verify-payment", controller.verifyPayment);

router.post("/createDelivery", controller.createDeliveryOrder);

// Track Delivery Order
router.get("/trackOrder/:trackingId", controller.trackDeliveryOrder);

// Get all orders
router.post("/getOrders", controller.get_all_orders);

// Change order status
router.post("/changeOrderStatus", controller.change_order_status);

// Update cart
router.post("/updateCart", controller.updateCart);

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

// Add to Cart
router.post("/addToCart", controller.add_to_cart);

// Get Cart Items
router.post("/getCartItems", controller.getCartItems);

//create client diaries
router.post(
  "/createClientDiaries",
  controller.upload.array("image"),
  controller.create_client_diaries
);

// get all client diaries
router.get("/getClientDiaries", controller.get_all_client_diaries);

// create celebrity style
router.post(
  "/createCelebrityStyles",
  controller.upload.array("image"),
  controller.create_celebrity_styles
);

// get all celebrity styles
router.get("/getCelebrityStyles", controller.get_all_celebrity_styles);

//create giftcard
router.post("/createGiftcard", controller.create_giftcard);

// get all giftcard
router.get("/getGiftcard", controller.get_all_giftcard);

// check discount code
router.post("/check-discount-code", controller.checkDiscountCode);

// Sales
router.post("/createSale", controller.createSale);
router.get("/getSales", controller.getAllSales);

// query email
router.post("/send-query-email", controller.sendQueryEmail);

// discount
router.post("/createDiscount", controller.createDiscount);
router.get("/getDiscounts", controller.getAllDiscounts);

// reset password
router.post("/reset-password/:token", controller.resetPassword);

// forgot password
router.post("/forgot-password", controller.forgotPassword);

// get product details
router.get("/getProductDetails/:productId", controller.getProductDetails);

// create subscription
router.post("/createSubscribers", controller.create_subscriber);

// get all subscribers
router.get("/subscribers", controller.get_all_subscribers);

// get user details
router.get("/getUserDetails/:userId", controller.get_user_details);

// create testimonial
router.post(
  "/createTestimonials",
  controller.upload.array("image"),
  controller.create_testimonial
);

router.put(
  "/editTestimonials",
  controller.upload.array("image"),
  controller.edit_testimonial
);

router.post("/send-message", controller.sendWhatsAppMessage);

router.put(
  "/editClientDiaries",
  controller.upload.array("image"),
  controller.edit_client_diaries
);

router.put(
  "/editCelebrityStyles",
  controller.upload.array("image"),
  controller.edit_celebrity_Styles
);

// edit testimonial
// router.put("/editTestimonial", controller.edit_testimonial);

// Error handling middleware
router.use((error, _req, res) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

module.exports = router;

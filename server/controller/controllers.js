const axios = require("axios");
const razorpayInstance = require("../razorpay");
const multer = require("multer");
const Product = require("../schema/product");
const Category = require("../schema/categories");
const Testimonial = require("../schema/testimonial");
const User = require("../schema/user");
const path = require("path");
const parentDir = path.join(__dirname, "..");
const fs = require("fs");
const md5 = require("md5");
var _ = require("lodash");
const { createJSONToken } = require("../auth");
const orders = require("../schema/orders");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    let category;
    try {
      if (req.body.products) {
        category = "products";
      } else if (req.body.category) {
        category = "categories";
      } else if (req.body.testimonial) {
        category = "testimonial";
      } else {
        return cb(
          new Error(
            "Either products, categories, or testimonial data is required"
          )
        );
      }

      if (!category) {
        return cb(new Error("Category is required"));
      }

      // For products, create separate directories for photos and videos
      if (category === "products") {
        const dir = path.join(parentDir, "uploads", category);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
      } else {
        const dir = path.join(parentDir, "uploads", category);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
      return cb(new Error("Invalid data format in request body"));
    }
  },
});

const fileFilter = (_req, file, cb) => {
  // Accept image and video files
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file type. Only images and videos are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Limit file size to 100MB
  },
});

const checkLoginInput = (password) => {
  const hashPassword = md5(password);
  return hashPassword;
};

const create_user = async (req, res) => {
  try {
    const newCreatedUser = new User({
      userId: Math.floor(Math.random() * 9000000000) + 1,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: md5(req.body.password),
    });
    await newCreatedUser.save();
    const userDetails = await User.aggregate([
      { $match: { userId: newCreatedUser.userId } },
      { $project: { _id: 0 } },
    ]);
    res.send(userDetails);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    res.end();
  }
};

const checkLoginCredentials = async (req, res) => {
  let userEmail = req.body.email;
  let password = req.body.password;
  // check if email exists

  try {
    const user = await User.aggregate([
      { $match: { email: userEmail } },
      { $project: { _id: 0 } },
    ]);
    if (user.length > 0) {
      const hashPassword = checkLoginInput(password);
      if (_.isEqual(user[0].password, hashPassword)) {
        const token = createJSONToken(userEmail);
        res.send({
          isValid: true,
          token,
          employeeDetails: user[0],
        });
        res.end();
      } else {
        res.status(404);
        res.send({
          isPasswordInvalid: true,
        });
      }
    } else {
      res.status(404);
      res.send({
        isEmailInvalid: true,
      });
      res.end();
    }
  } catch (error) {
    console.log(error);
    res.json(error);
    res.end();
  }
};

const get_all_products = async (req, res) => {
  try {
    const country = req.body.country;
    const isActive = req.body.isActive;
    if (!country) {
      return res.status(400).json({ message: "Country code is required" });
    }

    // Fetch all products from the database
    let products;
    if (isActive) {
      products = await Product.find({ isActive: true }).select("-_id").sort({
        priority: 1,
      });
    } else {
      products = await Product.find({}).select("-_id").sort({
        priority: 1,
      });
    }

    // If the selected country is INR, no need to convert
    if (country === "INR") {
      // Just send the products as they are
      return res.status(200).json(products);
    }

    // Fetch exchange rates from INR to other currencies (USD, GBP, etc.)
    const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest/INR";
    const exchangeResponse = await axios.get(EXCHANGE_API_URL);

    const rates = exchangeResponse.data.rates;

    if (!rates[country]) {
      return res
        .status(404)
        .json({ message: "Exchange rate not found for this country" });
    }

    const exchangeRate = rates[country]; // Get the exchange rate for the requested country

    // Convert product prices based on the exchange rate
    const updatedProducts = products.map((product) => ({
      ...product._doc, // Spread original product data
      price: (product.price * exchangeRate).toFixed(2), // Convert price from INR to the selected currency
      currency: country, // Add the currency code (USD, GBP, etc.)
    }));

    // Send updated products in the response
    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error("Error fetching products or exchange rates:", error);
    res
      .status(500)
      .json({ message: "Error fetching products or exchange rates", error });
  }
};

const create_product = async (req, res) => {
  try {
    const productsData = JSON.parse(req.body.products); // This will now be an array
    const images = req.files.map((file) => file.filename);

    const newProduct = {
      productId: Math.floor(Math.random() * 9000000000) + 1,
      name: productsData.name,
      description: productsData.description,
      sizes: productsData.sizes || [],
      price: productsData.price,
      garmentDetails: productsData.garmentDetails || [],
      category: productsData.category,
      bestSeller: productsData.bestseller,
      deliveryIn: productsData.deliveryIn,
      isActive: true,
      bestseller: productsData.bestseller || false,
    };

    if (productsData.asSeenOn) {
      newProduct.asSeenOn = productsData.asSeenOn;
    }
    if (productsData.videoSrc) {
      newProduct.videoSrc = productsData.videoSrc;
    }
    const newProductData = {
      ...newProduct,
      images,
    };
    const newCreatedProduct = new Product(newProductData);
    await newCreatedProduct.save();

    const allProduct = await Product.find({}, { _id: 0 });
    res.send(allProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const createPayment = async (req, res) => {
  const { currency, receipt } = req.body;
  const amount = _.parseInt(req.body.amount);
  try {
    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Convert amount to smallest currency unit (e.g., paise for INR)
      currency: currency || "INR",
      receipt: receipt || "receipt#1",
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      checkoutData,
      cartItems,
    } = req.body;

    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");
    console.log(expectedSign);

    if (razorpay_signature === expectedSign) {
      // Payment is successful, store data in the database
      const order = new orders({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        checkoutData: checkoutData,
        paymentInfo: {
          status: "success",
          method: "razorpay",
        },
        cartItems,
      });
      await order.save();

      return res.status(200).json({
        order: order,
        message: "Payment verified successfully",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Invalid signature sent!",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error!",
      success: false,
    });
  }
};

const authenticateDeliveryService = async () => {
  try {
    const response = await axios.post(
      `${process.env.SHIPROCKET_API_URL}/auth/login`,
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );

    return response.data.token; // Return the authentication token
  } catch (error) {
    console.error("Error authenticating with delivery service:", error);
    throw new Error("Authentication failed");
  }
};

const createDeliveryOrder = async (req, res) => {
  try {
    const token = await authenticateDeliveryService();
    const deliveryData = req.body;
    const response = await axios.post(
      `${process.env.SHIPROCKET_API_URL}/orders/create/adhoc`,
      deliveryData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    res.status(201).json(response.data); // Send back the delivery order details
  } catch (error) {
    console.error("Error creating delivery order:", error);
  }
};

const trackDeliveryOrder = async (req, res) => {
  try {
    const token = await authenticateDeliveryService();
    const { trackingId } = req.params;

    const response = await axios.get(
      `${process.env.SHIPROCKET_API_URL}/courier/track/shipment/${trackingId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.status(200).json(response.data); // Send back the tracking details
  } catch (error) {
    console.error("Error tracking delivery order:", error);
    res.status(400).json({ error: "Failed to track delivery order" });
  }
};

const get_all_categories = async (_req, res) => {
  try {
    const category = await Category.find({})
      .select("-_id -__v")
      .sort({ order: 1 }); // Exclude _id and __v fields
    res.status(200).json(category); // Send the result as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const get_all_testimonials = async (_req, res) => {
  try {
    const category = await Testimonial.find({}).select("-_id -__v"); // Exclude _id and __v fields
    res.status(200).json(category); // Send the result as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const toggleProductStatus = async (req, res) => {
  try {
    const productToBeUpdated = await Product.find({
      productId: Number(req.params.id),
    });

    const product = await Product.findOneAndUpdate(
      { productId: Number(req.params.id) }, // Find by the custom field 'productId'
      { $set: { isActive: !productToBeUpdated[0].isActive } }, // Set isActive to false
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const allProduct = await Product.find({}, { _id: 0 });
    res.status(200).json({
      message: "Product disabled successfully",
      allProduct,
    });
  } catch (error) {
    console.error("Error disabling product:", error);
    res.status(500).json({
      message: "Failed to disable product",
      error: error.message,
    });
  }
};

const edit_product = async (req, res) => {
  try {
    const images = req.files.map((file) => file.filename);

    // Check if productId is defined
    if (!productId) {
      return res.status(400).send({ error: "productId is required" });
    }

    // Prepare updatedProduct with name and images formatted accordingly

    const filteredImages = editedProduct.images.filter(
      (item) => typeof item === "string" && item.trim() !== ""
    );

    editedProduct.images = [...filteredImages, ...images];
    const updatedProduct = {
      productId,
      ...editedProduct,
    };

    await Product.replaceOne({ productId: productId }, updatedProduct, {
      upsert: true,
    });

    const allProducts = await Product.find({}, { _id: 0 });
    res.send(allProducts); // Send the updated product list
  } catch (error) {
    console.error("Error in edit_product:", error);
    res.status(400).send({ error: error.message });
  }
};

const create_category = async (req, res) => {
  try {
    // Parse the products data from the request body
    const categoryData = JSON.parse(req.body.category); // Assuming it's a JSON string
    const images = req.files || []; // Safely get images
    // Validate the productsData structure
    if (typeof categoryData !== "object" || categoryData === null) {
      return res.status(400).send({
        error: "Invalid data format. Expecting a product object.",
      });
    }
    const image =
      Array.isArray(images) && images.length > 0
        ? images[0].filename
        : images.filename;

    // Generate a unique product ID for each product
    const newCreatedCategory = new Category({
      categoryId: Math.floor(Math.random() * 9000000000) + 1,
      name: categoryData.name,
      description: categoryData.description,
      image: image,
    });
    newCreatedCategory;
    await newCreatedCategory.save();

    const allCategory = await Category.find({});
    res.send(allCategory);
  } catch (error) {
    console.log("Error while creating products:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating products." });
  }
};

const edit_category = async (req, res) => {
  try {
    const editData = JSON.parse(req.body.category); // Parse incoming category data
    const { categoryId, ...editedCategory } = editData;
    // const categoryToBeEdited = await Category.findOne({
    //   categoryId: categoryId,
    // });
    // const imagePath = path.join(
    //   parentDir,
    //   "uploads",
    //   "categories",
    //   categoryToBeEdited.imgSrc
    // );
    // fs.unlink(imagePath, (err) => {
    //   if (err) {
    //     console.error("Error deleting image file:", err);
    //   } else {
    //     console.log("Image file deleted successfully");
    //   }
    // });
    // Check if req.files is an object (field names mapped to arrays) or an array directly
    const images = Array.isArray(req.files)
      ? req.files // If `req.files` is directly an array
      : req.files.image || []; // Access specific field name if `req.files` is an object

    // Prepare updatedCategory with name, images, and categoryId

    const updatedCategory = {
      categoryId, // Add categoryId to retain it in the document
      ...editedCategory,
      image: images.map((image) => image.originalname)[0], // Array of filenames
    };

    // Replace or insert the category with upsert
    await Category.replaceOne({ categoryId: categoryId }, updatedCategory, {
      upsert: true,
    });

    // Retrieve all categories excluding _id
    const allCategory = await Category.find({}, { _id: 0 });
    res.send(allCategory); // Send the updated category list
  } catch (error) {
    console.error("Error in edit_category:", error);
    res.status(400).send({ error: error.message });
  }
};

const toggleCategoryStatus = async (req, res) => {
  try {
    const categoryToBeUpdated = await Category.find({
      categoryId: Number(req.params.id),
    });

    const category = await Category.findOneAndUpdate(
      { categoryId: Number(req.params.id) }, // Find by the custom field 'categoryId'
      { $set: { isActive: !categoryToBeUpdated[0].isActive } }, // Set isActive to false
      { new: true } // Return the updated product
    );

    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }

    const allCategory = await Category.find({}, { _id: 0 });
    res.status(200).json({
      message: "Category disabled successfully",
      allCategory,
    });
  } catch (error) {
    console.error("Error disabling category:", error);
    res.status(500).json({
      message: "Failed to disable category",
      error: error.message,
    });
  }
};

const get_all_users = async (_req, res) => {
  try {
    const users = await User.find({}).select("-_id -__v"); // Exclude _id and __v fields
    res.status(200).json(users); // Send the result as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const add_to_cart = async (req, res) => {
  const { userId, cartItems } = req.body; // Extract userId and cartItems from request body

  try {
    // Check if the user exists
    const user = await User.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the item in the cart
    const itemIndex = user.cart.findIndex(
      (item) => item.productId === cartItems.productId
    );

    if (itemIndex > -1) {
      // If item exists, increment quantity
      user.cart[itemIndex].quantity += cartItems.quantity || 1;
    } else {
      // Otherwise, add the new item
      user.cart.push({ ...cartItems, quantity: cartItems.quantity || 1 });
    }

    // Mark the cart field as modified
    user.markModified("cart");

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Failed to update cart" });
  }
};

const getCartItems = async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findOne({ userId: userId })
      .select("cart")
      .populate("cart")
      .lean();
    const cartItems = user?.cart || [];
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

const get_all_orders = async (_req, res) => {
  try {
    const ordersData = await orders.find({}).select("-_id -__v"); // Exclude _id and __v fields
    console.log(ordersData);
    res.status(200).json(ordersData); // Send the result as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const updateProductPriorities = async (req, res) => {
  try {
    // Get the list of products with their updated priorities from the request body
    const { products } = req.body; // Assuming priorities is an array of objects like [{ productId: 1, priority: 2 }, ...]
    console.log(products);
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .send({ error: "Priorities array is required and cannot be empty" });
    }

    // Iterate through the priorities and update each product
    const updatePromises = products.map(async (item) => {
      const { productId, priority } = item;

      if (!productId || typeof priority !== "number") {
        throw new Error("Invalid productId or priority in the request");
      }

      // Update the product with the new priority
      await Product.updateOne({ productId: productId }, { $set: { priority } });
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    // Send updated product list
    const allProducts = await Product.find({}, { _id: 0 }).sort({
      priority: 1,
    });
    res.send(allProducts); // Return the list of all products
  } catch (error) {
    console.error("Error in update_product_priorities:", error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  get_all_products,
  create_product,
  createPayment,
  createDeliveryOrder,
  trackDeliveryOrder,
  get_all_categories,
  get_all_testimonials,
  upload,
  toggleProductStatus,
  edit_product,
  create_category,
  edit_category,
  toggleCategoryStatus,
  create_user,
  get_all_users,
  checkLoginCredentials,
  add_to_cart,
  getCartItems,
  verifyPayment,
  get_all_orders,
  updateProductPriorities,
};

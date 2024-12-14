const axios = require("axios");
const razorpayInstance = require("../razorpay");
const multer = require("multer");
const Product = require("../schema/product");
const Category = require("../schema/categories");
const Testimonial = require("../schema/testimonial");
const path = require("path");
const parentDir = path.join(__dirname, "..");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let category;
    try {
      // Parse `req.body` based on whether it contains `products` or `categories`
      if (req.body.products) {
        category = "products";
      } else if (req.body.category) {
        category = "categories";
      } else if (req.body.testimonial) {
        category = "testimonial";
      } else {
        return cb(new Error("Either products or categories data is required"));
      }

      // Validate `category` existence
      if (!category) {
        return cb(new Error("Category is required"));
      }

      // Define and create the directory path
      const dir = path.join(parentDir, "uploads", category);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir); // Set the directory as the destination
    } catch (error) {
      console.error("Error parsing data:", error);
      return cb(new Error("Invalid data format in request body"));
    }
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save file with its original name
  },
});

const upload = multer({ storage });

const get_all_products = async (req, res) => {
  try {
    const country = req.body.country;

    if (!country) {
      return res.status(400).json({ message: "Country code is required" });
    }

    // Fetch all products from the database
    const products = await Product.find({}).select("-_id"); // Assume prices are stored in INR

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
  const { amount, currency, receipt } = req.body;

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
    res.status(500).json({ success: false, message: error.message });
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

const get_all_categories = async (req, res) => {
  try {
    const category = await Category.find({}).select("-_id -__v"); // Exclude _id and __v fields
    res.status(200).json(category); // Send the result as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const get_all_testimonials = async (req, res) => {
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

    console.log(productToBeUpdated[0].isActive);

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
    const editData = JSON.parse(req.body.products); // Parse incoming product data
    const images = req.files.map((file) => file.filename);

    // Destructure productId and prepare updated product data
    const { productId, ...editedProduct } = editData;
    const productToBeEdited = await Product.findOne({ productId: productId });
    // const imagePath = path.join(
    //   parentDir,
    //   "uploads",
    //   productToBeEdited.category,
    //   productToBeEdited.images[0]
    // );

    // fs.unlink(imagePath, (err) => {
    //   if (err) {
    //     console.error("Error deleting image file:", err);
    //   } else {
    //     console.log("Image file deleted successfully");
    //   }
    // });
    // Check if productId is defined
    if (!productId) {
      return res.status(400).send({ error: "productId is required" });
    }

    // Prepare updatedProduct with name and images formatted accordingly
    console.log(editedProduct);

    console.log(editedProduct.images);
    console.log(images);
    editedProduct.images = [...editedProduct.images, ...images];
    const updatedProduct = {
      productId,
      ...editedProduct,
    };
    // Replace or insert the product with upsert
    // await Product.replaceOne({ productId: productId }, updatedProduct, {
    //   upsert: true,
    // });

    // Retrieve all products excluding _id
    const allProducts = await Product.find({}, { _id: 0 });
    res.send(allProducts); // Send the updated product list
  } catch (error) {
    console.error("Error in edit_product:", error);
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
};

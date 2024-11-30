const axios = require("axios");
const razorpayInstance = require("../razorpay");
const Product = require("../schema/product");
const Category = require("../schema/categories");

const get_all_products = async (req, res) => {
  console.log(req.body.country); // Log the selected country code
  try {
    const country = req.body.country;

    if (!country) {
      return res.status(400).json({ message: "Country code is required" });
    }

    // Fetch all products from the database
    const products = await Product.find({}); // Assume prices are stored in INR

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
  const newProductId = Math.floor(Math.random() * 9000000000) + 1;
  try {
    const newCreatedProduct = new Product({
      productId: newProductId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      sizes: req.body.sizes || [],
      garmentDetails: req.body.garmentDetails || [],
      deliveryIn: req.body.deliveryIn,
    });
    await newCreatedProduct.save();
    const allProduct = await Product.aggregate([{ $project: { _id: 0 } }]);
    res.send(allProduct);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    res.end();
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

module.exports = {
  get_all_products,
  create_product,
  createPayment,
  createDeliveryOrder,
  trackDeliveryOrder,
  get_all_categories,
};

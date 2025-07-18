const axios = require("axios");
const razorpayInstance = require("../razorpay");
const multer = require("multer");
const Product = require("../schema/product");
const Category = require("../schema/categories");
const Testimonial = require("../schema/testimonial");
const User = require("../schema/user");
const path = require("path");
const multerS3 = require("multer-s3");
const md5 = require("md5");
var _ = require("lodash");
const { createJSONToken } = require("../auth");
const orders = require("../schema/orders");
const crypto = require("crypto");
const Giftcard = require("../schema/giftCard");
const clientDiaries = require("../schema/clientDiaries");
const CelebrityStyle = require("../schema/celebrityStyle");
const Sale = require("../schema/sale");
const sendEmail = require("../emailer");
const discount = require("../schema/discount");
const jwt = require("jsonwebtoken");
const Subscriber = require("../schema/subscribers");
const aws = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE, // Auto-detect content type
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      let folder = "others"; // Default folder

      if (req.body.products) {
        folder = "products";
      } else if (req.body.category) {
        folder = "categories";
      } else if (req.body.clientDiaries) {
        folder = "clientDiaries";
      } else if (req.body.celebrityStyles) {
        folder = "celebrityStyles";
      } else if (req.body.testimonials) {
        folder = "testimonials";
      }

      const fileName = `${file.originalname}`;
      cb(null, `${folder}/${fileName}`); // Store files in respective folders
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images and videos are allowed"), false);
    }
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

module.exports = upload;

// const storage = multer.diskStorage({
//   destination: (req, _file, cb) => {
//     let category;
//     try {
//       if (req.body.products) {
//         category = "products";
//       } else if (req.body.category) {
//         category = "categories";
//       } else if (req.body.clientDiaries) {
//         category = "clientDiaries";
//       } else if (req.body.celebrityStyles) {
//         category = "celebrityStyles";
//       } else if (req.body.testimonials) {
//         category = "testimonials";
//       } else {
//         return cb(
//           new Error(
//             "Either products, categories, or testimonial data is required"
//           )
//         );
//       }

//       if (!category) {
//         return cb(new Error("Category is required"));
//       }

//       // For products, create separate directories for photos and videos
//       if (category === "products") {
//         const dir = path.join(parentDir, "uploads", category);
//         if (!fs.existsSync(dir)) {
//           fs.mkdirSync(dir, { recursive: true });
//         }
//         cb(null, dir);
//       } else {
//         const dir = path.join(parentDir, "uploads", category);
//         console.log(dir);
//         if (!fs.existsSync(dir)) {
//           fs.mkdirSync(dir, { recursive: true });
//         }
//         cb(null, dir);
//       }
//     } catch (error) {
//       console.error("Error parsing data:", error);
//       return cb(new Error("Invalid data format in request body"));
//     }
//   },
//   filename: (_req, file, cb) => {
//     try {
//       if (!file || !file.originalname) {
//         throw new Error("File or original name is missing.");
//       }
//       cb(null, file.originalname); // Use the original name as the filename
//     } catch (error) {
//       console.error("Error in filename function:", error);
//       cb(new Error("Failed to process file name."));
//     }
//   },
// });

// const fileFilter = (_req, file, cb) => {
//   // Accept image and video files
//   if (
//     file.mimetype.startsWith("image/") ||
//     file.mimetype.startsWith("video/")
//   ) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Unsupported file type. Only images and videos are allowed."),
//       false
//     );
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 100 * 1024 * 1024, // Limit file size to 100MB
//   },
// });

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
    res.send({
      user: userDetails,
      message: "User created successfully",
      severity: "success",
    });
    res.end();
  } catch (error) {
    console.log(error);
    // dont break frontend show error messahe
    if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
      res.status(200).send({
        message: "Phone number already exists",
        severity: "error",
      });
    } else {
      // Handle other types of errors
      res.status(500).send({
        message: "An error occurred while creating the user",
        severity: "error",
      });
    }
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
    const { country, isActive, page, limit, filter = {} } = req.body;
    const skip = (page - 1) * limit;

    if (!country) {
      return res.status(400).json({ message: "Country code is required" });
    }

    let query = {};

    if (isActive) {
      query.isActive = true;
    }

    // Category Filter
    if (filter.category) {
      if (filter.category === "shirtsAndDresses") {
        query.category = { $in: ["shirt", "dress"] };
      } else if (filter.category !== "all") {
        query.category = filter.category.toLowerCase();
      } else {
        query = {};
      }
    }

    // Price Filter
    if (filter.price) {
      const { min, max } = filter.price;
      query.price = { $gte: min, $lte: max };
    }

    // Search Filter
    if (filter.search) {
      const searchRegex = new RegExp(filter.search, "i");
      query.$or = [{ name: searchRegex }, { description: searchRegex }];
    }

    // Color Filter
    if (filter.color) {
      query.color = { $regex: new RegExp(filter.color, "i") };
    }

    // Featured Filter
    if (filter.featured) {
      switch (filter.featured) {
        case "bestSellers":
          query.bestseller = true;
          break;
        case "readyToShip":
          query.readyToShip = true;
          break;
        case "asSeenOn":
          query.asSeenOn = { $exists: true, $ne: null, $ne: "" };
          break;
        default:
          break;
      }
    }

    // Fetch paginated products with filtering
    const products = await Product.find(query)
      .select("-_id")
      .sort({ priority: 1 })
      .skip(skip)
      .limit(limit);

    const allProducts = await Product.find(query)
      .select("name productId priority images")
      .sort({ priority: 1 });

    // Get total count of filtered products
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const productsWithAllColors = await Promise.all(
      products.map(async (product) => {
        const productData = product.toObject();
        let allColorsInRelatedProducts = [];
        let relatedProductsData = [];
        let relatedProductsImages = [];
        let relatedProducts = [];

        if (product.relatedProducts.length > 0) {
          relatedProductsData = await Promise.all(
            product.relatedProducts.map(async (relatedProductData) => {
              relatedProducts.push(relatedProductData);
              return Product.findOne({
                productId: relatedProductData.productId,
              }).select("-_id");
            })
          );

          allColorsInRelatedProducts = relatedProductsData
            .filter(Boolean)
            .map((relatedProduct) => relatedProduct.color);
          relatedProductsImages = relatedProductsData
            .filter(Boolean)
            .map((relatedProduct) => relatedProduct.images[0]);
        }
        return {
          ...productData,
          allColors: [
            ...new Set([product.color, ...allColorsInRelatedProducts]),
          ],
          relatedProductImages: [
            ...new Set([product.images[0], ...relatedProductsImages]),
          ],
          relatedProductsData: relatedProductsData,
          relatedProducts,
        };
      })
    );

    if (country === "INR") {
      return res.status(200).json({
        products: productsWithAllColors,
        totalProducts,
        totalPages,
        currentPage: page,
        allProducts,
      });
    }

    // Fetch exchange rates
    const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest/INR";
    const exchangeResponse = await axios.get(EXCHANGE_API_URL);
    const rates = exchangeResponse.data.rates;

    if (!rates[country]) {
      return res
        .status(404)
        .json({ message: "Exchange rate not found for this country" });
    }

    const exchangeRate = rates[country];

    // Convert product prices
    const updatedProducts = productsWithAllColors.map((product) => ({
      ...product,
      price: Number((product.price * exchangeRate).toFixed(2)),
      currency: country,
      sale: product.sale
        ? {
            ...product.sale,
            discountValue:
              product.sale.discountType === "Amount"
                ? Number((product.sale.discountValue * exchangeRate).toFixed(2))
                : product.sale.discountValue,
          }
        : null,
    }));

    Product.updateMany({ sale: { $exists: true } }, { $unset: { sale: "" } });

    res.status(200).json({
      products: updatedProducts,
      totalProducts,
      totalPages,
      currentPage: page,
      allProducts,
    });
  } catch (error) {
    // console.error("Error fetching products or exchange rates:", error);
    res
      .status(500)
      .json({ message: "Error fetching products or exchange rates", error });
  }
};

const create_product = async (req, res) => {
  try {
    const productsData = JSON.parse(req.body.products); // This will now be an array
    const limit = Number(req.body.limit);
    const page = Number(req.body.page);
    const skip = (page - 1) * limit;

    const images = req.files.map((file) => file.originalname);
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
      relatedProducts: productsData.relatedProducts || [],
      priority: productsData.priority,
      color: productsData.color,
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

    if (productsData.relatedProducts.length > 0) {
      // Use Promise.all to wait for all updates to complete
      await Promise.all(
        productsData.relatedProducts.map(async (relatedProductId) => {
          await Product.findOneAndUpdate(
            { productId: relatedProductId },
            { $push: { relatedProducts: newProduct.productId } }
          );
        })
      );
    }
    const newCreatedProduct = new Product(newProductData);
    await newCreatedProduct.save();

    const allProduct = await Product.find({})
      .select("-_id")
      .sort({ priority: 1 })
      .skip(skip)
      .limit(limit);

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

    console.log("order", order);

    res.status(200).json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const sendWhatsAppMessage = async (recipientNumber, orderDetails) => {
  try {
    const {
      customerName,
      purchaseType,
      orderNumber,
      productName,
      estimatedDelivery,
    } = orderDetails;

    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: "918652241163",
        type: "template",
        template: {
          name: "order_confirmation", // Replace with your actual template name
          language: { code: "en_US" }, // Change if your template uses a different language
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: "customerName" }, // {{1}} - Customer Name
                { type: "text", text: "purchaseType" }, // {{2}} - Purchase Type (e.g., Order, Subscription)
                { type: "text", text: "orderNumber" }, // {{3}} - Order Number
                { type: "text", text: "productName" }, // {{4}} - Product Name
                { type: "text", text: "estimatedDelivery" }, // {{5}} - Estimated Delivery Date
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Message sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending WhatsApp message:",
      error.response ? error.response.data : error.message
    );
    return { error: error.response ? error.response.data : error.message };
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
      giftCardData,
      type,
      userId,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is successful, store data in the database
      if (type === "order") {
        const order = new orders({
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          checkoutData: checkoutData,
          paymentInfo: {
            status: "success",
            method: "razorpay",
          },
          cartItems,
          userId,
        });
        await order.save();
        const toEmail = checkoutData.shippingAddress.email;
        const subject = "THE LABEL 39 - Order Confirmed";
        const htmlFilePath = "./html/order_confirm_email.html";

        await sendEmail({
          to: toEmail,
          subject,
          emailBody: htmlFilePath,
          isHtml: true,
          type: "order_confirm",
          data: order,
        });

        // remove order from cart from user schema
        const user = await User.findOne({ userId: order.userId });
        // clear cart
        user.cart = [];
        await user.save();

        return res.status(200).json({
          order: order,
          message: "Payment verified successfully",
          success: true,
        });
      } else if (type === "giftcard") {
        const giftCart = new Giftcard({
          balance: giftCardData.balance,
          email: giftCardData.email,
          phone: giftCardData.phone,
          name: giftCardData.name,
          code: crypto.randomBytes(16).toString("hex"),
          expiryDate: new Date(
            Date.now() + 183 * 24 * 60 * 60 * 1000
          ).toISOString(),
          status: "active",
          transactions: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        await giftCart.save();
        const toEmail = giftCardData.email;
        const subject = "THE LABEL 39 - Gift Card";
        const htmlFilePath = "./html/gift_card.html";

        await sendEmail({
          to: toEmail,
          subject,
          emailBody: htmlFilePath,
          isHtml: true,
          type: "giftcard",
          data: giftCart,
        });

        return res.status(200).json({
          order: giftCart,
          message: "Gift card verified successfully",
          success: true,
        });
      } else {
        return res.status(400).json({
          message: "Invalid signature sent!",
          success: false,
        });
      }
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

const get_all_categories = async (req, res) => {
  const { display } = req.body;
  try {
    if (display) {
      const category = await Category.find({ isActive: true })
        .select("-_id -__v")
        .sort({ priority: 1 }); // Exclude _id and __v fields
      res.status(200).json(category); // Send the result as JSON
    } else {
      const category = await Category.find({})
        .select("-_id -__v")
        .sort({ priority: 1 }); // Exclude _id and __v fields
      res.status(200).json(category); // Send the result as JSON
    }
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
    const { page = 1, limit = 10 } = req.query;

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

    const totalProducts = await Product.countDocuments({});

    const allProducts = await Product.find({})
      .select("-_id")
      .sort({ priority: 1 })
      .skip((page - 1) * limit) // Skip previous pages
      .limit(Number(limit));

    res.status(200).json({
      allProducts,
      totalProducts,
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
    const editData = JSON.parse(req.body.products);
    const limit = Number(req.body.limit);
    const page = Number(req.body.page);
    const skip = (page - 1) * limit;

    const { productId, ...editedProduct } = editData;
    const images = req.files.map((file) => file.originalname);

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
    const totalProducts = await Product.countDocuments({});

    const allProducts = await Product.find({})
      .select("-_id")
      .sort({ priority: 1 })
      .skip(skip)
      .limit(limit);
    res.send({ allProducts, totalProducts }); // Send the updated product list
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
        ? images[0].originalname
        : images.originalname;

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
      return res
        .status(200)
        .json({ message: "User not found, Cart won't be saved" });
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
  const { userId, country } = req.body;

  try {
    const user = await User.findOne({ userId })
      .select("cart")
      .populate("cart")
      .lean();

    const cartItems = user?.cart || [];

    if (country === "INR") {
      return res.status(200).json(cartItems);
    }

    // Fetch exchange rates
    const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest/INR";
    const exchangeResponse = await axios.get(EXCHANGE_API_URL);
    const rates = exchangeResponse.data.rates;

    if (!rates || !rates[country]) {
      return res
        .status(400)
        .json({ message: "Exchange rate not found for this country" });
    }

    const exchangeRate = rates[country];

    // Convert prices based on exchange rate
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      price: Math.round(item.price * exchangeRate), // Convert price to requested currency
    }));

    res.status(200).json(updatedCartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

module.exports = { getCartItems };

const updateCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const cartItems = req.body.cartItems;
    const updatedCart = await User.findOneAndUpdate(
      { userId: userId },
      { $set: { cart: cartItems } },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Failed to update cart" });
  }
};

const get_all_orders = async (req, res) => {
  try {
    const userId = req.body.userId;
    const role = req.body.role;
    if (role === "admin") {
      const ordersData = await orders.find({}).select("-_id -__v"); // Exclude _id and __v fields
      res.status(200).json(ordersData); // Send the result as JSON
    } else {
      const ordersData = await orders.find({ userId }).select("-_id -__v"); // Exclude _id and __v fields
      res.status(200).json(ordersData); // Send the result as JSON
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const updateProductPriorities = async (req, res) => {
  try {
    // Get the list of products with their updated priorities from the request body
    const { products, page, limit, filter, isActive } = req.body; // Assuming priorities is an array of objects like [{ productId: 1, priority: 2 }, ...]
    const skip = (page - 1) * limit;
    console.log(filter);

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

    let query = {};

    if (isActive) {
      query.isActive = true;
    }

    // Category Filter
    if (filter.category) {
      if (filter.category === "shirtsAndDresses") {
        query.category = { $in: ["shirt", "dress"] };
      } else if (filter.category !== "all") {
        query.category = filter.category.toLowerCase();
      } else {
        query = {};
      }
    }

    const allProducts = await Product.find(query)
      .select("-_id")
      .sort({ priority: 1 })
      .skip(skip)
      .limit(limit);

    // Get total count of filtered products
    const totalProducts = await Product.countDocuments(query);

    res.send({ allProducts, totalProducts }); // Return the list of all products
  } catch (error) {
    console.error("Error in update_product_priorities:", error);
    res.status(400).send({ error: error.message });
  }
};

const create_client_diaries = async (req, res) => {
  try {
    // Parse the products data from the request body
    const clientDiariesData = JSON.parse(req.body.clientDiaries); // Assuming it's a JSON string
    // Validate the productsData structure
    if (typeof clientDiariesData !== "object" || clientDiariesData === null) {
      return res.status(400).send({
        error: "Invalid data format. Expecting a client diaries object.",
      });
    }

    const images = req.files.map((file) => file.originalname);
    const newclientDiariesData = new clientDiaries({
      clientDiariesId: Math.floor(Math.random() * 9000000000) + 1,
      name: clientDiariesData.name,
      image: images,
      productId: clientDiariesData.productId,
    });
    await newclientDiariesData.save();

    const allClientDiaries = await clientDiaries.find({});
    res.send(allClientDiaries);
  } catch (error) {
    console.log("Error while creating client diaries:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating client diaries." });
  }
};

const get_all_client_diaries = async (_req, res) => {
  try {
    // const allClientDiaries = await clientDiaries.find({}).select("-_id -__v"); // Exclude _id and __v fields
    const allClientDiaries = await clientDiaries.aggregate([
      {
        $lookup: {
          from: "products", // Replace with your products collection name
          localField: "productId.value", // Field in clientDiaries containing the product ID
          foreignField: "productId", // Field in products matching the product ID
          as: "productDetails", // Name of the array where matched documents will be stored
        },
      },
      {
        $match: {
          "productId.value": { $exists: true }, // Ensures productId.value exists
        },
      },
      {
        $sort: {
          priority: 1,
        },
      },
    ]);

    // i want to get product detials from product collection in same query as client diaries

    res.status(200).json(allClientDiaries); // Send the result as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const create_giftcard = async (req, res) => {
  try {
    const giftcardDetails = req.body;
    const newGiftcard = new Giftcard(giftcardDetails);
    await newGiftcard.save();
    res.status(201).json(giftcardDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating giftcard", error });
  }
};

const get_all_giftcard = async (_req, res) => {
  try {
    const allGiftcard = await Giftcard.find({}).select("-_id -__v"); // Exclude _id and __v fields
    res.status(200).json(allGiftcard); // Send the result as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const create_celebrity_styles = async (req, res) => {
  try {
    // Parse the products data from the request body
    const celebrityStylesData = JSON.parse(req.body.celebrityStyles); // Assuming it's a JSON string
    const images = req.files || []; // Safely get images
    // Validate the productsData structure
    if (
      typeof celebrityStylesData !== "object" ||
      celebrityStylesData === null
    ) {
      return res.status(400).send({
        error: "Invalid data format. Expecting a celebrity style object.",
      });
    }
    const image =
      Array.isArray(images) && images.length > 0
        ? images[0].originalname
        : images.originalname; // Generate a unique product ID for each product
    const newcelebrityStylesData = new CelebrityStyle({
      celebrityStyleId: Math.floor(Math.random() * 9000000000) + 1,
      name: celebrityStylesData.name,
      image: image,
      productId: celebrityStylesData.productId,
    });
    await newcelebrityStylesData.save();

    const allCelebrityStyles = await CelebrityStyle.find({});
    res.send(allCelebrityStyles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating celebrity styles", error });
  }
};

const get_all_celebrity_styles = async (_req, res) => {
  try {
    const allCelebrityStyles = await CelebrityStyle.aggregate([
      {
        $lookup: {
          from: "products", // Replace with your products collection name
          localField: "productId.value", // Field in celebrityStyles containing the product ID
          foreignField: "productId", // Field in products matching the product ID
          as: "productDetails", // Name of the array where matched documents will be stored
        },
      },
      {
        $match: {
          "productId.value": { $exists: true }, // Ensures productId.value exists
        },
      },
    ]);

    // i want to get product detials from product collection in same query as celebrityStyles

    res.status(200).json(allCelebrityStyles); // Send the result as JSON
  } catch (error) {
    console.error("Error fetching products or exchange rates:", error);
    res
      .status(500)
      .json({ message: "Error fetching products or exchange rates", error });
  }
};

const createSale = async (req, res) => {
  try {
    // Assuming the incoming data is already parsed (using express.json middleware)
    const saleData = req.body;

    // Create and save the new sale
    const newSale = new Sale({
      name: saleData.name,
      discountType: saleData.discountType,
      discountValue: saleData.discountValue,
      products: saleData.products,
      isActive: saleData.isActive,
    });
    await newSale.save();

    // Update each product to include sale details
    for (const product of saleData.products) {
      const productToUpdate = await Product.findOne({
        productId: product.value,
      });
      if (productToUpdate) {
        productToUpdate.sale = {
          discountType: saleData.discountType,
          discountValue: saleData.discountValue,
          isActive: saleData.isActive,
        };
        await productToUpdate.save();
      } else {
        console.warn(`Product with ID ${product.value} not found.`);
      }
    }

    const subscribers = await Subscriber.find({});
    const emailList = subscribers.map((subscriber) => subscriber.email);
    const subject = "THE LABEL 39 - Sale alert!";
    const htmlFilePath = "./html/sale.html";

    for (const email of emailList) {
      await sendEmail({
        to: email,
        subject,
        emailBody: htmlFilePath,
        isHtml: true,
        type: "sale",
        data: newSale,
      });
    }

    // Retrieve and send all sales
    const allSales = await Sale.find({});
    res.send(allSales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating sale", error });
  }
};

const getAllSales = async (_req, res) => {
  try {
    const allSale = await Sale.find({}).select("-_id -__v"); // Exclude _id and __v fields
    res.status(200).json(allSale); // Send the result as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const sendQueryEmail = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const subject = "Message";

    const body = `${message}\n\nYou can contact me on: ${phone}\n\n${name}`;

    await sendEmail({
      to: email,
      subject,
      emailBody: body,
      isHtml: false,
      type: "contact",
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending query email", error });
  }
};

const checkDiscountCode = async (req, res) => {
  try {
    const { userId, code } = req.body;

    // Check if the code is a valid discount code
    let discountData = await discount.findOne({ code });
    let giftCardData = await Giftcard.findOne({ code });

    let activeCode = discountData || giftCardData;

    // If no valid discount or gift card is found
    if (!activeCode) {
      return res.status(200).json({ message: "Invalid code", isValid: false });
    }

    // Handle discount code specific validations
    if (discountData) {
      // Check expiration date
      if (discountData.expiresAt && new Date() > discountData.expiresAt) {
        return res
          .status(200)
          .json({ message: "Discount code has expired", isValid: false });
      }

      // Check if usage limit is exceeded
      if (
        discountData.usageLimit &&
        discountData.usedCount >= discountData.usageLimit
      ) {
        return res.status(200).json({
          message: "Discount code usage limit reached",
          isValid: false,
        });
      }

      // Special validation for "WELCOME10" (new users only)
      if (userId && discountData.code === "WELCOME10") {
        const previousOrders = await orders.findOne({ userId });
        if (previousOrders) {
          return res.status(200).json({
            message: "WELCOME10 is only valid for new users",
            isValid: false,
          });
        }
      }
    }

    // Handle gift card specific validations
    if (giftCardData) {
      // Check expiration date
      if (new Date(giftCardData.expiryDate) < new Date()) {
        return res
          .status(200)
          .json({ message: "Gift card has expired", isValid: false });
      }

      // Check if the gift card has balance
      if (giftCardData.balance <= 0) {
        return res.status(200).json({
          message: "Gift card has no remaining balance",
          isValid: false,
        });
      }
    }

    // Return valid code info (discount or gift card)
    return res.status(200).json({
      message: "Code is valid",
      isValid: true,
      discountType: activeCode.discountType || null, // In case it's a gift card, there might not be a discountType
      value: activeCode.value || activeCode.balance, // Return the discount value or gift card balance
    });
  } catch (error) {
    console.error("Error validating code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createDiscount = async (req, res) => {
  try {
    const discountData = req.body;
    const newDiscount = new discount({
      code: discountData.code,
      discountType: discountData.discountType,
      value: discountData.value,
      expiresAt: new Date(discountData.expiresAt),
      usageLimit: discountData.usageLimit,
      onlyForNewUsers: discountData.onlyForNewUsers,
      description: discountData.description,
    });
    await newDiscount.save();

    const subscribers = await Subscriber.find({});
    const emailList = subscribers.map((subscriber) => subscriber.email);
    const subject = "THE LABEL 39 - Discount alert!";
    const htmlFilePath = "./html/discount.html";

    for (const email of emailList) {
      await sendEmail({
        to: email,
        subject,
        emailBody: htmlFilePath,
        isHtml: true,
        type: "discount",
        data: newDiscount,
      });
    }
    const allDiscount = await discount.find({});
    res.send(allDiscount);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating discount", error });
  }
};

const getAllDiscounts = async (_req, res) => {
  try {
    const allDiscount = await discount.find({}).select("-_id -__v"); // Exclude _id and __v fields
    res.status(200).json(allDiscount); // Send the result as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    user.password = md5(newPassword);
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password", error });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // Send email with reset link

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ isValid: false, message: "User not found" });

    // Generate a reset password token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Create reset password link
    const resetPasswordLink = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;
    const toEmail = email;
    const subject = "THE LABEL 39 - Reset Password";
    const htmlFilePath = "./html/reset_password.html";

    await sendEmail({
      to: toEmail,
      subject,
      emailBody: htmlFilePath,
      isHtml: true,
      type: "resetPassword",
      data: resetPasswordLink,
    });
    return res.status(200).json({ isValid: true, message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

const change_order_status = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const orderStatus = req.body.orderStatus;
    const orderDetails = await orders.findOne({ orderId });
    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found" });
    }
    const order = await orders.findOneAndUpdate(
      { orderId },
      { $set: { status: orderStatus } },
      { new: true }
    );
    if (orderStatus === "delivered") {
      const toEmail = orderDetails.checkoutData.shippingAddress.email;
      const subject = "THE LABEL 39 - Order Delivered";
      const htmlFilePath = "./html/order_delivered_email.html";

      await sendEmail({
        to: toEmail,
        subject,
        emailBody: htmlFilePath,
        isHtml: true,
        type: "order_delivered",
        data: orderDetails,
      });
    } else if (orderStatus === "shipped") {
      const toEmail = order.checkoutData.shippingAddress.email;
      const subject = "THE LABEL 39 - Order Shipped";
      const htmlFilePath = "./html/order_out_for_delivery.html";

      await sendEmail({
        to: toEmail,
        subject,
        emailBody: htmlFilePath,
        isHtml: true,
        type: "order_out_for_delivery",
        data: order,
      });
    }
    const allOrders = await orders.find({}).select("-_id -__v"); // Exclude _id and __v fields
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error changing order status:", error);
    (500).json({ message: "Error changing order status", error });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ productId: productId });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product details:", error);
    (500).json({ message: "Error getting product details", error });
  }
};

const create_subscriber = async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Check if email or phone already exists
    const existingSubscriber = await Subscriber.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingSubscriber) {
      return res.status(200).json({
        message: "Subscriber with this email or phone number already exists",
        severity: "error",
      });
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email, phone });
    await newSubscriber.save();

    res.status(200).json({
      message: "You've successfully subscribed to TheLabel39!",
      severity: "success",
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    res.status(500).json({
      message: "Error creating subscriber",
      severity: "error",
      error,
    });
  }
};

const get_all_subscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({});
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ message: "Error fetching subscribers", error });
  }
};

const get_user_details = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const user = await User.findOne({ userId });
    const pastOrders = await orders.find({ userId });
    const userDetails = { user, pastOrders };
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Error fetching user details", error });
  }
};
const create_testimonial = async (req, res) => {
  try {
    const testimonialsData = JSON.parse(req.body.testimonials); // Assuming it's a JSON string
    const images = req.files || []; // Safely get images
    if (typeof testimonialsData !== "object" || testimonialsData === null) {
      return res.status(400).send({
        error: "Invalid data format. Expecting a testimonial object.",
      });
    }
    const image =
      Array.isArray(images) && images.length > 0
        ? images[0].originalname
        : images.originalname;

    const newCreatedTestimonial = new Testimonial({
      testimonialId: Math.floor(Math.random() * 9000000000) + 1,
      name: testimonialsData.name,
      comments: testimonialsData.comments,
      rating: testimonialsData.rating,
      image: image,
    });
    await newCreatedTestimonial.save();

    const allTestimonials = await Testimonial.find({});
    res.send(allTestimonials);
  } catch (error) {
    console.log("Error while creating testimonials:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating testimonials." });
  }
};

const edit_testimonial = async (req, res) => {
  try {
    const editData = JSON.parse(req.body.testimonials); // Parse incoming category data
    const { testimonialId, ...editedTestimonial } = editData;
    const images = Array.isArray(req.files)
      ? req.files // If `req.files` is directly an array
      : req.files.image || []; // Access specific field name if `req.files` is an object

    // Prepare updatedCategory with name, images, and testimonialId

    const updatedTestimonials = {
      testimonialId, // Add testimonialId to retain it in the document
      ...editedTestimonial,
      image: images.map((image) => image.originalname)[0], // Array of filenames
    };

    // Replace or insert the category with upsert
    await Testimonial.replaceOne(
      { testimonialId: testimonialId },
      updatedTestimonials,
      {
        upsert: true,
      }
    );

    // Retrieve all categories excluding _id
    const allTestimonials = await Testimonial.find({}, { _id: 0 });
    res.send(allTestimonials); // Send the updated category list
  } catch (error) {
    console.error("Error in edit testimonial:", error);
    res.status(400).send({ error: error.message });
  }
};

const updateCelebrityStylePriority = async (req, res) => {
  try {
    // Get the list of products with their updated priorities from the request body
    const { celebrityStyles } = req.body; // Assuming priorities is an array of objects like [{ productId: 1, priority: 2 }, ...]
    if (
      !celebrityStyles ||
      !Array.isArray(celebrityStyles) ||
      celebrityStyles.length === 0
    ) {
      return res
        .status(400)
        .send({ error: "Priorities array is required and cannot be empty" });
    }

    // Iterate through the priorities and update each product
    const updatePromises = celebrityStyles.map(async (item) => {
      const { celebrityStyleId, priority } = item;

      if (!celebrityStyleId || typeof priority !== "number") {
        throw new Error("Invalid productId or priority in the request");
      }

      // Update the product with the new priority
      await CelebrityStyle.updateOne(
        { celebrityStyleId: celebrityStyleId },
        { $set: { priority } }
      );
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    // Send updated product list
    const allCelebrityStyle = await CelebrityStyle.find({}, { _id: 0 }).sort({
      priority: 1,
    });
    res.send(allCelebrityStyle); // Return the list of all products
  } catch (error) {
    console.error("Error in update_allCelebrityStyle_priorities:", error);
    res.status(400).send({ error: error.message });
  }
};

const updateClientDiariesPriority = async (req, res) => {
  try {
    // Get the list of products with their updated priorities from the request body
    const { clientDiariesData } = req.body; // Assuming priorities is an array of objects like [{ productId: 1, priority: 2 }, ...]
    if (
      !clientDiariesData ||
      !Array.isArray(clientDiariesData) ||
      clientDiariesData.length === 0
    ) {
      return res
        .status(400)
        .send({ error: "Priorities array is required and cannot be empty" });
    }

    // Iterate through the priorities and update each product
    const updatePromises = clientDiariesData.map(async (item) => {
      const { clientDiariesId, priority } = item;

      if (!clientDiariesId || typeof priority !== "number") {
        throw new Error("Invalid productId or priority in the request");
      }

      // Update the product with the new priority
      await clientDiaries.updateOne(
        { clientDiariesId: clientDiariesId },
        { $set: { priority } }
      );
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    // Send updated product list
    const allCelebrityStyle = await clientDiaries.find({}, { _id: 0 }).sort({
      priority: 1,
    });
    res.send(allCelebrityStyle); // Return the list of all products
  } catch (error) {
    console.error("Error in update_allCelebrityStyle_priorities:", error);
    res.status(400).send({ error: error.message });
  }
};

const getProductsForHomepage = async (req, res) => {
  try {
    const { country } = req.body;
    if (!country) {
      return res.status(400).json({ message: "Country code is required" });
    }

    const [bestsellers, shopByVideos] = await Promise.all([
      Product.find({ bestseller: true }).select("-_id"),
      Product.find({ videoSrc: { $exists: true, $ne: "" } }).select("-_id"),
    ]);

    const processProducts = async (products) => {
      return Promise.all(
        products.map(async (product) => {
          const productData = product.toObject();
          let allColorsInRelatedProducts = [];
          let relatedProductsData = [];
          let relatedProductsImages = [];

          if (product.relatedProducts.length > 0) {
            relatedProductsData = await Promise.all(
              product.relatedProducts.map(async (relatedProduct) => {
                return Product.findOne({ productId: relatedProduct.productId });
              })
            );

            allColorsInRelatedProducts = relatedProductsData
              .filter(Boolean)
              .map((relatedProduct) => relatedProduct.color);
            relatedProductsImages = relatedProductsData
              .filter(Boolean)
              .map((relatedProduct) => relatedProduct.images[0]);
          }

          return {
            ...productData,
            allColors: [
              ...new Set([product.color, ...allColorsInRelatedProducts]),
            ],
            relatedProductImages: [
              ...new Set([product.images[0], ...relatedProductsImages]),
            ],
            relatedProducts: relatedProductsData,
          };
        })
      );
    };

    const bestsellersProcessed = await processProducts(bestsellers);
    const shopByVideosProcessed = await processProducts(shopByVideos);

    if (country === "INR") {
      return res.status(200).json({
        bestsellers: bestsellersProcessed,
        shopByVideos: shopByVideosProcessed,
      });
    }

    // Fetch exchange rates
    const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest/INR";
    const exchangeResponse = await axios.get(EXCHANGE_API_URL);
    const rates = exchangeResponse.data.rates;

    if (!rates[country]) {
      return res
        .status(404)
        .json({ message: "Exchange rate not found for this country" });
    }

    const exchangeRate = rates[country];

    // Convert product prices
    const convertPrices = (products) =>
      products.map((product) => ({
        ...product,
        price: Number((product.price * exchangeRate).toFixed(2)),
        currency: country,
        sale: product.sale
          ? {
              ...product.sale,
              discountValue:
                product.sale.discountType === "Amount"
                  ? Number(
                      (product.sale.discountValue * exchangeRate).toFixed(2)
                    )
                  : product.sale.discountValue,
            }
          : null,
      }));

    res.status(200).json({
      bestsellers: convertPrices(bestsellersProcessed),
      shopByVideos: convertPrices(shopByVideosProcessed),
    });
  } catch (error) {
    console.error("Error fetching homepage products or exchange rates:", error);
    res
      .status(500)
      .json({ message: "Error fetching products or exchange rates", error });
  }
};

const edit_client_diaries = async (req, res) => {
  try {
    const editData = JSON.parse(req.body.clientDiaries); // Parse incoming category data
    const { clientDiariesId, ...editedClientDiaries } = editData;

    const images = Array.isArray(req.files) ? req.files : req.files.image || [];

    const updatedClientDiaries = {
      clientDiariesId,
      ...editedClientDiaries,
      image: images.map((image) => image.originalname)[0],
    };

    await clientDiaries.replaceOne(
      { clientDiariesId: clientDiariesId },
      updatedClientDiaries,
      {
        upsert: true,
      }
    );

    const allClientDiaries = await clientDiaries.find({}, { _id: 0 });
    res.send(allClientDiaries); // Send the updated category list
  } catch (error) {
    console.error("Error in edit_client_diaries:", error);
    res.status(400).send({ error: error.message });
  }
};

const edit_celebrity_Styles = async (req, res) => {
  try {
    const editData = JSON.parse(req.body.celebrityStyles); // Parse incoming category data
    const { celebrityStyleId, ...editedCelebrityStyles } = editData;

    const images = Array.isArray(req.files) ? req.files : req.files.image || [];

    const updatedcelebrityStyles = {
      celebrityStyleId,
      ...editedCelebrityStyles,
      image: images.map((image) => image.originalname)[0],
    };

    await CelebrityStyle.replaceOne(
      { celebrityStyleId: celebrityStyleId },
      updatedcelebrityStyles,
      {
        upsert: true,
      }
    );

    const allcelebrityStyles = await CelebrityStyle.find({}, { _id: 0 });
    res.send(allcelebrityStyles); // Send the updated category list
  } catch (error) {
    console.error("Error in edit_celebrity_styles:", error);
    res.status(400).send({ error: error.message });
  }
};

const send_test_email = async (req, res) => {
  try {
    const toEmail = "sangeetamane239@gmail.com";
    const subject = "THE LABEL 39 - Order Confirmed";
    const htmlFilePath = "./html/order_confirm_email.html";

    const order = {
      orderId: "order_PqrPNkZigUVijW",
      userId: "5600728180",
      paymentId: "pay_PqrPVgJZ8suI9w",
      checkoutData: {
        country: "INR",
        shippingAddress: {
          firstName: "Ishan",
          lastName: "Kadam",
          address: "qeuih",
          apartment: "heoihqoih",
          email: "ishan.kadam_19@sakec.ac.in",
          state: "Maharastra",
          city: "Mumbai",
          pincode: "983284",
        },
        phone: "9837248724",
        billingAddress: {
          firstName: "Tanvi",
          lastName: "ganaga",
          address: "khwoi",
          apartment: "qwejoiqj",
          email: "tanvi@gmail.com",
          state: "Maharastra",
          city: "Mumbai",
          pincode: "827342",
        },
      },
      paymentInfo: {
        status: "success",
        method: "razorpay",
      },
      cartItems: [
        {
          productId: 7458689532,
          name: "IVORY FLEUR CO-ORD SET",
          price: 13300,
          quantity: 1,
          deliveryIn: ["Shipped in 2-3 weeks"],
          images: ["Cord30.jpg"],
          sizes: {
            Upper: "XS",
            Bottom: "XS",
          },
          sale: {
            discountType: "Percentage",
            discountValue: 10,
            isActive: true,
          },
        },
      ],
      status: "delivered",
      createdAt: new Date("2025-02-02T13:35:56.339Z"),
    };

    await sendEmail({
      to: toEmail,
      subject,
      emailBody: htmlFilePath,
      isHtml: true,
      type: "order_confirm",
      data: order,
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error in send_test_email:", error);
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
  create_client_diaries,
  get_all_client_diaries,
  create_giftcard,
  create_celebrity_styles,
  get_all_celebrity_styles,
  createSale,
  getAllSales,
  get_all_giftcard,
  sendQueryEmail,
  change_order_status,
  updateCart,
  checkDiscountCode,
  createDiscount,
  getAllDiscounts,
  resetPassword,
  forgotPassword,
  getProductDetails,
  create_subscriber,
  get_all_subscribers,
  get_user_details,
  create_testimonial,
  edit_testimonial,
  updateCelebrityStylePriority,
  updateClientDiariesPriority,
  getProductsForHomepage,
  sendWhatsAppMessage,
  edit_client_diaries,
  edit_celebrity_Styles,
  send_test_email,
};

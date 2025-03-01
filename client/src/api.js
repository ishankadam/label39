import { urlToFile } from "./common";

const {
  REACT_APP_API_URL,
  REACT_APP_IMAGE_URL,
  REACT_APP_PHONE,
  REACT_APP_WHATSAPP_API_URL,
  REACT_APP_INSTAGRAM_ACCESS_TOKEN,
  REACT_APP_URL,
  REACT_APP_MESSAGE_URL,
} = process.env;
export const apiUrl = REACT_APP_API_URL;
export const imageUrl = REACT_APP_IMAGE_URL;
export const phoneNumber = REACT_APP_PHONE;
export const whatsAppUrl = REACT_APP_WHATSAPP_API_URL;
export const instagramToken = REACT_APP_INSTAGRAM_ACCESS_TOKEN;
export const appUrl = REACT_APP_URL;
export const messageUrl = REACT_APP_MESSAGE_URL;
// create User

export const createUser = async ({ userDetails }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  };

  try {
    const response = await fetch(`${apiUrl}/createUser`, requestOptions);

    // Check if the response is OK (status code 2xx)
    if (!response.ok) {
      // Parse the error message from the response
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    // Parse the success data from the response
    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error and rethrow it so the caller can handle it
    console.error("Error in createUser:", error.message);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const login = async (user, error, setError) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (user.email !== "" && user.password !== "") {
      const response = await fetch(`${apiUrl}/login`, requestOptions);
      const result = await response.json();
      if (result.isValid) {
        localStorage.setItem("role", result.employeeDetails.role);
        localStorage.setItem("userId", result.employeeDetails.userId);
        localStorage.setItem("token", result.token);

        return result.employeeDetails;
      } else if (result.isPasswordInvalid) {
        setError({
          ...error,
          password: true,
        });
      } else if (result.isEmailInvalid) {
        setError({
          ...error,
          email: true,
        });
      } else {
        console.log("Something went Wrong");
      }
    } else {
      setError({
        ...error,
        email: true,
        password: true,
        errorMsg: { password: "Please enter correct password" },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = async ({ setUsers, setLoading }) => {
  try {
    const response = await fetch(`${apiUrl}/getUsers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    setUsers(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

// Fetch all products
export const getAllProducts = async ({
  setProductsData,
  setLoading,
  country,
  isActive,
}) => {
  try {
    const response = await fetch(`${apiUrl}/getProducts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: country, isActive: isActive }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    setProductsData(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

// Create a new product
export const createProduct = async ({
  products,
  setLoading,
  setAllProduct,
}) => {
  setLoading(true);

  try {
    // Create FormData
    const formData = new FormData();

    // Append product details as JSON
    formData.append(
      "products",
      JSON.stringify(products) // Wrap the product in an array
    );

    if (products.images && Array.isArray(products.images)) {
      products.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image); // Add images
        }
      });
    }

    // Prepare request options
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    // Make API call
    const response = await fetch(`${apiUrl}/createProduct`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      setAllProduct(data); // Update state with new product list
    } else {
      const errorData = await response.json();
      console.error("Error creating products:", errorData);
    }
  } catch (e) {
    console.error("Fetch error:", e);
  } finally {
    setLoading(false);
  }
};

export const editProduct = async ({ products, setProducts, setLoading }) => {
  setLoading(true);

  const formData = new FormData();

  // Append the product without images to FormData
  formData.append("products", JSON.stringify(products));

  if (products.images.length > 0) {
    products.images.map(async (image) => {
      if (image instanceof File) {
        formData.append("images", image);
      } else if (typeof image === "string") {
        try {
          const file = await urlToFile(image, image.split("/").pop());
          formData.append("images", file);
        } catch (error) {
          console.error("Error converting URL to File:", error);
        }
      }
    });
  }

  const requestOptions = {
    method: "PUT",
    body: formData,
  };

  try {
    const response = await fetch(`${apiUrl}/editProduct`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    setLoading(false);
  }
};

// Create an order
export const createOrder = async (amount) => {
  try {
    const response = await fetch(`${apiUrl}/createOrder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return await response.json();
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  checkoutData,
  cartItems,
  giftCardData,
  type,
  userId,
}) => {
  try {
    const response = await fetch(`${apiUrl}/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        checkoutData,
        cartItems,
        giftCardData,
        type,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify payment");
    }

    const data = await response.json();
    console.log("Payment verification response:", data);

    if (data.orders) {
      // Prepare the order details message

      // Send WhatsApp message
      // await sendWhatsAppMessage(checkoutData.phoneNumber, orderDetails);

      console.log("WhatsApp message sent successfully");
    }

    return data;
  } catch (err) {
    console.error("Error verifying payment:", err);
    throw err;
  }
};

// export async function sendWhatsAppMessage(to, body) {
//   try {
//     const response = await fetch(whatsAppUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${ACCESS_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         messaging_product: "whatsapp",
//         to: to,
//         type: "text",
//         text: { body: body },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to send WhatsApp message");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error sending WhatsApp message:", error);
//     throw error;
//   }
// }

export const createDeliveryOrder = async (deliveryData) => {
  try {
    const response = await fetch(`${apiUrl}/createDelivery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deliveryData),
    });

    if (!response.ok) {
      throw new Error("Failed to create delivery order");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating delivery order:", err);
  }
};

// Track Delivery Order
export const trackDeliveryOrder = async (trackingId) => {
  try {
    const response = await fetch(`${apiUrl}/trackOrder/${trackingId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to track delivery order");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error tracking delivery order:", err);
  }
};

// Fetch all categories
export const getAllCategories = async ({ setCategories, setLoading }) => {
  try {
    const response = await fetch(`${apiUrl}/getCategories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    setCategories(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

// Fetch all categories
export const getAllTestimonials = async ({ setTestimonials, setLoading }) => {
  try {
    const response = await fetch(`${apiUrl}/getTestimonials`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    setTestimonials(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

export const toggleProductStatus = async ({
  product,
  setProductsData,
  setLoading,
}) => {
  try {
    if (setLoading) setLoading(true);

    const response = await fetch(
      `${apiUrl}/product/${product.productId}/disable`,
      {
        method: "PUT", // Change to PUT for updates
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.error("Product not found");
      } else {
        console.error("Failed to disable the product");
      }
      throw new Error("Failed to disable product");
    }

    const data = await response.json();
    setProductsData(data.allProduct); // Update state with the API response
    if (setLoading) setLoading(false);
    return data;
  } catch (err) {
    console.error("Error disabling product:", err);
    if (setLoading) setLoading(false);
  }
};

export const createCategory = async ({
  category,
  setLoading,
  setCategories,
}) => {
  setLoading(true);
  const formData = new FormData();

  formData.append("category", JSON.stringify(category));

  if (category.image && Array.isArray(category.image)) {
    category.image.forEach((img) => {
      if (img instanceof File) {
        formData.append("image", img); // Add images
      }
    });
  }

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(`${apiUrl}/createCategory`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    } else {
      const errorData = await response.json();
      console.error("Error creating Categories:", errorData);
    }
  } catch (e) {
    console.error("Fetch error:", e);
  } finally {
    setLoading(false);
  }
};

export const editCategory = async ({ category, setCategory, setLoading }) => {
  setLoading(true);

  const formData = new FormData();

  formData.append("category", JSON.stringify(category));

  if (category.image) {
    if (category.image && Array.isArray(category.image)) {
      category.image.forEach((img) => {
        if (img instanceof File) {
          formData.append("image", img); // Add images
        }
      });
    } else if (typeof category.image === "string") {
      try {
        const file = await urlToFile(
          category.image,
          category.image.split("/").pop()
        );
        formData.append("image", file);
      } catch (error) {
        console.error("Error converting URL to File:", error);
      }
    }
  }

  const requestOptions = {
    method: "PUT",
    body: formData,
  };

  try {
    const response = await fetch(`${apiUrl}/editCategory`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      setCategory(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const toggleCategoryStatus = async ({
  category,
  setCategories,
  setLoading,
}) => {
  try {
    if (setLoading) setLoading(true);

    const response = await fetch(
      `${apiUrl}/category/${category.categoryId}/disable`,
      {
        method: "PUT", // Change to PUT for updates
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.error("Product not found");
      } else {
        console.error("Failed to disable the product");
      }
      throw new Error("Failed to disable product");
    }

    const data = await response.json();
    setCategories(data.allCategory); // Update state with the API response
    if (setLoading) setLoading(false);
    return data;
  } catch (err) {
    console.error("Error disabling product:", err);
    if (setLoading) setLoading(false);
  }
};

export const addProductToCart = async ({ cartProduct, userId }) => {
  try {
    const response = await fetch(`${apiUrl}/addToCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cartProduct, userId: userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error adding product to cart:", err);
    throw err;
  }
};

export const updateCart = async ({ userId, cartItems }) => {
  try {
    const response = await fetch(`${apiUrl}/updateCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, cartItems: cartItems }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error updating cart:", err);
    throw err;
  }
};

export const getCartItems = async ({ userId, country }) => {
  try {
    const response = await fetch(`${apiUrl}/getCartItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, country: country }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching cart items:", err);
    throw err;
  }
};

export const getAllOrders = async ({
  userId,
  role,
  setAllOrders,
  setLoading,
}) => {
  try {
    const response = await fetch(`${apiUrl}/getOrders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    setAllOrders(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    throw err;
  }
};

export const updateProductPriorities = async ({ products, setProducts }) => {
  try {
    const response = await fetch(`${apiUrl}/update-priorities`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      throw new Error("Failed to update product priorities");
    }

    const data = await response.json();
    setProducts(data);
    return data;
  } catch (err) {
    console.error("Error updating product priorities:", err);
    throw err;
  }
};

export const updateCelebrityStylePriority = async ({
  celebrityStyles,
  setCelebrityStyles,
}) => {
  try {
    const response = await fetch(
      `${apiUrl}/update-celebrityStyles-priorities`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ celebrityStyles }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product priorities");
    }

    const data = await response.json();
    setCelebrityStyles(data);
    return data;
  } catch (err) {
    console.error("Error updating product priorities:", err);
    throw err;
  }
};

export const updateClientDiariesPriority = async ({
  clientDiaries,
  setClientDiaries,
}) => {
  try {
    const response = await fetch(`${apiUrl}/update-clientDiaries-priorities`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientDiariesData: clientDiaries }),
    });

    if (!response.ok) {
      throw new Error("Failed to update product priorities");
    }

    const data = await response.json();
    setClientDiaries(data);
    return data;
  } catch (err) {
    console.error("Error updating product priorities:", err);
    throw err;
  }
};

export const createClientDiaries = async ({
  clientDiaries,
  setLoading,
  setClientDiaries,
}) => {
  setLoading(true);
  const formData = new FormData();

  formData.append("clientDiaries", JSON.stringify(clientDiaries));

  if (clientDiaries.image && Array.isArray(clientDiaries.image)) {
    clientDiaries.image.forEach((img) => {
      if (img instanceof File) {
        formData.append("image", img); // Add images
      }
    });
  }

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(
      `${apiUrl}/createClientDiaries`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setClientDiaries(data);
    } else {
      const errorData = await response.json();
      console.error("Error creating client diaries:", errorData);
    }
  } catch (e) {
    console.error("Fetch error:", e);
  } finally {
    setLoading(false);
  }
};

export const getAllClientDiaries = async ({ setClientDiaries, setLoading }) => {
  try {
    const response = await fetch(`${apiUrl}/getClientDiaries`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    setClientDiaries(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const createCelebrityStyles = async ({
  celebrityStyles,
  setLoading,
  setCelebrityStyles,
}) => {
  setLoading(true);
  const formData = new FormData();

  formData.append("celebrityStyles", JSON.stringify(celebrityStyles));

  if (celebrityStyles.image && Array.isArray(celebrityStyles.image)) {
    celebrityStyles.image.forEach((img) => {
      if (img instanceof File) {
        formData.append("image", img); // Add images
      }
    });
  }

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(
      `${apiUrl}/createCelebrityStyles`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setCelebrityStyles(data);
    } else {
      const errorData = await response.json();
      console.error("Error creating celebrity styles:", errorData);
    }
  } catch (e) {
    console.error("Fetch error:", e);
  } finally {
    setLoading(false);
  }
};

export const getAllCelebrityStyles = async ({
  setCelebrityStyles,
  setLoading,
}) => {
  try {
    const response = await fetch(`${apiUrl}/getCelebrityStyles`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    setCelebrityStyles(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const createSale = async ({ saleData, setLoading, setSaleData }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saleData),
  };
  fetch(`${apiUrl}/createSale`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setSaleData(data);
        setLoading && setLoading(false);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getAllSales = async ({ setSaleData, setLoading }) => {
  try {
    const response = await fetch(`${apiUrl}/getSales`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch sale");
    }

    const data = await response.json();
    setSaleData(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getInstagramPosts = async ({ setInstagramData, setLoading }) => {
  try {
    fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${instagramToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        setInstagramData(data.data);
        setLoading && setLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching Instagram posts:", error)
      );
  } catch (err) {
    console.error("Error fetching instagram data:", err);
    throw err;
  }
};

export const getAllGiftcard = async ({ setGiftCards, setLoading }) => {
  try {
    const response = await fetch(`${apiUrl}/getGiftcard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch giftcard");
    }

    const data = await response.json();
    setGiftCards(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching giftcard:", err);
    throw err;
  }
};

export const sendQueryEmail = async ({ query }) => {
  try {
    const response = await fetch(`${apiUrl}/send-query-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error("Failed to send query email");
    }
    return response;
  } catch (err) {
    console.log(err);
    console.error("Error sending query email:", err);
  }
};

export const changeOrderStatus = async ({
  orderId,
  orderStatus,
  setLoading,
  setOrders,
}) => {
  try {
    const response = await fetch(`${apiUrl}/changeOrderStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, orderStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to change order status");
    }

    const data = await response.json();
    setOrders(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error changing order status:", err);
    throw err;
  }
};

export const checkDiscountCode = async ({
  userId,
  code,
  setLoading,
  setDiscount,
}) => {
  try {
    const response = await fetch(`${apiUrl}/check-discount-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, code }),
    });

    if (!response.ok) {
      throw new Error("Failed to check discount code");
    }

    const data = await response.json();
    setDiscount(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error checking discount code:", err);
    throw err;
  }
};

export const createDiscount = async ({
  discountData,
  setLoading,
  setDiscountData,
}) => {
  try {
    const response = await fetch(`${apiUrl}/createDiscount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discountData),
    });

    if (!response.ok) {
      throw new Error("Failed to create discount");
    }

    const data = await response.json();
    setDiscountData(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error creating discount:", err);
    throw err;
  }
};

export const getAllDiscounts = async ({ setDiscountData, setLoading }) => {
  try {
    const response = await fetch(`${apiUrl}/getDiscounts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access");
      }
      throw new Error("Failed to fetch discounts");
    }

    const data = await response.json();
    setDiscountData(data);
    setLoading && setLoading(false);
    return data;
  } catch (err) {
    console.error("Error fetching discounts:", err);
    throw err;
  }
};

export const resetPassword = async ({ token, newPassword }) => {
  try {
    const response = await fetch(`${apiUrl}/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
      throw new Error("Failed to reset password");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error resetting password:", err);
    throw err;
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const response = await fetch(`${apiUrl}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send reset link");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    console.error("Error sending reset link:", err);
    throw err;
  }
};

export const getProductDetails = async ({ productId, setProduct }) => {
  try {
    const response = await fetch(`${apiUrl}/getProductDetails/${productId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setProduct(data); // Return the product details
    return data; // Return the product details
  } catch (err) {
    console.error("Failed to fetch product details:", err);
    return null; // Handle errors gracefully
  }
};

export const createSubscription = async ({ email, phone }) => {
  try {
    const response = await fetch(`${apiUrl}/createSubscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, phone }),
    });

    if (!response.ok) {
      throw new Error("Failed to create subscription");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    return null;
  }
};

export const getAllSubscribers = async () => {
  try {
    const response = await fetch(`${apiUrl}/subscribers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch subscribers");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return null;
  }
};

export const getUserDetails = async ({ userId, setUserDetails }) => {
  try {
    const response = await fetch(`${apiUrl}/getUserDetails/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setUserDetails(data); // Return the product details
    return data; // Return the product details
  } catch (err) {
    console.error("Failed to fetch product details:", err);
    return null; // Handle errors gracefully
  }
};

export const toggleTestimonialStatus = async ({
  testimonial,
  setTestimonials,
  setLoading,
}) => {
  try {
    if (setLoading) setLoading(true);

    const response = await fetch(
      `${apiUrl}/testimonial/${testimonial.testimonialId}/disable`,
      {
        method: "PUT", // Change to PUT for updates
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.error("Testimonial not found");
      } else {
        console.error("Failed to disable the testimonial");
      }
      throw new Error("Failed to disable testimonial");
    }

    const data = await response.json();
    setTestimonials(data.allTestimonial); // Update state with the API response
    if (setLoading) setLoading(false);
    return data;
  } catch (err) {
    console.error("Error disabling testimonial:", err);
    if (setLoading) setLoading(false);
  }
};

export const createTestimonial = async ({
  testimonials,
  setLoading,
  setTestimonials,
}) => {
  setLoading(true);
  const formData = new FormData();

  formData.append("testimonials", JSON.stringify(testimonials));

  if (testimonials.image && Array.isArray(testimonials.image)) {
    testimonials.image.forEach((img) => {
      if (img instanceof File) {
        formData.append("image", img); // Add images
      }
    });
  }

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(
      `${apiUrl}/createTestimonials`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setTestimonials(data);
    } else {
      const errorData = await response.json();
      console.error("Error creating Categories:", errorData);
    }
  } catch (e) {
    console.error("Fetch error:", e);
  } finally {
    setLoading(false);
  }
};

export const editTestimonials = async ({
  testimonials,
  setTestimonials,
  setLoading,
}) => {
  setLoading(true);

  const formData = new FormData();

  formData.append("testimonials", JSON.stringify(testimonials));
  if (testimonials.image) {
    if (testimonials.image && Array.isArray(testimonials.image)) {
      testimonials.image.forEach((img) => {
        if (img instanceof File) {
          formData.append("image", img); // Add images
        }
      });
    } else if (typeof testimonials.image === "string") {
      try {
        const file = await urlToFile(
          testimonials.image,
          testimonials.image.split("/").pop()
        );
        formData.append("image", file);
      } catch (error) {
        console.error("Error converting URL to File:", error);
      }
    }
  }

  const requestOptions = {
    method: "PUT",
    body: formData,
  };

  try {
    const response = await fetch(`${apiUrl}/editTestimonials`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      setTestimonials(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const deleteTestimonials = async ({
  testimonialId,
  setLoading,
  setTestimonials,
}) => {
  setLoading(true);

  const requestOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(
      `${apiUrl}/deleteTestimonials/${testimonialId}`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok.");
    }
  } catch (error) {
    console.error("Error in deleteTestimonials:", error);
  } finally {
    setLoading(false);
  }
};

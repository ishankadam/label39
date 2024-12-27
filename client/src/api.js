import { urlToFile } from "./common";

const { REACT_APP_API_URL, REACT_APP_IMAGE_URL } = process.env;

export const apiUrl = REACT_APP_API_URL;
export const imageUrl = REACT_APP_IMAGE_URL;

// create User
export const createUser = async ({ userDetails, navigate }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  };
  fetch(`${apiUrl}/createUser`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        navigate("/login");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const login = async (user, error, setError, navigate) => {
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
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify payment");
    }

    return await response.json();
  } catch (err) {
    console.error("Error verifying payment:", err);
    throw err;
  }
};

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
    if (category.image instanceof File) {
      formData.append("image", category.image);
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

export const getCartItems = async ({ userId }) => {
  try {
    const response = await fetch(`${apiUrl}/getCartItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
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

export const getAllOrders = async ({ setAllOrders }) => {
  try {
    const response = await fetch(`${apiUrl}/getOrders`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    setAllOrders(data);
    return data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    throw err;
  }
};

import { urlToFile } from "./common";

const { REACT_APP_API_URL, REACT_APP_IMAGE_URL } = process.env;

export const apiUrl = REACT_APP_API_URL;
export const imageUrl = REACT_APP_IMAGE_URL;

// Fetch all products
export const getAllProducts = async ({
  setProductsData,
  setLoading,
  country,
}) => {
  try {
    const response = await fetch(`${apiUrl}/getProducts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: country }),
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

    // Log FormData for debugging
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

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

  const { images, ...productWithoutImages } = products;

  // Append the product without images to FormData
  formData.append("products", JSON.stringify(productWithoutImages));

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

  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
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
  row,
  setProductsData,
  setLoading,
}) => {
  try {
    if (setLoading) setLoading(true);

    const response = await fetch(`${apiUrl}/product/${row.productId}/disable`, {
      method: "PUT", // Change to PUT for updates
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.error("Product not found");
      } else {
        console.error("Failed to disable the product");
      }
      throw new Error("Failed to disable product");
    }

    const data = await response.json();
    console.log(data);
    setProductsData(data.allProduct); // Update state with the API response
    if (setLoading) setLoading(false);
    return data;
  } catch (err) {
    console.error("Error disabling product:", err);
    if (setLoading) setLoading(false);
  }
};

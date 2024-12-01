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
export const createProduct = async (productDetails) => {
  try {
    const response = await fetch(`${apiUrl}/createProduct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productDetails),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    console.log("Product created:", await response.json());
  } catch (err) {
    console.error("Error creating product:", err);
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

import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Button,
  Pagination,
} from "@mui/material";
import "../../css/shop.css";
import ProductCard from "../../components/card/productCard";
import CircleIcon from "@mui/icons-material/Circle";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getAllProducts } from "../../api";
import ViewProductModal from "../product/viewProduct";

const ProductsPage = (props) => {
  const [allProduct, setAllProduct] = useState(props.allProduct || []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(props.loading || false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });
  const [filter, setFilter] = useState({
    category: "Shirts",
    price: "",
    color: "",
  });

  useEffect(() => {
    setAllProduct(props.allProduct);
  }, [props.allProduct]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  const handleFilterChange = (value, field) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleViewProduct = (product) => {
    setShowModal({
      open: true,
      data: product,
    });
  };

  const categories = ["Shirts", "Co-ords", "Kurtas", "Suits"];
  const priceRanges = ["Under 10000", "10000-15000", "15000-20000"];
  const availableColors = ["Red", "Black", "Blue", "Green", "Yellow"];

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    const data = allProduct.map((item) => {
      // Parse sizes if it's a string; otherwise, use it as is
      if (typeof item.sizes === "string") {
        try {
          item.sizes = item.sizes
            .replace(/([a-zA-Z]+):/g, '"$1":') // Add quotes around keys
            .replace(/'/g, '"') // Replace single quotes with double quotes
            .replace(/\bUpper\b/g, '"Upper"') // Ensure Upper is quoted
            .replace(/\bBottom\b/g, '"Bottom"'); // Ensure Bottom is quoted
        } catch (error) {
          console.warn("Failed to parse sizes for productId:", item.productId);
          item.sizes = {}; // Default to an empty object if parsing fails
        }
      }

      // Parse garmentDetails if it's a string representation of an array
      if (typeof item.garmentDetails === "string") {
        try {
          item.garmentDetails = item.garmentDetails
            .replace(/<br\s*\/?>/g, "\n") // Replace <br> tags with new line character (if needed)
            .split("\n") // Split the string at new lines
            .map((item) => item.trim()) // Remove any extra spaces around each item
            .filter((item) => item.length > 0); // Remove any empty strings
        } catch (error) {
          console.warn(
            "Failed to parse garmentDetails for productId:",
            item.productId
          );
          item.garmentDetails = []; // Default to an empty array if parsing fails
        }
      }

      // Parse images if it's a string representation of an array
      if (typeof item.images === "string") {
        try {
          item.images = item.images
            .replace(/<br\s*\/?>/g, "\n") // Replace <br> tags with new line character (if needed)
            .split("\n") // Split the string at new lines
            .map((item) => item.trim()) // Remove any extra spaces around each item
            .filter((item) => item.length > 0); // Remove any empty strings
        } catch (error) {
          console.warn("Failed to parse images for productId:", item.productId);
          item.images = []; // Default to an empty array if parsing fails
        }
      }
      return item;
    });
  }, [allProduct]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const productsPerPage = page === 1 ? 12 : 8;
    const startIdx = page === 1 ? 0 : 12 + (page - 2) * 10;
    const endIdx = startIdx + productsPerPage;

    const productList = allProduct.slice(startIdx, endIdx);
    setDisplayedProducts(productList);
  }, [allProduct, page]);

  return (
    <div className="products-page">
      <div className="header">
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "21px", sm: "28px", md: "32px" },
            textAlign: "center",
            // mb: 2,
            // mt: 2,
            marginLeft: { xs: "6px", sm: "12px", md: "16px" },

            fontFamily: "'Cinzel', serif",
            fontWeight: "500",
            color: "#292929",
          }}
        >
          SHIRTS
          {/* <div className="title-border" /> */}
        </Typography>
        <Button
          variant="outlined"
          className="filter-button"
          onClick={toggleDrawer(true)}
          sx={{
            fontSize: { xs: "11px", sm: "12px", md: "16px" },
            color: "#a16149",
            border: "1px solid #a16149",
            marginRight: { xs: "6px", sm: "12px", md: "16px" },
            textTransform: "capitalize",
          }}
          startIcon={<FilterListIcon />}
        >
          Filters
        </Button>
      </div>
      <hr
        className="footer-line"
        style={{
          marginTop: "20px",
          marginBottom: "0px",
          borderTop: "1px solid #d6d6d6 !important",
        }}
      />
      <div className="shop-wrapper">
        <div className="content">
          {/* Filter section for larger screens */}
          <div className="filter-section">
            <div className="category-filter">
              <Typography
                variant="h5"
                sx={{
                  color: "#494949",
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: " 'Roboto Serif', serif",
                  textTransform: "uppercase",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                Category
              </Typography>
              <List>
                {categories.map((category, index) => {
                  const isSelected = filter.category === category;

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => handleFilterChange(category, "category")}
                        sx={{
                          margin: "0 !important",
                          Color: isSelected
                            ? "rgba(0, 106, 25, 0.1)"
                            : "transparent", // Apply green background when selected
                          "&:focus": {
                            fontWeight: "bold !important",
                            Color: "rgba(0, 106, 25, 0.1) !important", // On focus
                          },
                          "&:hover": {
                            backgroundColor: isSelected
                              ? "rgba(0, 106, 25, 0.15)"
                              : "#efefef", // Change hover effect when selected
                          },
                        }}
                      >
                        {isSelected && (
                          <CircleIcon
                            sx={{
                              color: "#a16149",
                              fontSize: "8px",
                              marginRight: "8px",
                            }}
                          />
                        )}
                        <ListItemText
                          primary={category}
                          primaryTypographyProps={{
                            fontFamily: " 'Roboto Serif', serif",
                            fontSize: isSelected ? "16px" : "15px",
                            fontWeight: isSelected ? "600" : "normal",
                            color: isSelected ? "#a16149" : "black",
                            margin: "0 !important", // Override margin
                            padding: "0 !important", // Override padding
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <div className="price-filter">
              <Typography
                variant="h5"
                sx={{
                  color: "#494949",
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: " 'Roboto Serif', serif",
                  textTransform: "uppercase",
                  padding: "10px",
                  borderTop: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                }}
              >
                Price Range
              </Typography>
              <List>
                {priceRanges.map((priceRange, index) => {
                  const isSelected = filter.price === priceRange;

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => handleFilterChange(priceRange, "price")}
                        sx={{
                          margin: "0 !important",
                          Color: isSelected
                            ? "rgba(0, 106, 25, 0.1)"
                            : "transparent", // Apply green background when selected
                          "&:focus": {
                            fontWeight: "bold !important",
                            Color: "rgba(0, 106, 25, 0.1) !important", // On focus
                          },
                          "&:hover": {
                            backgroundColor: isSelected
                              ? "rgba(0, 106, 25, 0.15)"
                              : "#efefef", // Change hover effect when selected
                          },
                        }}
                      >
                        {isSelected && (
                          <CircleIcon
                            sx={{
                              color: "#a16149",
                              fontSize: "8px",
                              marginRight: "8px",
                            }}
                          />
                        )}
                        <ListItemText
                          primary={priceRange}
                          primaryTypographyProps={{
                            fontFamily: " 'Roboto Serif', serif",
                            fontSize: isSelected ? "16px" : "15px",
                            fontWeight: isSelected ? "600" : "normal",
                            color: isSelected ? "#a16149" : "black",
                            margin: "0 !important", // Override margin
                            padding: "0 !important", // Override padding
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <div className="color-filter">
              <Typography
                variant="h5"
                sx={{
                  color: "#494949",
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: " 'Roboto Serif', serif",
                  textTransform: "uppercase",
                  padding: "10px",
                  borderTop: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                }}
              >
                Color
              </Typography>
              <List>
                {availableColors.map((color, index) => {
                  const isSelected = filter.color === color;

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => handleFilterChange(color, "color")}
                        sx={{
                          margin: "0 !important",
                          Color: isSelected
                            ? "rgba(0, 106, 25, 0.1)"
                            : "transparent", // Apply green background when selected
                          "&:focus": {
                            fontWeight: "bold !important",
                            Color: "rgba(0, 106, 25, 0.1) !important", // On focus
                          },
                          "&:hover": {
                            backgroundColor: isSelected
                              ? "rgba(0, 106, 25, 0.15)"
                              : "#efefef", // Change hover effect when selected
                          },
                        }}
                      >
                        {isSelected && (
                          <CircleIcon
                            sx={{
                              color: "#a16149",
                              fontSize: "8px",
                              marginRight: "8px",
                            }}
                          />
                        )}
                        <ListItemText
                          primary={color}
                          primaryTypographyProps={{
                            fontFamily: " 'Roboto Serif', serif",
                            fontSize: isSelected ? "16px" : "15px",
                            fontWeight: isSelected ? "600" : "normal",
                            color: isSelected ? "#a16149" : "black",
                            margin: "0 !important", // Override margin
                            padding: "0 !important", // Override padding
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>

          {/* Products card container */}
          <div className="products-container">
            {displayedProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                handleViewProduct={handleViewProduct}
                country={props.country}
              />
            ))}
          </div>
        </div>
        <div className="pagination"></div>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          count={Math.ceil((allProduct?.length - 12) / 10) + 1}
          page={page}
          onChange={handlePageChange}
          sx={{
            mt: 2,
            mb: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        />
      </div>

      {/* Drawer for tablet/phone filter */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className="drawer-content">
          <div className="category-filter">
            <Typography
              variant="h5"
              sx={{
                color: "#494949",
                fontWeight: "600",
                fontSize: { xs: "12px", sm: "12px", md: "16px" },
                fontFamily: " 'Roboto Serif', serif",
                textTransform: "uppercase",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              Category
            </Typography>
            <List>
              {categories.map((category, index) => {
                const isSelected = filter.category === category;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleFilterChange(category, "category")}
                      sx={{
                        margin: "0 !important",
                        Color: isSelected
                          ? "rgba(0, 106, 25, 0.1)"
                          : "transparent", // Apply green background when selected
                        "&:focus": {
                          fontWeight: "bold !important",
                          Color: "rgba(0, 106, 25, 0.1) !important", // On focus
                        },
                        "&:hover": {
                          backgroundColor: isSelected
                            ? "rgba(0, 106, 25, 0.15)"
                            : "#efefef", // Change hover effect when selected
                        },
                      }}
                    >
                      {isSelected && (
                        <CircleIcon
                          sx={{
                            color: "#a16149",
                            fontSize: "8px",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      <ListItemText
                        primary={category}
                        primaryTypographyProps={{
                          fontFamily: " 'Roboto Serif', serif",
                          fontSize: isSelected
                            ? { xs: "12px", sm: "12px", md: "16px" }
                            : { xs: "11px", sm: "11px", md: "15px" },
                          fontWeight: isSelected ? "600" : "normal",
                          color: isSelected ? "#a16149" : "black",
                          margin: "0 !important", // Override margin
                          padding: "0 !important", // Override padding
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <div className="price-filter">
            <Typography
              variant="h5"
              sx={{
                color: "#494949",
                fontWeight: "600",
                fontSize: { xs: "12px", sm: "12px", md: "16px" },
                fontFamily: " 'Roboto Serif', serif",
                textTransform: "uppercase",
                padding: "10px",
                borderTop: "1px solid #ccc",
                borderBottom: "1px solid #ccc",
              }}
            >
              Price Range
            </Typography>
            <List>
              {priceRanges.map((priceRange, index) => {
                const isSelected = filter.price === priceRange;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleFilterChange(priceRange, "price")}
                      sx={{
                        margin: "0 !important",
                        Color: isSelected
                          ? "rgba(0, 106, 25, 0.1)"
                          : "transparent", // Apply green background when selected
                        "&:focus": {
                          fontWeight: "bold !important",
                          Color: "rgba(0, 106, 25, 0.1) !important", // On focus
                        },
                        "&:hover": {
                          backgroundColor: isSelected
                            ? "rgba(0, 106, 25, 0.15)"
                            : "#efefef", // Change hover effect when selected
                        },
                      }}
                    >
                      {isSelected && (
                        <CircleIcon
                          sx={{
                            color: "#a16149",
                            fontSize: "8px",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      <ListItemText
                        primary={priceRange}
                        primaryTypographyProps={{
                          fontFamily: " 'Roboto Serif', serif",
                          fontSize: isSelected
                            ? { xs: "12px", sm: "12px", md: "16px" }
                            : { xs: "11px", sm: "11px", md: "15px" },
                          fontWeight: isSelected ? "600" : "normal",
                          color: isSelected ? "#a16149" : "black",
                          margin: "0 !important", // Override margin
                          padding: "0 !important", // Override padding
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <div className="color-filter">
            <Typography
              variant="h5"
              sx={{
                color: "#494949",
                fontWeight: "600",
                fontSize: { xs: "12px", sm: "12px", md: "16px" },
                fontFamily: " 'Roboto Serif', serif",
                textTransform: "uppercase",
                padding: "10px",
                borderTop: "1px solid #ccc",
                borderBottom: "1px solid #ccc",
              }}
            >
              Color
            </Typography>
            <List>
              {availableColors.map((color, index) => {
                const isSelected = filter.color === color;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleFilterChange(color, "color")}
                      sx={{
                        margin: "0 !important",
                        Color: isSelected
                          ? "rgba(0, 106, 25, 0.1)"
                          : "transparent", // Apply green background when selected
                        "&:focus": {
                          fontWeight: "bold !important",
                          Color: "rgba(0, 106, 25, 0.1) !important", // On focus
                        },
                        "&:hover": {
                          backgroundColor: isSelected
                            ? "rgba(0, 106, 25, 0.15)"
                            : "#efefef", // Change hover effect when selected
                        },
                      }}
                    >
                      {isSelected && (
                        <CircleIcon
                          sx={{
                            color: "#a16149",
                            fontSize: "8px",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      <ListItemText
                        primary={color}
                        primaryTypographyProps={{
                          fontFamily: " 'Roboto Serif', serif",
                          fontSize: isSelected
                            ? { xs: "12px", sm: "12px", md: "16px" }
                            : { xs: "11px", sm: "11px", md: "15px" },
                          fontWeight: isSelected ? "600" : "normal",
                          color: isSelected ? "#a16149" : "black",
                          margin: "0 !important", // Override margin
                          padding: "0 !important", // Override padding
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      </Drawer>
      {showModal.open ? (
        <ViewProductModal
          open={showModal.open}
          product={showModal.data}
          setShowModal={setShowModal}
        ></ViewProductModal>
      ) : null}
    </div>
  );
};

export default ProductsPage;

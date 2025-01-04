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
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@mui/material";
import "../../css/shop.css";
import ProductCard from "../../components/card/productCard";
import CircleIcon from "@mui/icons-material/Circle";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewProductModal from "../product/viewProduct";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import CustomTextfield from "../../components/textfield/customTextfield";

const ProductsPage = (props) => {
  const [allProduct, setAllProduct] = useState(props.allProduct || []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(props.loading || false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });
  const [filter, setFilter] = useState({
    category: "",
    price: "",
    color: "",
    search: "",
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
  const priceRanges = [
    { label: "Under 10000", min: 0, max: 10000 },
    { label: "10000-20000", min: 10000, max: 15000 },
    { label: "Above 20000", min: 20000, max: 200000 },
  ];
  const availableColors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Black",
    "Ivory",
    "Gray",
    "Pink",
    "Lilac",
    "Purple",
    "Beige",
    "Brown",
    "Peach",
    "Off-white",
    "Maroon",
    "Gold",
    "Silver",
    "Print",
  ];

  useEffect(() => {
    setLoading(true);
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const productsPerPage = page === 1 ? 16 : 8;
    const startIdx = page === 1 ? 0 : 16 + (page - 2) * 10;
    const endIdx = startIdx + productsPerPage;

    const filteredProducts = allProduct.filter((product) => {
      // Category Filter
      const categoryFilter =
        filter.category !== ""
          ? _.lowerCase(product.category) === _.lowerCase(filter.category) // Match category case-insensitively
          : true; // If no category filter, include all

      // Price Filter
      const priceFilter =
        filter.price !== "" // Check if a price range is selected
          ? (() => {
              const price = product.price; // Get product price
              const range = priceRanges.find((r) => r.label === filter.price); // Find the selected range

              // Return true if price falls within the selected range
              return range && price >= range.min && price <= range.max;
            })()
          : true; // Include all if no price filter

      const searchFilter =
        filter.search !== ""
          ? product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(filter.search.toLowerCase())
          : true;

      // Return true only if both filters match
      return categoryFilter && priceFilter && searchFilter;
    });

    const productList = filteredProducts.slice(startIdx, endIdx);
    setDisplayedProducts(productList);
  }, [allProduct, page, filter]);

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
          {filter.category}
          {/* <div className="title-border" /> */}
        </Typography>
        <CustomTextfield
          label="Search"
          config={{ field: "search", type: "filter" }}
          handleEdit={handleFilterChange}
          sx={{
            width: "30%",
          }}
          placeholder="Search for products"
          variant="outlined"
        ></CustomTextfield>
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
                        {isSelected && (
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFilter((prev) => ({
                                  ...prev,
                                  category: "",
                                }));
                              }}
                            >
                              <ClearIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
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
                  const isSelected = filter.price === priceRange.label;

                  return (
                    <ListItem
                      key={`${priceRange.label}${index}`}
                      disablePadding
                    >
                      <ListItemButton
                        onClick={() =>
                          handleFilterChange(priceRange.label, "price")
                        }
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
                          primary={priceRange.label}
                          primaryTypographyProps={{
                            fontFamily: " 'Roboto Serif', serif",
                            fontSize: isSelected ? "16px" : "15px",
                            fontWeight: isSelected ? "600" : "normal",
                            color: isSelected ? "#a16149" : "black",
                            margin: "0 !important", // Override margin
                            padding: "0 !important", // Override padding
                          }}
                        />
                        {isSelected && (
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFilter((prev) => ({
                                  ...prev,
                                  price: "",
                                }));
                              }}
                            >
                              <ClearIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
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
              <Box
                sx={{
                  maxHeight: "250px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px", // Slim scrollbar width
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f0f0f0", // Track background color
                    borderRadius: "10px", // Rounded corners for the track
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888", // Scrollbar thumb color
                    borderRadius: "10px", // Pill-shaped scrollbar
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555", // Darker thumb color on hover
                  },
                }}
              >
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
                          {isSelected && (
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFilter((prev) => ({
                                    ...prev,
                                    price: "",
                                  }));
                                }}
                              >
                                <ClearIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          )}
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </div>
          </div>

          {/* Products card container */}
          <div className="products-container">
            {displayedProducts.length < 1 ? (
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                No Records Found
              </Typography>
            ) : (
              displayedProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  handleViewProduct={handleViewProduct}
                  country={props.country}
                />
              ))
            )}
          </div>
        </div>
        <div className="pagination"></div>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          count={Math.ceil((allProduct?.length - 16) / 10) + 1}
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

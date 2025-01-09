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
import { availableColors } from "../../common";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ClickAwayListener from "@mui/material/ClickAwayListener";
const ProductsPage = (props) => {
  const [allProduct, setAllProduct] = useState(props.allProduct || []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(props.loading || false);
  const [categories, setCategories] = useState(props.allCategories || []);
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

  useEffect(() => {
    const categoryList = props.allCategories.map((category) => {
      return { label: category.name, value: category.value };
    });
    setCategories(categoryList);
  }, [props.allCategories]);

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
  const priceRanges = [
    { label: "Under 10000", min: 0, max: 10000 },
    { label: "10000-20000", min: 10000, max: 15000 },
    { label: "Above 20000", min: 20000, max: 200000 },
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="products-page">
      {/* <div className="header">
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "21px", sm: "28px", md: "32px" },
            textAlign: "center",
            
            marginLeft: { xs: "6px", sm: "12px", md: "16px" },

            fontFamily: "'Cinzel', serif",
            fontWeight: "500",
            color: "#292929",
          }}
        >
          {filter.category}
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
      </div> */}

      <Box
        className="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Allows other elements to take space but keeps title in center
          gap: 2,
          position: "relative",
          width: "100%",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "21px", sm: "28px", md: "32px" },
            textAlign: "center",
            marginLeft: { xs: "6px", sm: "12px", md: "16px" },
            fontFamily: "'Cinzel', serif",
            fontWeight: "500",
            color: "#292929",
            flexGrow: { xs: 0, sm: 0, md: 1 },
            marginLeft: {
              xs: "5px",
              sm: "12px",
              md: isSearchOpen ? "286px" : "0",
            },
          }}
        >
          {filter.category || "Shop"}
        </Typography>

        {/* Search Box */}
        {/* <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          {!isSearchOpen ? (
            <IconButton
              onClick={toggleSearch}
              sx={{
                color: "#292929",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <SearchIcon />
            </IconButton>
          ) : (
            <CustomTextfield
              label="Search"
              config={{ field: "search", type: "filter" }}
              handleEdit={handleFilterChange}
              sx={{
                width: { xs: "200px", sm: "300px", md: "400px" },
                transition: "width 0.4s ease-in-out",
              }}
              placeholder="Search for products"
              variant="outlined"
            />
          )}
        </Box> */}

        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Search Box */}
          <ClickAwayListener onClickAway={closeSearch}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              {!isSearchOpen ? (
                <Button
                  onClick={toggleSearch}
                  variant="outlined"
                  sx={{
                    fontSize: { xs: "11px", sm: "12px", md: "16px" },
                    color: "#a16149",
                    border: "1px solid #a16149",
                    textTransform: "capitalize",
                    height: "36px",
                    // minWidth: "40px",
                    marginRight: { xs: "auto", sm: "auto", md: "16px" },
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: "rgba(161, 97, 73, 0.1)",
                    },
                  }}
                  // startIcon={<SearchIcon />}
                >
                  <SearchIcon sx={{ fontSize: "21px" }} />
                </Button>
              ) : (
                <Box
                  sx={{
                    marginRight: { xs: "auto", sm: "auto", md: "16px" },
                    display: "flex",
                    alignItems: "center",
                    width: { xs: "180px", sm: "300px", md: "350px" },
                    height: "36px",
                    transition: "width 0.4s ease-in-out",
                    position: "relative",
                  }}
                >
                  <CustomTextfield
                    label=""
                    config={{ field: "search", type: "filter" }}
                    handleEdit={handleFilterChange}
                    placeholder="Search products"
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "100%",
                      fontFamily: "'Roboto Serif', serif",
                      borderRadius: "2px",
                      "& .MuiOutlinedInput-root": {
                        height: "100%",
                        fontFamily: "'Roboto Serif', serif",
                        border: "1px solid #a16149",
                        "&:hover": {
                          borderColor: "pink !important",
                        },
                        "&.Mui-focused": {
                          borderColor: "#a16149",
                        },
                      },
                      "& input": {
                        fontSize: { xs: "12px", sm: "13px", md: "14px" },
                        padding: "6px",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: { xs: "12px", sm: "13px", md: "14px" },
                      },
                    }}
                  />

                  <IconButton
                    onClick={closeSearch}
                    sx={{
                      position: "absolute",
                      right: "4px",
                      color: "#a16149",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </ClickAwayListener>
          {/* Filter Button */}
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
              display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
            }}
            startIcon={<FilterListIcon />}
          >
            Filters
          </Button>
        </Box>
      </Box>

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
                  const isSelected = filter.category === category.value;

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() =>
                          handleFilterChange(category.value, "category")
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
                          primary={category.label}
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
                  const isSelected = filter.price === priceRange;

                  return (
                    <ListItem
                      key={`${priceRange.label}${index}`}
                      disablePadding
                    >
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
              <Box
                sx={{
                  justifyContent: "center", // Center horizontally
                  textAlign: "center",
                  display: "flex",

                  width: "100%",
                  marginTop: "20px",
                  // marginLeft: "10px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "18px", sm: "22px", md: "24px" },
                    textAlign: "center",
                    fontFamily: "'Roboto Serif', serif",
                    fontWeight: "500",
                    color: "gray",
                  }}
                >
                  No Records Found
                </Typography>
              </Box>
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

        <Box
          className="footer-line"
          style={{
            // marginTop: "20px",
            marginBottom: "10px",
            borderTop: "1px solid #d6d6d6 !important",
          }}
        />
        <Box className="pagination" sx={{ pb: "80px" }}>
          <Pagination
            variant="outlined"
            shape="circle"
            count={Math.ceil((allProduct?.length - 12) / 10) + 1}
            page={page}
            onChange={handlePageChange}
            sx={{
              mt: 2,
              mb: 5,
              mr: "14px",
              display: "flex",
              justifyContent: "center",
              "& .MuiPaginationItem-root": {
                color: "#121212", // Default text color for items
                "&:hover": {
                  backgroundColor: "rgba(171, 58, 16, 0.5)", // Slightly transparent hover effect
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#b77961 !important", // Background color for the selected item
                color: "#fff", // Text color for better contrast
                "&:hover": {
                  backgroundColor: "#D7B4A7 !important", // Keep the same color on hover for the selected item
                },
              },
            }}
          />
        </Box>
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
                const isSelected = filter.category === category.value;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleFilterChange(category.value, "category")
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
                        primary={category.label}
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
                        primary={priceRange.label}
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

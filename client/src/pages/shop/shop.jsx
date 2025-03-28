import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Pagination,
  Typography,
  keyframes,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../api";
import { availableColors, featured, findLabelByValue } from "../../common";
import ProductCard from "../../components/card/productCard";
import CustomLoader from "../../components/customLoader";
import CustomTextfield from "../../components/textfield/customTextfield";
import "../../css/shop.css";
import useDebounce from "../../hooks/useDebounce";
import { setFilter } from "../../store/cartSlice";
import Footer from "../homepage/footer";
import ViewProductModal from "../product/viewProduct";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState({
    products: [],
    totalPages: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(props.allCategories || []);
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });
  // const [filter, setFilter] = useState({
  //   category: "",
  //   price: "",
  //   color: "",
  //   search: "",
  // });

  const filter = useSelector((state) => state.cart.filter);

  useEffect(() => {
    const categoryList = props.allCategories
      .filter((row) => row.show)
      .map((category) => {
        return { label: category.name, value: category.value };
      });
    setCategories(categoryList);
  }, [props.allCategories]);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(setFilter({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  const handleFilterChange = (value, field) => {
    if (field === "search") {
      setSearchTerm(value); // Update local state for debouncing
    } else {
      dispatch(setFilter({ [field]: value }));
      setPage(1);
    }
  };

  const handleViewProduct = (product) => {
    setShowModal({
      open: true,
      data: product,
    });
  };
  const priceRanges = [
    { label: "Under 10000", min: 0, max: 10000 },
    { label: "10000 - 20000", min: 10000, max: 20000 },
    { label: "Above 20000", min: 20000, max: 200000 },
  ];

  const handlePageChange = (_event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    getAllProducts({
      setProductsData: setAllProduct,
      setLoading,
      country: props.country,
      isActive: true,
      page: page,
      limit: 16,
      filter,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, props.country, filter]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };
  const closeSearch = () => {
    setSearchTerm("");
    setIsSearchOpen(false);
  };
  const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;
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
            // marginLeft: { xs: "6px", sm: "12px", md: "16px" },
            fontFamily: "'Cinzel', serif",
            fontWeight: "500",
            color: "#292929",
            flexGrow: { xs: 0, sm: 0, md: 1 },
            marginLeft: {
              xs: "5px",
              sm: "12px",
              // md: isSearchOpen ? "286px" : "0",
              md: isSearchOpen ? "350px" : "64px",
            },
          }}
        >
          {filter.category
            ? findLabelByValue(categories, filter.category)
            : "Shop"}
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
          <Box className="filter-section">
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
                          Color: isSelected ? "#F7ECE9" : "transparent",
                          "&:focus": {
                            fontWeight: "bold !important",
                            Color: "#F7ECE9 !important", // On focus
                          },
                          "&:hover": {
                            backgroundColor: isSelected ? "#F7ECE9" : "#efefef", // Change hover effect when selected
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
                            paddingRight: "20px",

                            fontFamily: " 'Roboto Serif', serif",
                            fontSize: isSelected ? "13px" : "13px",
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
                                handleFilterChange("", "category");
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

            <div className="featured-filter">
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
                  borderTop: "1px solid #ccc",
                }}
              >
                Featured
              </Typography>
              <List>
                {featured.map((featured, index) => {
                  const isSelected = filter.featured === featured.value;

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() =>
                          handleFilterChange(featured.value, "featured")
                        }
                        sx={{
                          margin: "0 !important",

                          Color: isSelected ? "#F7ECE9" : "transparent",
                          "&:focus": {
                            fontWeight: "bold !important",
                            Color: "#F7ECE9 !important", // On focus
                          },
                          "&:hover": {
                            backgroundColor: isSelected ? "#F7ECE9" : "#efefef", // Change hover effect when selected
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
                          primary={featured.label}
                          primaryTypographyProps={{
                            textTransform: "uppercase",
                            fontFamily: " 'Roboto Serif', serif",
                            fontSize: isSelected ? "13px" : "13px",
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
                                handleFilterChange("", "featured");
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
                  const isSelected = filter.price?.label === priceRange.label;
                  return (
                    <ListItem
                      key={`${priceRange.label}${index}`}
                      disablePadding
                    >
                      <ListItemButton
                        onClick={() => handleFilterChange(priceRange, "price")}
                        sx={{
                          margin: "0 !important",
                          Color: isSelected ? "#F7ECE9" : "transparent",
                          "&:focus": {
                            fontWeight: "bold !important",
                            Color: "#F7ECE9 !important", // On focus
                          },
                          "&:hover": {
                            backgroundColor: isSelected ? "#F7ECE9" : "#efefef", // Change hover effect when selected
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
                            textTransform: "uppercase",
                            fontFamily: " 'Roboto Serif', serif",
                            fontSize: isSelected ? "13px" : "13px",
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
                                handleFilterChange("", "price");
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
                            Color: isSelected ? "#F7ECE9" : "transparent",
                            "&:focus": {
                              fontWeight: "bold !important",
                              Color: "#F7ECE9 !important", // On focus
                            },
                            "&:hover": {
                              backgroundColor: isSelected
                                ? "#F7ECE9"
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
                              textTransform: "uppercase",
                              fontFamily: " 'Roboto Serif', serif",
                              fontSize: isSelected ? "13px" : "13px",
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
                                  handleFilterChange("", "color");
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
            {/* <div className="color-filter">
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
                Featured
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
                  {featured.map((color, index) => {
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
                                  handleFilterChange("", "color");
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
            </div> */}
          </Box>

          {/* Products card container */}
          <div>
            {loading ? (
              <Box
                sx={{
                  padding: "50px 0",

                  width: { xs: "100vw", sm: "100vw", md: "70vw" },

                  marginTop: "100px",
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  justifyContent: "center",
                  // background: "linear-gradient(to right, #ffe4e1, #e6e6fa)",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <CustomLoader />
              </Box>
            ) : allProduct.products?.length < 1 ? (
              // <Box>
              //   <Typography
              //     variant="h3"
              //     sx={{
              //       fontSize: { xs: "18px", sm: "22px", md: "24px" },
              //       textAlign: "center",
              //       fontFamily: "'Roboto Serif', serif",
              //       fontWeight: "500",
              //       color: "gray",
              //     }}
              //   >
              //     Uh oh! 😞 <br />
              //     No records found
              //   </Typography>
              // </Box>
              <Box
                sx={{
                  padding: "50px 0",

                  width: { xs: "100vw", sm: "100vw", md: "80vw" },
                  // height: "100vh",
                  marginTop: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  // background: "linear-gradient(to right, #ffe4e1, #e6e6fa)",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: 96,
                    height: 96,
                    mb: 4,
                    animation: `${bounce} 1.5s infinite`,
                  }}
                >
                  {/* <NotificationsActiveIcon
                    sx={{ fontSize: 96, color: "#a16149" }}
                  /> */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="#a16149"
                  >
                    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
                  </svg>
                </Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "#2F3E4E",
                    fontFamily: "Cinzel, serif",
                    fontSize: { xs: "26px", sm: "32px", md: "36px" },
                  }}
                  mb={3}
                >
                  Coming Soon
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  mb={3}
                  sx={{
                    fontFamily: "Roboto serif",
                    fontSize: { xs: "18px", sm: "22px", md: "24px" },
                  }}
                >
                  We're adding more amazing products to our collection.
                </Typography>
              </Box>
            ) : (
              // <Box
              //   sx={{
              //     padding: "50px 0",
              //     display: "flex",
              //     flexDirection: "column",
              //     justifyContent: "center",
              //     alignItems: "center",
              //     width: { xs: "100vw", sm: "100vw", md: "70vw" },
              //     // height: "100vh",
              //     textAlign: "center",
              //     // bgcolor: "#f5f5f5",
              //   }}
              // >
              //   {/* Image */}
              //   <Box
              //     component="img"
              //     src={NoProductEror}
              //     alt="No products found"
              //     sx={{
              //       width: { xs: "80%", sm: "60%", md: "40%" },
              //       maxWidth: "130px",
              //       height: "auto",
              //       mb: 2,
              //     }}
              //   />

              //   {/* Title */}
              //   <Typography
              //     variant="h5"
              //     sx={{
              //       fontSize: { xs: "18px", sm: "22px", md: "24px" },
              //       fontWeight: "600",
              //       color: "gray",
              //       mb: 1,
              //     }}
              //   >
              //     No Products Found
              //   </Typography>

              //   {/* Subtitle */}
              //   <Typography
              //     variant="body2"
              //     sx={{
              //       fontSize: { xs: "14px", sm: "16px" },
              //       color: "gray",
              //       // maxWidth: "80%",
              //     }}
              //   >
              //     Your search did not match any products. <br /> Please try
              //     again.
              //   </Typography>
              // </Box>
              // <Box
              //   className="products-container"
              //   sx={{
              //     display: "flex",
              //     justifyContent: "center",

              //     width: "85vw",
              //   }}
              // >
              //   <img
              //     src={NoProductEror}
              //     alt="No products found"
              //     width={350}
              //     height={350}
              //     style={{ maxWidth: "100%", height: "auto" }}
              //   />
              // </Box>
              <div className="products-container">
                {allProduct.products?.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    handleViewProduct={handleViewProduct}
                    country={props.country}
                  />
                ))}
              </div>
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
            count={allProduct.totalPages}
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
                fontSize: { xs: "15px", sm: "15px", md: "16px" },
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
                        Color: isSelected ? "#F7ECE9" : "transparent",
                        "&:focus": {
                          fontWeight: "bold !important",
                          Color: "#F7ECE9 !important", // On focus
                        },
                        "&:hover": {
                          backgroundColor: isSelected ? "#F7ECE9" : "#efefef", // Change hover effect when selected
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
                            ? { xs: "14px", sm: "14px", md: "16px" }
                            : { xs: "14px" },
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
                              handleFilterChange("", "category");
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

          <div className="featured-filter">
            <Typography
              variant="h5"
              sx={{
                color: "#494949",
                fontWeight: "600",
                fontSize: { xs: "15px", sm: "15px", md: "16px" },
                fontFamily: " 'Roboto Serif', serif",
                textTransform: "uppercase",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                borderTop: "1px solid #ccc",
              }}
            >
              Featured
            </Typography>
            <List>
              {featured.map((featured, index) => {
                const isSelected = filter.featured === featured.value;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleFilterChange(featured.value, "featured")
                      }
                      sx={{
                        margin: "0 !important",
                        Color: isSelected ? "#F7ECE9" : "transparent",
                        "&:focus": {
                          fontWeight: "bold !important",
                          Color: "#F7ECE9 !important", // On focus
                        },
                        "&:hover": {
                          backgroundColor: isSelected ? "#F7ECE9" : "#efefef", // Change hover effect when selected
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
                        primary={featured.label}
                        primaryTypographyProps={{
                          textTransform: "uppercase",
                          fontFamily: " 'Roboto Serif', serif",
                          fontSize: isSelected
                            ? { xs: "14px", sm: "14px", md: "16px" }
                            : { xs: "14px" },
                          fontWeight: isSelected ? "600" : "normal",
                          color: isSelected ? "#a16149" : "black",
                          margin: "0 !important", // Override margin
                          padding: "0 !important", // Override padding
                        }}
                      />
                      {isSelected && (
                        <ListItemSecondaryAction>
                          <IconButton
                            sx={{ zIndex: 10 }}
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFilterChange("", "featured");
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
                fontSize: { xs: "15px", sm: "15px", md: "16px" },
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
                const isSelected = filter.price?.label === priceRange.label;
                return (
                  <ListItem key={`${priceRange.label}${index}`} disablePadding>
                    <ListItemButton
                      onClick={() => handleFilterChange(priceRange, "price")}
                      sx={{
                        margin: "0 !important",
                        Color: isSelected ? "#F7ECE9" : "transparent",
                        "&:focus": {
                          fontWeight: "bold !important",
                          Color: "#F7ECE9 !important", // On focus
                        },
                        "&:hover": {
                          backgroundColor: isSelected ? "#F7ECE9" : "#efefef", // Change hover effect when selected
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
                          textTransform: "uppercase",
                          fontFamily: " 'Roboto', serif",
                          fontSize: isSelected
                            ? { xs: "14px", sm: "14px", md: "16px" }
                            : { xs: "14px" },
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
                              handleFilterChange("", "price");
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
                fontSize: { xs: "15px", sm: "15px", md: "16px" },
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
                        Color: isSelected ? "#F7ECE9" : "transparent",
                        "&:focus": {
                          fontWeight: "bold !important",
                          Color: "#F7ECE9 !important", // On focus
                        },
                        "&:hover": {
                          backgroundColor: isSelected ? "#F7ECE9" : "#efefef", // Change hover effect when selected
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
                          textTransform: "uppercase",
                          fontFamily: " 'Roboto Serif', serif",
                          fontSize: isSelected
                            ? { xs: "14px", sm: "14px", md: "16px" }
                            : { xs: "14px" },
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
                              handleFilterChange("", "color");
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
        </div>
      </Drawer>
      {showModal.open ? (
        <ViewProductModal
          open={showModal.open}
          product={showModal.data}
          setShowModal={setShowModal}
        ></ViewProductModal>
      ) : null}
      <Footer />
    </div>
  );
};

export default ProductsPage;

import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";
import "../../css/shop.css";
import ProductCard from "../../components/card/productCard";
import { products } from "../../common";
import CircleIcon from "@mui/icons-material/Circle";
import Footer from "../homepage/footer";
import FilterListIcon from "@mui/icons-material/FilterList";

const ProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  const [filter, setFilter] = useState({
    category: "Shirts",
    price: "",
    color: "",
  });

  const handleFilterChange = (value, field) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const categories = ["Shirts", "Co-ords", "Kurtas", "Suits"];
  const priceRanges = ["Under 10000", "10000-15000", "15000-20000"];
  const availableColors = ["Red", "Black", "Blue", "Green", "Yellow"];

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
            fontWeight: "600",
            color: "#292929",
          }}
        >
          SHIRTS
          {/* <div className="title-border" /> */}
        </Typography>
        <Button
          variant="outlined"
          color="success"
          className="filter-button"
          onClick={toggleDrawer(true)}
          sx={{
            fontSize: { xs: "11px", sm: "12px", md: "16px" },

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
                            color: "#006A19",
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
                          color: isSelected ? "#006a19" : "black",
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
                            color: "#006A19",
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
                          color: isSelected ? "#006a19" : "black",
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
                            color: "#006A19",
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
                          color: isSelected ? "#006a19" : "black",
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
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
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
                            color: "#006A19",
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
                          color: isSelected ? "#006a19" : "black",
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
                            color: "#006A19",
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
                          color: isSelected ? "#006a19" : "black",
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
                            color: "#006A19",
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
                          color: isSelected ? "#006a19" : "black",
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
    </div>
  );
};

export default ProductsPage;

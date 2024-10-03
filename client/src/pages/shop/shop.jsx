import React, { useState } from "react";
import "../../css/shop.css";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ProductCard from "../../components/card/productCard";
import { products } from "../../common";
import Footer from "../homepage/footer";

const Shop = () => {
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
    <div>
      <div>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 2,
            mt: 4,
            fontFamily: "'Cinzel', serif",
            fontWeight: "600",
          }}
        >
          SHIRTS
          <div className="title-border" />
        </Typography>
      </div>
      <div className="shop-container">
        <div className="shop-filter-wrapper">
          <div className="category-filter">
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                // marginBottom: 2,
                marginTop: 2,
                fontFamily: "'Cinzel', serif",
                paddingBottom: 1,
                borderBottom: "2px solid black",
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
                    >
                      {isSelected && (
                        <CircleIcon
                          sx={{
                            color: "#006A19",
                            fontSize: "10px",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      <ListItemText
                        primary={category}
                        sx={{
                          fontWeight: isSelected ? "bold !important" : "normal",
                          color: isSelected ? "#006a19" : "black",
                          fontFamily: "'Cinzel', serif !important",
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
                fontWeight: "bold",
                fontSize: "20px",
                // marginBottom: 2,
                marginTop: 2,
                fontFamily: "'Cinzel', serif",
                paddingBottom: 1,
                borderBottom: "2px solid black",
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
                    >
                      {isSelected && (
                        <CircleIcon
                          sx={{
                            color: "#006A19",
                            fontSize: "10px",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      <ListItemText
                        primary={priceRange}
                        sx={{
                          fontWeight: isSelected ? "bold" : "normal",
                          color: isSelected ? "#006a19" : "black",
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
                fontWeight: "bold",
                fontSize: "20px",
                // marginBottom: 2,
                marginTop: 2,
                fontFamily: "'Cinzel', serif",
                paddingBottom: 1,
                borderBottom: "2px solid black",
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
                    >
                      {isSelected && (
                        <CircleIcon
                          sx={{
                            color: "#006a19",
                            fontSize: "10px",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      <ListItemText
                        primary={color}
                        sx={{
                          fontWeight: isSelected ? "bold !important" : "normal",
                          color: isSelected ? "#006a19" : "black",
                          fontFamily: "'Cinzel', serif !important",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>

        <div className="product-container">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Shop;

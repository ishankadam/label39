import {
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./shop.css";
import {
  availableColors,
  categories,
  fabrics,
  priceRanges,
  products,
} from "../../common";
import CircleIcon from "@mui/icons-material/Circle";
import ProductCard from "../../components/card/productCard";
import Footer from "../homepage/footer";
import ViewProductModal from "../product/viewProduct";

const Test = (props) => {
  const [title, setTitle] = useState(props.title || "SHIRTS");
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });
  const [filter, setFilter] = useState({
    category: "",
    fabric: { type: "", subType: "" },
    price: "",
    color: "",
  });
  const handleViewProduct = (product) => {
    setShowModal({
      open: true,
      data: product,
    });
  };

  const handleFilterChange = (value, field, fabricType) => {
    if (field === "category") {
      setTitle(value);
    }

    setFilter((prev) => {
      if (field === "fabric") {
        return {
          ...prev,
          fabric: {
            type: fabricType,
            subType: value,
          },
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  return (
    <>
      <div>
        <Typography
          variant="h2"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {title}
        </Typography>
      </div>
      <div className="shop-container">
        <div className="shop-filter-wrapper">
          <div className="category-filter">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Category
            </Typography>
            {categories.map((category) => {
              const isSelected = filter.category === category.label;

              return (
                <ListItem key={category.value} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      handleFilterChange(category.label, "category")
                    }
                  >
                    {isSelected && (
                      <CircleIcon
                        sx={{
                          color: "black",
                          fontSize: "small",
                          marginRight: "8px",
                        }}
                      />
                    )}
                    <ListItemText
                      primary={category.label}
                      sx={{ fontWeight: isSelected ? "bold" : "normal" }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </div>
          <Divider sx={{ backgroundColor: "black", height: "2px" }} />

          <div className="fabrics-filter">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Fabrics
            </Typography>
            <List>
              {fabrics.map((fabricObj, index) => (
                <div key={index}>
                  {Object.entries(fabricObj).map(([fabricType, options]) => (
                    <div key={fabricType}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {fabricType}
                      </Typography>
                      <List>
                        {options.map((option, optionIndex) => {
                          const isSelected =
                            filter.fabric.subType === option.label;
                          return (
                            <ListItem key={optionIndex}>
                              <ListItemButton
                                onClick={() =>
                                  handleFilterChange(
                                    option.label,
                                    "fabric",
                                    fabricType
                                  )
                                }
                              >
                                {isSelected && (
                                  <CircleIcon
                                    sx={{
                                      color: "black",
                                      fontSize: "small",
                                      marginRight: "8px",
                                    }}
                                  />
                                )}
                                <ListItemText
                                  primary={option.label}
                                  sx={{
                                    fontWeight: isSelected ? "bold" : "normal",
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </div>
                  ))}
                </div>
              ))}
            </List>
          </div>
          <Divider sx={{ backgroundColor: "black", height: "2px" }} />

          <div className="price-filter">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Price Range
            </Typography>
            <List>
              {priceRanges.map((priceRange, index) => {
                const isSelected = filter.price === priceRange.label;
                return (
                  <ListItem key={index}>
                    <ListItemButton
                      onClick={() =>
                        handleFilterChange(priceRange.label, "price")
                      }
                    >
                      {isSelected && (
                        <CircleIcon
                          sx={{
                            color: "black",
                            fontSize: "small",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      <ListItemText
                        primary={priceRange.label}
                        sx={{ fontWeight: isSelected ? "bold" : "normal" }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <Divider sx={{ backgroundColor: "black", height: "2px" }} />

          <div className="color-filter">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Color
            </Typography>
            <List>
              {availableColors.map((color, index) => {
                const isSelected = filter.color === color.label;

                return (
                  <ListItem key={index}>
                    <ListItemButton
                      onClick={() => handleFilterChange(color.label, "color")}
                    >
                      {isSelected && (
                        <CircleIcon
                          sx={{
                            color: "black",
                            fontSize: "small",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      <ListItemText
                        primary={color.label}
                        sx={{ fontWeight: isSelected ? "bold" : "normal" }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <Divider sx={{ backgroundColor: "black", height: "2px" }} />
        </div>
        <div className="product-container">
          <Grid2 container spacing={2} className="product-container">
            {products.map((product, index) => (
              <Grid2 item={{ xs: 1, sm: 6, md: 4 }} key={product=${index}}>
                <ProductCard
                  product={product}
                  handleViewProduct={handleViewProduct}
                />
              </Grid2>
            ))}
          </Grid2>
        </div>
      </div>
      <Footer></Footer>

      {showModal.open ? (
        <ViewProductModal
          open={showModal.open}
          product={showModal.data}
          setShowModal={setShowModal}
        ></ViewProductModal>
      ) : null}
    </>
  );
};

export default Test;
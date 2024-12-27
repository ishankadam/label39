import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import "./../../css/productCard.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { addProductToCart, imageUrl } from "../../api";
import { deliveryIn, getCurrencySymbol } from "../../common";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    const userId = localStorage.getItem("userId");
    e.stopPropagation();
    const cartProduct = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      quantity: 1,
      deliveryIn: product.deliveryIn,
      images: [product.images[0]],
      sizes: {
        Upper: "XS",
        Bottom: "XS",
      },
    };
    dispatch(addToCart(cartProduct));
    if (!userId) return;
    addProductToCart({ cartProduct, userId });
  };

  return (
    <Card
      className="product-card"
      sx={{
        position: "relative", // Needed to position Sold Out tag
        margin: { xs: "6px", sm: "12px", md: "16px" },

        maxWidth: 350,

        border: "1px solid #ccc",
        boxShadow: "none",
        cursor: "pointer",
        background: "#f9f9f9",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        props.handleViewProduct(props.product);
      }}
    >
      {/* Conditional Tag (Sold Out or Best Seller) */}
      {(props.product.soldOut || props.product.bestseller) && (
        <Box
          className="product-tag"
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: props.product.soldOut ? "white" : "white", // White for Sold Out, Gold for Best Seller
            // border: "1px solid aliceblue",
            boxShadow: "0px 10px -14px 14px #FFF",
            color: props.product.soldOut ? "#494949" : "#494949",
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "10px", sm: "12px", md: "12px" },
            padding: { xs: "3px 8px", sm: "4px 10px", md: "4px 10px" },
            borderRadius: "2px",
            fontWeight: "500",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          {props.product.soldOut ? "Sold Out" : "Best Seller"}
        </Box>
      )}

      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          className="cardMedia"
          component="img"
          sx={{
            // height: { xs: "280px", sm: "350px", md: "500px" },
            transition: "transform 300ms ease-in-out",
          }}
          image={`${imageUrl}products/${props.product.images[0]}`}
          alt={props.product.label}
        />
        {/* Button Wrapper */}
        {/* <Box
          className={`button-wrapper ${isHovered ? "show" : ""}`}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid  #ccc",
            transition: "transform 300ms ease-in-out",
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            background: "#f9f9f9",
            zIndex: 2,
          }}
        >
          <Button
            variant="outlined"
            color="success"
            size="small"
            sx={{
              width: "30%",
              padding: "0 !important",
              border: "2px solid #006a19",
            }}
          >
            <IconButton color="inherit">
              <ShoppingCartOutlinedIcon sx={{ color: "#006a19" }} />
            </IconButton>
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{
              width: "65%",
              padding: "0 !important",
              fontWeight: "600",
              fontSize: "14px ",
              fontFamily: "'Poppins', serif",
            }}
          >
            Buy Now
          </Button>
        </Box> */}
      </Box>

      <CardContent
        sx={{
          padding: "10px 16px",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          sx={{
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "400",
            fontSize: { xs: "11px", sm: "12px", md: "16px" },
          }}
        >
          {props.asSeenOn && props.product.asSeenOn
            ? `${props.product.asSeenOn} in ${props.product.name}`
            : props.product.name}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{
            fontSize: { xs: "12px", sm: "13px", md: "16px" },
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {getCurrencySymbol(props.country)}. {props.product.price}
        </Typography>
      </CardContent>
      <Box
        className={`button-wrapper ${isHovered ? "show" : ""}`}
        sx={{
          flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },

          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: { xs: "none", sm: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid  #ccc",
          transition: "transform 300ms ease-in-out",
          transform: isHovered ? "translateY(0)" : "translateY(100%)",
          background: "#f9f9f9",
          zIndex: 2,
        }}
      >
        <IconButton
          variant="outlined"
          color="custom"
          onClick={(e) => {
            handleAddToCart(e, props.product);
          }}
        >
          <ShoppingCartOutlinedIcon />
        </IconButton>

        <Button variant="outlined" color="custom">
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;

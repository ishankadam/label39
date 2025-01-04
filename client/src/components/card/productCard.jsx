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
  const [imageIndex, setImageIndex] = useState(0); // Initial image index is 0

  const handleMouseEnter = () => {
    setImageIndex(1); // Change image to index 1 on hover
  };

  const handleMouseLeave = () => {
    setImageIndex(0); // Change image back to index 0 when hover ends
  };
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
            top: "8px",
            left: "0px",
            background: props.product.soldOut ? "#405468" : "#db5858", // Gold for Best Seller
            color: props.product.soldOut ? "#fff" : "#fff",
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "10px", sm: "12px", md: "11.5px" },
            // padding: { xs: "3px 8px", sm: "4px 10px", md: "4px 10px" },
            fontWeight: "500",
            textTransform: "uppercase",
            zIndex: 1,
            // Apply the ribbon effect using CSS properties
            borderBlock: "0.2em solid #0000",
            paddingInline: "0.5em calc(var(--r) + 0.35em)",
            lineHeight: "1.6",
            clipPath:
              "polygon(100% 0, 0 0, 0 100%, 100% 100%, 100% calc(100% - 0.1em), calc(100% - var(--r)) 50%, 100% 0.1em)",
            width: "fit-content",
            "--r": "0.8em", // control the cutout
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          }}
        >
          {props.product.soldOut ? "Sold Out" : "Best Seller"}
        </Box>
      )}

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          "&:hover img": {
            opacity: 1,
            animation: "flash 1.5s", // Apply the flash animation on hover
          },
          "@keyframes flash": {
            "0%": {
              opacity: 0.4,
            },
            "100%": {
              opacity: 1,
            },
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          className="cardMedia"
          component="img"
          sx={{
            transition: "100ms ease-in-out", // Apply transition
          }}
          // image={`${imageUrl}products/${props.product.images[0]}`}
          image={`${imageUrl}products/${props.product.images[imageIndex]}`}
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
      {/* <Box
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
      </Box> */}
    </Card>
  );
};

export default ProductCard;

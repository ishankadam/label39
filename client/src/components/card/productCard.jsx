import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import React from "react";
import "./../../css/productCard.css";
import { imageUrl } from "../../api";
import { addCommaToPrice, getCurrencySymbol } from "../../common";

const ProductCard = (props) => {
  const [imageIndex, setImageIndex] = useState(0); // Initial image index is 0

  const handleMouseEnter = () => {
    setImageIndex(1); // Change image to index 1 on hover
  };

  const handleMouseLeave = () => {
    setImageIndex(0); // Change image back to index 0 when hover ends
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
          {getCurrencySymbol(props.country)}.{" "}
          {addCommaToPrice(props.product.price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

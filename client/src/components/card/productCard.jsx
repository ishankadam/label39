import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { imageUrl } from "../../api";
import {
  addCommaToPrice,
  calculatePriceAfterDiscount,
  getCurrencySymbol,
} from "../../common";
import "./../../css/productCard.css";

const ProductCard = (props) => {
  const [imageIndex, setImageIndex] = useState(0); // Initial image index is 0

  const handleMouseEnter = () => {
    setImageIndex(1); // Change image to index 1 on hover
  };

  const handleMouseLeave = () => {
    setImageIndex(0); // Change image back to index 0 when hover ends
  };

  const isSaleActive = props.product.sale && props.product.sale.isActive;

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
            // background: props.product.soldOut ? "#405468" : "#db5858",
            background: props.product.soldOut ? "#56728f" : "#fff",
            // color: props.product.soldOut ? "#fff" : "#fff",
            color: props.product.soldOut ? "#fff" : "#2F3E4E",

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
            objectPosition: "top",
          }}
          // image={`${imageUrl}products/${props.product.images[0]}`}
          image={`${imageUrl}products/${props.product.images[imageIndex]}`}
          alt={props.product.label}
        />
      </Box>

      <CardContent
        sx={{
          padding: { xs: "10px", sm: "10px 12px", md: "10px 16px" },
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          sx={{
            // mt: props.product.sale?.isActive ? 0 : 2,
            marginTop: isSaleActive
              ? 0
              : { xs: "12px", sm: "14px", md: "15px", lg: "16px" },
            textTransform: "uppercase",
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "400",
            fontSize: { xs: "12px", sm: "13px", md: "15px" },
            whiteSpace: "nowrap", // Ensures text stays on a single line
            overflow: "hidden", // Hides overflow text
            textOverflow: "ellipsis", // Adds "..." when text overflows
            width: "100%", // Ensure it takes the full width
            // display: "-webkit-box",
            // WebkitBoxOrient: "vertical",
            // WebkitLineClamp: 2,
            // overflow: "hidden",
            // textOverflow: "ellipsis",
          }}
        >
          {props.asSeenOn && props.product.asSeenOn
            ? `${props.product.asSeenOn} in ${props.product.name}`
            : props.product.name}
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{
            fontSize: { xs: "12px", sm: "13px", md: "15px" },
            // fontFamily: "'Poppins', sans-serif",
            fontFamily: "'Roboto Serif', serif",
            color: "#a16149",
          }}
        >
          <span style={{ fontWeight: "600", color: "#a16149" }}>
            {getCurrencySymbol(props.country)}{" "}
            {props.product.sale && props.product.sale.isActive
              ? calculatePriceAfterDiscount(
                  props.product.price,
                  props.product.sale.discountType,
                  props.product.sale.discountValue
                )
              : addCommaToPrice(props.product.price)}
          </span>
          <br />
          {props.product.sale && props.product.sale.isActive && (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  marginLeft: "8px",
                  color: "#989898",
                  fontSize: { xs: "12px", sm: "13px", md: "15px" },
                  fontFamily: "'Roboto Serif', serif",
                }}
              >
                {getCurrencySymbol(props.country)}{" "}
                {addCommaToPrice(props.product.price)}
              </span>
              <span
                style={{
                  marginLeft: "8px",
                  color: "#989898",
                  fontSize: { xs: "12px", sm: "13px", md: "15px" },
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "500",
                }}
              >
                {`(${props.product.sale.discountValue}${
                  props.product.sale.discountType === "Percentage"
                    ? "%"
                    : getCurrencySymbol(props.country)
                } off)`}
              </span>
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

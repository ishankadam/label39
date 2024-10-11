import { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import "./../../css/productCard.css";

const ProductCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="product-card"
      sx={{
        maxWidth: 350,
        borderRadius: "5px",
        border: "none !important",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px !important",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardMedia
        component="img"
        height="500"
        image={isHovered ? props.product.hoverImgSrc : props.product.imgSrc} // Change image on hover
        alt={props.product.label}
      />
      <CardContent
        sx={{
          padding: "10px 16px !important",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          sx={{
            fontFamily: "'Cinzel', serif",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {props.product.label}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{ fontSize: "16px" }}
        >
          Rs. {props.product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

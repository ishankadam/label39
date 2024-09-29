import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import "./productCard.css";

const ProductCard = (props) => {
  return (
    <Card className="product-card" sx={{ maxWidth: 345, borderRadius: 4 }}>
      <CardMedia
        component="img"
        height="500"
        image={props.product.imgSrc} // Replace with the correct path or imported image
        alt="Sapphire Applique Kurta Set"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" align="center">
          {props.product.label}
        </Typography>
        <Typography variant="h6" color="textSecondary" align="center">
          Rs. {props.product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

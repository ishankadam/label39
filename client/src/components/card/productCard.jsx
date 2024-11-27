import { useState } from "react";
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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";

const ProductCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);

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
      {(props.product.soldOut || props.product.bestSeller) && (
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
          className={`cardMedia ${props.product.soldOut ? "grayscale" : ""}`}
          component="img"
          sx={{
            height: { xs: "280px", sm: "350px", md: "500px" },
            transition: "transform 300ms ease-in-out",
          }}
          image={props.product.imgSrc}
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
          {props.product.label}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{
            fontSize: { xs: "10px", sm: "11px", md: "14px" },
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Rs. {props.product.price}
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
        <IconButton variant="outlined" color="custom">
          <ShoppingCartOutlinedIcon />
        </IconButton>

        <Button
          // className="btn-buy"
          variant="outlined"
          color="custom"
          // size="small"
        >
          {/* <IconButton
            color="inherit"
            sx={{
              padding: "0px 4px !important",
            }}
          >
            <BoltIcon
              sx={{
                color: "#fff",
                fontSize: { xs: "13px", sm: "14px", md: "1px", lg: "18px" },
              }}
            />
          </IconButton> */}
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;

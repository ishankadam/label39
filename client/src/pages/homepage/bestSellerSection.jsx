import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import ProductCard from "../../components/card/productCard";
import { NextArrow, PrevArrow } from "../../components/arrow-component"; // Update the import path as needed
import "../../css/main.css";
import { bestSellers } from "../../common";

const BestSellerSection = (props) => {
  const [bestsellers, setBestsellers] = useState(props.bestsellers || []);

  useEffect(() => {
    setBestsellers(props.bestsellers);
  }, [props.bestsellers]);

  // Slick Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for laptops
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1440, // Small laptop (or adjust this value as needed)
        settings: {
          slidesToShow: 4, // Show 3 cards on small laptops
          slidesToScroll: 1,
          arrows: true, // Hide arrows on small laptops
        },
      },
      {
        breakpoint: 1024, // Tablet and below
        settings: {
          slidesToShow: 3, // Show 3 cards on tablets
          slidesToScroll: 1,
          arrows: true, // Hide arrows on tablets
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 2, // Show 2 cards on mobile
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile
        },
      },
    ],
  };

  return (
    <Box sx={{ marginTop: { xs: "20px", sm: "28px", md: "36px" } }}>
      <Typography
        sx={{
          fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
          color: "#2f3e4e",
          textAlign: "center",
          mb: 1,
          fontFamily: "'cinzel', serif",
          fontWeight: "500",
        }}
      >
        best sellers
        <div
          className="title-border"
          style={{
            width: "70px",
            height: "3px",
            borderRadius: "100px",
            backgroundColor: "#2f3e4e",
            margin: "0 auto",
          }}
        />
      </Typography>
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "90%", md: "90%", lg: "90%" },
          margin: "20px auto",
          padding: { xs: "0", sm: "0 10px", md: "0 10px", lg: "0 10px" },
        }}
      >
        <Slider {...settings}>
          {bestsellers.map((product, index) => (
            <div key={index}>
              <ProductCard
                product={product}
                handleViewProduct={props.handleViewProduct}
                country={props.country}
              />
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default BestSellerSection;

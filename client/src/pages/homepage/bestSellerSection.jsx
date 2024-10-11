import React from "react";
import { Typography } from "@mui/material";
import Slider from "react-slick";
import ProductCard from "../../components/card/productCard";
import { NextArrow, PrevArrow } from "../../components/arrow-component"; // Update the import path as needed
import "../../css/main.css";
import { bestSellers } from "../../common";

const BestSellerSection = () => {
  // Slick Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for laptops
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom prev arrow
    responsive: [
      {
        breakpoint: 1024, // Tablet and below
        settings: {
          slidesToShow: 3, // Show 3 cards on tablets
          slidesToScroll: 1,
          arrows: false, // Hide arrows on tablets
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1, // Show 1 card on mobile
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile
        },
      },
    ],
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 1,
          mt: 4,
          fontFamily: "'cinzel', serif",
          fontWeight: "600",
        }}
      >
        Best Sellers
        <div className="title-border" />
      </Typography>
      <div className="slider-wrapper">
        <Slider {...settings}>
          {bestSellers.map((product, index) => (
            <div key={index}>
              <ProductCard
                product={product}
                sx={{ maxHeight: "400px !important" }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <hr
        className="footer-line"
        style={{ marginTop: "24px", borderTop: "1px solid #d6d6d6 !important" }}
      />
    </>
  );
};

export default BestSellerSection;

import React from "react";
import bestSeller1 from "../../assets/bestSellerP1.jpg";
import bestSeller2 from "../../assets/bestSellerP2.jpg";
import bestSeller3 from "../../assets/bestSellerP3.jpg";
import bestSeller4 from "../../assets/bestSellerP4.jpg";
import bestSeller5 from "../../assets/bestSellerP5.jpg";
import bestSeller5hover from "../../assets/bestseller5-hover.JPG";
import bestSeller6 from "../../assets/bestSellerP6.jpg";
import bestSeller6Hover from "../../assets/bestseller6-hover.jpeg";

import { Typography } from "@mui/material";
import Slider from "react-slick";
import ProductCard from "../../components/card/productCard";
import { NextArrow, PrevArrow } from "../../components/arrow-component"; // Update the import path as needed
import "../../css/main.css";
import { bestSellers } from "../../common";

const BestSellerSection = () => {
  const bestSellers = [
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller5,
      hoverImgSrc: bestSeller5hover,
      price: 9999,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller6,
      hoverImgSrc: bestSeller6Hover,
      price: 9999,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller3,
      price: 9999,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller4,
      price: 9999,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller1,
      price: 9999,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller3,
      price: 9999,
    },
  ];

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
          slidesToShow: 2, // Show 1 card on mobile
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
          color: "#2f3e4e",
          textAlign: "center",
          mb: 4,
          mt: 4,
          fontFamily: "'cinzel', serif",
          fontWeight: "600",
        }}
      >
        best sellers
        <div
          className="title-border"
          style={{
            width: "80px",
            height: "3.5px",
            borderRadius: "100px",
            backgroundColor: "#2f3e4e",
            margin: "0 auto",
          }}
        />
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

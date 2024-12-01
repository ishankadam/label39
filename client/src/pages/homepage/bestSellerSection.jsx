import React, { useEffect, useState } from "react";
import bestSeller1 from "../../assets/bestSellerP1.jpg";
import bestSeller2 from "../../assets/bestSellerP2.jpg";
import bestSeller3 from "../../assets/bestSellerP3.jpg";
import bestSeller4 from "../../assets/bestSellerP4.jpg";
import bestSeller5 from "../../assets/bestSellerP5.jpg";
import bestSeller5hover from "../../assets/bestseller5-hover.JPG";
import bestSeller6 from "../../assets/bestSellerP6.jpg";
import bestSeller6Hover from "../../assets/bestseller6-hover.jpeg";

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

  // const bestSellers = [
  //   {
  //     name: "Sapphire Applique Kurta Set",
  //     images: ["Cord10.jpg"],
  //     hoverImgSrc: bestSeller5hover,
  //     price: 9999,
  //   },
  //   {
  //     name: "Sapphire Applique Kurta Set",
  //     images: ["Cord61.jpg"],
  //     hoverImgSrc: bestSeller6Hover,
  //     price: 9999,
  //   },
  //   {
  //     name: "Sapphire Applique Kurta Set",
  //     images: ["Cord21.jpg"],
  //     price: 9999,
  //   },
  //   {
  //     name: "Sapphire Applique Kurta Set",
  //     images: ["Cord31.jpg"],
  //     price: 9999,
  //   },
  //   {
  //     name: "Sapphire Applique Kurta Set",
  //     images: ["Cord41.jpg"],
  //     price: 9999,
  //   },
  //   {
  //     name: "Sapphire Applique Kurta Set",
  //     images: ["Cord51.jpg"],
  //     price: 9999,
  //   },
  // ];

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
    <Box sx={{ marginTop: { xs: "20px", sm: "28px", md: "36px" } }}>
      <Typography
        variant="h4"
        sx={{
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
      <div className="slider-wrapper">
        <Slider {...settings}>
          {bestsellers.map((product, index) => (
            <div key={index}>
              <ProductCard
                product={product}
                sx={{ maxHeight: "400px !important" }}
                handleViewProduct={props.handleViewProduct}
                country={props.country}
              />
            </div>
          ))}
        </Slider>
      </div>
      <hr
        className="footer-line"
        style={{ marginTop: "24px", borderTop: "1px solid #d6d6d6 !important" }}
      />
    </Box>
  );
};

export default BestSellerSection;

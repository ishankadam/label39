import React, { useState } from "react";
import heroImage from "../../assets/hero.jpg";
import heroImage2 from "../../assets/hero2.jpg";
import heroImage3 from "../../assets/hero3.jpg";
import heroImage4 from "../../assets/hero4.jpg";
import { Card, CardMedia, Button, Typography, Box } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import "./../../css/mainCarousel.css";

const MainCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    fade: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <Box className="hero-section">
      <Slider {...settings}>
        <Box className="carousel-item">
          <img src={heroImage} width="100%" alt="hero-image" />
          <Box
            style={{ textAlign: "left" }}
            className={`carousel-text left ${
              currentSlide === 0 ? "animate" : ""
            }`}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "14px", sm: "18px", md: "32px" },
                fontWeight: "bold",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ready to ship
            </Typography>
            {/* <Button
              variant="outlined"
              sx={{
                color: "white",
                fontFamily: "'Cinzel', serif",
                fontWeight: "800",
                padding: "10px 20px",
                borderRadius: "2px",
                borderColor: "white",
                "&:hover": {
                  color: "#a16149",
                  background: "white",
                  borderColor: "white",
                },
              }}
            >
              SHOP NOW
            </Button> */}
          </Box>
        </Box>
        <Box className="carousel-item">
          <img src={heroImage2} width="100%" alt="hero-image" />
          <Box
            style={{ textAlign: "right" }}
            className={`carousel-text right ${
              currentSlide === 1 ? "animate" : ""
            }`}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "14px", sm: "18px", md: "32px" },
                fontWeight: "bold",
                fontFamily: "'Cinzel', serif",
              }}
            >
              new arrival
            </Typography>
            {/* <Button
              variant="outlined"
              sx={{
                color: "white",
                fontFamily: "'Cinzel', serif",
                fontWeight: "800",
                padding: "10px 20px",
                borderRadius: "2px",
                borderColor: "white",
                "&:hover": {
                  color: "#a16149",
                  background: "white",
                  borderColor: "white",
                },
              }}
            >
              SHOP NOW
            </Button> */}
          </Box>
        </Box>
        <Box className="carousel-item">
          <img src={heroImage3} width="100%" alt="hero-image" />
          <Box
            style={{ textAlign: "left" }}
            className={`carousel-text left ${
              currentSlide === 2 ? "animate" : ""
            }`}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "14px", sm: "18px", md: "32px" },
                fontWeight: "bold",
                fontFamily: "'Cinzel', serif",
              }}
            >
              best seller
            </Typography>
            {/* <Button
              variant="outlined"
              sx={{
                color: "white",
                fontFamily: "'Cinzel', serif",
                fontWeight: "800",
                padding: "10px 20px",
                borderRadius: "2px",
                borderColor: "white",
                "&:hover": {
                  color: "#a16149",
                  background: "white",
                  borderColor: "white",
                },
              }}
            >
              SHOP NOW
            </Button> */}
          </Box>
        </Box>
        <Box className="carousel-item">
          <img src={heroImage4} width="100%" alt="hero-image" />
          <Box
            style={{ textAlign: "right" }}
            className={`carousel-text right ${
              currentSlide === 3 ? "animate" : ""
            }`}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "14px", sm: "18px", md: "32px" },
                fontWeight: "bold",
                fontFamily: "'Cinzel', serif",
              }}
            >
              exclusive offer
            </Typography>
            {/* <Button
              variant="outlined"
              sx={{
                color: "white",
                fontFamily: "'Cinzel', serif",
                fontWeight: "800",
                padding: "10px 20px",
                borderRadius: "2px",
                borderColor: "white",
                "&:hover": {
                  color: "#a16149",
                  background: "white",
                  borderColor: "white",
                },
              }}
            >
              SHOP NOW
            </Button> */}
          </Box>
        </Box>
      </Slider>
    </Box>
  );
};

export default MainCarousel;

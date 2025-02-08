import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../../css/mainCarousel.css";

import heroImage1 from "../../assets/cover1.jpg";
import heroImage2 from "../../assets/cover2.jpg";
import heroImage3 from "../../assets/cover3.jpg";
import heroImage4 from "../../assets/cover4.jpg";
import heroImage5 from "../../assets/cover5.jpg";
import heroImage6 from "../../assets/cover6.jpg";

const images = [
  { src: heroImage1, text: "ready to ship", align: "left" },
  { src: heroImage2, text: "new arrival", align: "right" },
  { src: heroImage3, text: "best seller", align: "left" },
  { src: heroImage4, text: "exclusive offer", align: "right" },
  { src: heroImage5, text: "limited edition", align: "left" },
  { src: heroImage6, text: "trending now", align: "right" },
];

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
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <Box className="hero-section">
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} className="carousel-item">
            <img src={image.src} width="100%" alt={`hero-image-${index}`} />
            <Box
              style={{ textAlign: image.align }}
              className={`carousel-text ${image.align} ${
                currentSlide === index ? "animate" : ""
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
                {image.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MainCarousel;

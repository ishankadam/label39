import React from "react";
import heroImage from "../../assets/hero.jpg";
import heroImage2 from "../../assets/hero2.jpg";
import heroImage3 from "../../assets/hero3.jpg";
import heroImage4 from "../../assets/hero4.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick"; // Import Slider from react-slick
import "./../../css/mainCarousel.css"; // Import your custom CSS if needed

const MainCarousel = () => {
  // Settings for the carousel
  const settings = {
    dots: true, // Enable dots
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 2500, // Set the speed for autoplay
    vertical: false, // Keep horizontal behavior
    responsive: [
      {
        breakpoint: 768, // Tablet and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false, // Keep images vertical
          verticalSwiping: true,
        },
      },
      {
        breakpoint: 769, // Laptop and above
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false, // Horizontal on tablet and laptop
          verticalSwiping: false,
        },
      },
    ],
  };

  return (
    <div className="hero-section">
      <Slider {...settings}>
        <div className="carousel-item">
          <img src={heroImage} width="100%" alt="hero-image" />
        </div>
        <div className="carousel-item">
          <img src={heroImage2} width="100%" alt="hero-image" />
        </div>
        <div className="carousel-item">
          <img src={heroImage3} width="100%" alt="hero-image" />
        </div>
        <div className="carousel-item">
          <img src={heroImage4} width="100%" alt="hero-image" />
        </div>
      </Slider>
    </div>
  );
};

export default MainCarousel;

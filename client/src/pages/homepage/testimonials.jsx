import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import testimonials1 from "../../assets/bestseller1.jpeg";
import testimonials2 from "../../assets/bestseller2.jpeg"; // Add another image
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import "./testimonials.css";

const slides = [
  {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    author: "Anthony Bahringer",
    rating: 5,
    imgSrc: testimonials1,
  },
  {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    author: "Jane Doe",
    rating: 4,
    imgSrc: testimonials2,
  },
  {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    author: "Jane Doe",
    rating: 4,
    imgSrc: testimonials2,
  },
  {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    author: "Anthony Bahringer",
    rating: 5,
    imgSrc: testimonials1,
  },

  // Add more slides here
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? Math.max(slides.length - 2, 0) : prevSlide - 2
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide >= slides.length - 2 ? 0 : prevSlide + 2
    );
  };

  const renderStars = (rating, elIndex) => {
    return Array.from({ length: rating }, (_, index) => (
      <StarRateRoundedIcon
        key={index}
        color={elIndex % 2 === 0 ? "light-background" : "dark-background"}
      />
    ));
  };

  return (
    <div>
      <Box>
        <Typography variant="h4" align="center">
          What Our Customers Say
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {slides.slice(currentSlide, currentSlide + 2).map((slide, index) => (
            <Card
              key={index}
              className={`testimonials-container ${
                index % 2 === 0 ? "light-background" : "dark-background"
              }`}
              sx={{ margin: 1 }} // Add some margin between cards
            >
              <CardContent className="testimonials-wrapper">
                <div className="testimonial-content">
                  <Box display="flex" alignItems="center">
                    {renderStars(slide.rating, index)}{" "}
                    {/* Render stars based on rating */}
                  </Box>
                  <Typography variant="body1">{slide.content}</Typography>
                  <Typography variant="subtitle2" sx={{ fontStyle: "italic" }}>
                    {slide.author}
                  </Typography>
                </div>
                <CardMedia
                  component="img"
                  height="500"
                  image={slide.imgSrc}
                  alt={`slide-${currentSlide + index}`}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <NavigateBeforeOutlinedIcon
            onClick={handlePrevSlide}
            sx={{
              cursor: currentSlide === 0 ? "not-allowed" : "pointer",
              opacity: currentSlide === 0 ? 0.5 : 1,
            }}
          />
          <NavigateNextOutlinedIcon
            onClick={handleNextSlide}
            sx={{
              cursor:
                currentSlide >= slides.length - 2 ? "not-allowed" : "pointer",
              opacity: currentSlide >= slides.length - 2 ? 0.5 : 1,
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Testimonials;

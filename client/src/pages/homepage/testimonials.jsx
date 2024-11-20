import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import testimonials1 from "../../assets/bestseller1.jpeg";
import testimonials2 from "../../assets/bestseller2.jpeg"; // Add another image
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import "./../../css/testimonials.css";

const slides = [
  {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book unchanged.",
    author: "- Anthony Bahringer",
    rating: 5,
    imgSrc: testimonials1,
  },
  {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book unchanged.",
    author: "- Jane Doe",
    rating: 4,
    imgSrc: testimonials2,
  },
  {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book unchanged.",
    author: "- Jane Doe",
    rating: 4,
    imgSrc: testimonials2,
  },
  {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book unchanged.",
    author: "- Anthony Bahringer",
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

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <StarRateRoundedIcon key={index} />
    ));
  };

  return (
    <div>
      <Box>
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
          what our customers say
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
                <Box className="testimonial-content" display="flex">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center" // Vertically center the left content
                    alignItems="flex-start" // Align the items to the left
                    sx={{ flex: 1, paddingRight: 2 }} // Add spacing on the right side
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ margin: "0 15px" }}
                    >
                      {renderStars(slide.rating)}{" "}
                      {/* Render stars based on rating */}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Roboto Serif', serif",
                        fontWeight: "600 !important",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        margin: "15px",
                        color: "#111111",
                      }}
                    >
                      {slide.content}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontStyle: "italic",
                        fontFamily: "'Roboto Serif', serif",
                        fontWeight: "600",
                        margin: "0 15px",
                        color: "#494949",
                      }}
                    >
                      {slide.author}
                    </Typography>
                  </Box>
                  <CardMedia
                    component="img"
                    height="400"
                    image={slide.imgSrc}
                    alt={`slide-${currentSlide + index}`}
                    sx={{
                      flex: 1,
                      padding: 0,
                      display: { xs: "none", sm: "block" },
                    }} // Remove padding from the image side
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <NavigateBeforeOutlinedIcon
            onClick={handlePrevSlide}
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              padding: "5px",
              cursor: currentSlide === 0 ? "not-allowed" : "pointer",
              margin: "10px",
              // opacity: currentSlide === 0 ? 0.5 : 1,
            }}
          />
          <NavigateNextOutlinedIcon
            onClick={handleNextSlide}
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              padding: "5px",
              cursor:
                currentSlide >= slides.length - 2 ? "not-allowed" : "pointer",
              margin: "10px",

              // opacity: currentSlide >= slides.length - 2 ? 0.5 : 1,
            }}
          />
        </Box>
      </Box>

      <hr
        className="footer-line"
        style={{ marginTop: "24px", borderTop: "1px solid #d6d6d6 !important" }}
      />
    </div>
  );
};

export default Testimonials;

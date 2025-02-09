import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { imageUrl } from "../../api";

const Testimonials = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState(props.testimonials || []);

  useEffect(() => {
    setTestimonials(props.testimonials);
  }, [props.testimonials]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? Math.max(testimonials.length - 2, 0) : prevSlide - 2
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide >= testimonials.length - 2 ? 0 : prevSlide + 2
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <StarRateRoundedIcon key={index} />
    ));
  };
  return (
    <Box sx={{ mt: { xs: "20px", sm: "28px", md: "36px" }, mb: 1 }}>
      <Typography
        sx={{
          color: "#2f3e4e",
          textAlign: "center",
          mb: 1,
          fontFamily: "'Cinzel', serif",
          fontWeight: 500,
          fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
        }}
      >
        what our customers say
        <Box
          sx={{
            width: "70px",
            height: "3px",
            borderRadius: "100px",
            backgroundColor: "#2f3e4e",
            mx: "auto",
            mt: 1,
          }}
        />
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ margin: "20px auto" }}
      >
        {/* Previous Arrow */}
        <NavigateBeforeOutlinedIcon
          onClick={handlePrevSlide}
          sx={{
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "#f0f0f0" },
            padding: "10px",
            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
            margin: { xs: "0 5px", sm: "0 10px", md: "0 15px" },
            fontSize: "36px",
          }}
        />

        {/* Cards Container */}
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            width: "100%",
            gap: 2, // Add spacing between cards
            maxWidth: "100%", // Adjust as needed
          }}
        >
          {testimonials
            .slice(currentSlide, currentSlide + 2)
            .map((slide, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", sm: "row", md: "row" },
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  borderRadius: "4px",
                  width: { xs: "100%", sm: "90%", md: "50%" },
                  height: {
                    xs: "270px",
                    sm: "340px",
                    md: "420px",
                    lg: "400px",
                  },
                  backgroundColor: index % 2 === 0 ? "#F2F5F9" : "#F7ECE9",
                }}
              >
                {/* Left Section: Image */}
                <CardMedia
                  component="img"
                  image={`${imageUrl}testimonials/${slide.image}`}
                  alt={`slide-${currentSlide + index}`}
                  sx={{
                    // background: "#fff",
                    paddingLeft: { xs: "0", sm: "0", md: "0" },
                    width: { xs: "40%", sm: "40%", md: "40%" },
                    objectFit: { xs: "stretch", sm: "cover", md: "cover" },
                    // height: "400px",
                  }}
                />

                {/* Right Section: Text */}
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingBottom: { xs: "10px !important", sm: 2, md: 3 },
                    padding: { xs: "10px", sm: 2, md: 3 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      verticalAlign: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: { xs: 1, sm: 2 },
                        color:
                          index % 2 === 0
                            ? "#2F3E4E !important"
                            : "#2F3E4E !important",
                      }}
                    >
                      {renderStars(slide.rating)}
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "'Roboto Serif', serif",
                        fontWeight: 500,
                        fontSize: {
                          xs: "11px",
                          sm: "14px",
                          md: "14px",
                          lg: "16px",
                        },
                        mb: { xs: 1, sm: 2 },
                        color:
                          index % 2 === 0
                            ? "#2F3E4E !important"
                            : "#2F3E4E !important",
                      }}
                    >
                      {slide.comments}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                          md: "14px",
                          lg: "15px",
                        },
                        fontStyle: "italic",
                        fontFamily: "'Roboto Serif', serif",
                        fontWeight: 600,
                        color:
                          index % 2 === 0
                            ? "#2F3E4E !important"
                            : "#2F3E4E !important",
                      }}
                    >
                      {slide.name}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Grid>

        {/* Next Arrow */}
        <NavigateNextOutlinedIcon
          onClick={handleNextSlide}
          sx={{
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "#f0f0f0" },
            padding: "10px",
            cursor:
              currentSlide >= testimonials.length - 2
                ? "not-allowed"
                : "pointer",
            margin: { xs: "0 5px", sm: "0 10px", md: "0 15px" },
            fontSize: "36px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Testimonials;

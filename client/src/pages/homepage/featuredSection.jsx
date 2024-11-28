import React from "react";
import Slider from "react-slick";
import { Card, CardMedia, Button, Typography, Box } from "@mui/material";
import video1 from "../../assets/video1.MOV";
import video2 from "../../assets/video2.mov";
import "./../../css/categorySection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedSection = () => {
  const featured = [
    { label: "NEW ARRIVAL", videoSrc: video1 },
    { label: "READY TO SHIP", videoSrc: video2 },
    { label: "AS SEEN ON", videoSrc: video1 },
    { label: "AS SEEN ON", videoSrc: video1 },
    { label: "AS SEEN ON", videoSrc: video1 },
    { label: "AS SEEN ON", videoSrc: video1 },
  ];

  // Slick settings for responsive slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // 5 cards on laptop
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3, // 3 cards on tablet
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1, // 1 card on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        background: "#F7ECE9",
        paddingTop: { xs: "20px", sm: "28px", md: "36px" },
      }}
    >
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
        shop by videos
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
          // maxWidth: "1200px",
          margin: "20px auto",
          overflow: "hidden", // Hide overflow
        }}
      >
        <Slider {...settings}>
          {featured.map((item, index) => (
            <Box key={index}>
              <Card
                sx={{
                  position: "relative",
                  margin: { xs: "0 16px", sm: "0 10px", md: "0 16px" },
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="video"
                  src={item.videoSrc}
                  autoPlay
                  loop
                  muted
                  sx={{
                    height: {
                      xs: "550px",
                      sm: "auto",
                      md: "500px",
                      lg: "550px",
                    },
                    width: "100%",
                    objectFit: "cover",
                  }} // Ensure video fills the card
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "70px",
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
                    // "linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 63%, rgba(0, 0, 0, 0) 86%)",
                    borderImage: "initial",
                    boxShadow: "rgb(0, 0, 0) 0px 0px 0px",
                    color: "white",
                    padding: { xs: "6px", sm: "6px", md: "10px", lg: "10px" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", sm: "13px", md: "16px" },
                      fontFamily: "'Cinzel', serif", // Ensure the font is applied here
                      fontWeight: { xs: "700", sm: "600", md: "700" },
                    }}
                  >
                    {item.label}
                  </Typography>
                  {/* <Button
                    variant="contained"
                    // color="white"
                    sx={{
                      background: "#c4907c",
                      fontFamily: "'Cinzel', serif",
                      fontWeight: "700",
                      padding: "10px 14px",
                      borderRadius: "2px",
                      "&:hover": {
                        color: "white",
                        background: "#c4907c",
                        borderColor: "#c4907c",
                      },
                    }}
                  >
                    SHOP NOW
                  </Button> */}
                  <Button
                    variant="outlined"
                    // color="white"
                    sx={{
                      // background: "#c4907c",
                      color: "white",
                      fontFamily: "'Cinzel', serif",
                      fontWeight: { xs: "700", sm: "600", md: "700" },
                      fontSize: { xs: "14px", sm: "13px", md: "16px" },
                      padding: { xs: "6px" },
                      borderRadius: "2px",
                      borderColor: "white",
                      "&:hover": {
                        color: "white",
                        background: "#a16149",
                        borderColor: "#a16149",
                      },
                    }}
                  >
                    SHOP NOW
                  </Button>{" "}
                </Box>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      <hr className="footer-line" style={{ marginTop: "24px" }} />
    </Box>
  );
};

export default FeaturedSection;

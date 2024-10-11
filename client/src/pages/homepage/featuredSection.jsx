import React from "react";
import Slider from "react-slick";
import { Card, CardMedia, Button, Typography } from "@mui/material";
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
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          mt: 4,
          fontFamily: "'Cinzel', serif",
          fontWeight: "600",
        }}
      >
        SHOP BY VIDEOS
        <div className="title-border" />
      </Typography>

      <div
        style={{
          // maxWidth: "1200px",
          margin: "0 auto",
          overflow: "hidden", // Hide overflow
        }}
      >
        <Slider {...settings}>
          {featured.map((item, index) => (
            <div key={index}>
              <Card
                sx={{
                  position: "relative",
                  margin: "0 20px",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="video"
                  src={item.videoSrc}
                  autoPlay
                  loop
                  muted
                  sx={{ height: "auto", width: "100%" }} // Ensure video fills the card
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Cinzel', serif", // Ensure the font is applied here
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Button variant="contained" color="success">
                    SHOP NOW
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      <hr className="footer-line" style={{ marginTop: "24px" }} />
    </>
  );
};

export default FeaturedSection;

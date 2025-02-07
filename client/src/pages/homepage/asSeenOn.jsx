import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { imageUrl } from "../../api";
import { NextArrow, PrevArrow } from "../../components/arrow-component"; // Update the import path as needed
import "./../../css/asSeenOn.css";

const AsSeenOn = (props) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [showProductInfo, setShowProductInfo] = useState(false); // For mobile hover effect
  const [products, setProducts] = useState(props.shopByVideos || []);

  useEffect(() => {
    if (props.shopByVideos.length > 0) {
      setProducts(props.shopByVideos);
    }
  }, [props.shopByVideos]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // 5 cards on laptop
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1440, // Big laptops (1440px and below)
        settings: {
          slidesToShow: 4, // Show 4 cards on big laptops
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 1024, // Small laptops and tablets
        settings: {
          slidesToShow: 3, // Show 3 cards on small laptops
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

  // Render only if products array has data
  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px", // Adjust height as needed
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "#F7ECE9",
        paddingTop: { xs: "20px", sm: "28px", md: "36px" },
        pb: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
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
          maxWidth: { xs: "75%", sm: "90%", md: "90%", lg: "90%" },
          margin: "20px auto",
          padding: { xs: "0 10px", sm: "0 10px", md: "0 10px", lg: "0 10px" },
        }}
      >
        <Slider {...settings}>
          {products.map((item, index) => {
            return (
              <Box key={index}>
                <Card
                  sx={{
                    position: "relative",
                    margin: { xs: "0 5px", sm: "0 10px", md: "0 16px" },
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component={"video"}
                    src={`${imageUrl}products/${item.videoSrc}`}
                    autoPlay
                    loop
                    muted
                    sx={{
                      height: {
                        xs: "450px",
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
                      width: "100%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
                      // "linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 63%, rgba(0, 0, 0, 0) 86%)",
                      borderImage: "initial",
                      boxShadow: "rgb(0, 0, 0) 0px 0px 0px",
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 7,
                        fontSize: { xs: "13px", sm: "14px", md: "15px" },
                        fontFamily: "'Cinzel', serif", // Ensure the font is applied here
                        fontWeight: { xs: "700", sm: "600", md: "700" },
                      }}
                    >
                      {item.name}
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
                        flex: 3,
                        minWidth: "80px",
                        width: "80px",
                        // background: "#c4907c",
                        color: "white",
                        fontFamily: "'Cinzel', serif",
                        fontWeight: { xs: "700", sm: "600", md: "700" },
                        fontSize: { xs: "14px", sm: "14px", md: "16px" },
                        padding: "6px",
                        marginLeft: "10px",
                        borderRadius: "2px",
                        borderColor: "white",
                        "&:hover": {
                          color: "white",
                          background: "#a16149",
                          borderColor: "#a16149",
                        },
                      }}
                      onClick={() => {
                        props.handleViewProduct(item);
                      }}
                    >
                      shop
                    </Button>{" "}
                  </Box>
                </Card>
              </Box>
            );
          })}
        </Slider>
      </Box>

      {/* <hr className="footer-line" style={{ marginTop: "24px" }} /> */}
    </Box>
  );
};

export default AsSeenOn;

import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { imageUrl } from "../../api";
import { NextArrow, PrevArrow } from "../../components/arrow-component"; // Update the import path as needed
import "./../../css/categorySection.css";

const FeaturedSection = (props) => {
  const [celebrityStyles, setCelebrityStyles] = useState([]);

  useEffect(() => {
    setCelebrityStyles(props.celebrityStyles);
  }, [props.celebrityStyles]);

  // const featured = [
  //   { label: "NEW ARRIVAL", videoSrc: video1 },
  //   { label: "READY TO SHIP", videoSrc: video2 },
  //   { label: "AS SEEN ON", videoSrc: video1 },
  //   { label: "AS SEEN ON", videoSrc: video1 },
  //   { label: "AS SEEN ON", videoSrc: video1 },
  //   { label: "AS SEEN ON", videoSrc: video1 },
  // ];

  // Slick settings for responsive slider
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
        celebrity style
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
          // overflow: "hidden", // Hide overflow
        }}
      >
        <Slider {...settings}>
          {celebrityStyles.map((item, index) => {
            return (
              <Box key={index}>
                {/* <Card
                    sx={{
                      position: "relative",
                      margin: { xs: "0 5px", sm: "0 10px", md: "0 16px" },
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component={item.videoSrc ? "video" : "img"}
                      src={
                        item.videoSrc
                          ? `${imageUrl}${item.videoSrc}`
                          : `${imageUrl}celebrityStyles/${item.image[0]}`
                      }
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
                        objectFit: "contain",
                      }} 
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        background:
                          "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
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
                          fontSize: { xs: "14px", sm: "13px", md: "16px" },
                          fontFamily: "'Cinzel', serif", // Ensure the font is applied here
                          fontWeight: { xs: "700", sm: "600", md: "700" },
                        }}
                      >
                        {item.name ? `As seen on ${item.name}` : ""}
                      </Typography>
                  
                      <Button
                        variant="outlined"
                        sx={{
                          flex: 3,
                          minWidth: "80px",
                          width: "80px",
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
                          props.handleViewProduct(item.productDetails[0]);
                        }}
                      >
                        shop
                      </Button>{" "}
                    </Box>
                  </Card> */}

                <Card
                  sx={{
                    position: "relative",
                    margin: { xs: "0 5px", sm: "0 10px", md: "0 16px" },
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${imageUrl}celebrityStyles/${item.image[0]})`, // Use the same image
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    // filter: "blur(20px)", // Blur effect
                  }}
                >
                  {/* Blurred Background Layer */}
                  {/* <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${imageUrl}celebrityStyles/${item.image[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(15px)", // Apply blur
                      zIndex: 1,
                    }}
                  /> */}

                  <CardMedia
                    component={item.videoSrc ? "video" : "img"}
                    src={
                      item.videoSrc
                        ? `${imageUrl}${item.videoSrc}`
                        : `${imageUrl}celebrityStyles/${item.image[0]}`
                    }
                    autoPlay
                    loop
                    muted
                    sx={{
                      objectPosition: "top",

                      // position: "relative",
                      // zIndex: 2,
                      height: {
                        xs: "450px",
                        sm: "420px",
                        md: "500px",
                        lg: "550px",
                      },
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
                      borderImage: "initial",
                      boxShadow: "rgb(0, 0, 0) 0px 0px 0px",
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 1,
                      zIndex: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 7,
                        fontSize: { xs: "13px", sm: "14px", md: "15px" },
                        fontFamily: "'Cinzel', serif", // Ensure the font is applied here
                        fontWeight: { xs: "700", sm: "600", md: "700" },
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2, // Restricts to 2 lines
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name
                        ? ` ${item.name} in ${item.productDetails[0].name}`
                        : ""}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        flex: 3,
                        minWidth: "80px",
                        width: "80px",
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
                        props.handleViewProduct(item.productDetails[0]);
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

export default FeaturedSection;

import { Box, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import { useTheme } from "@mui/material/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { getInstagramPosts } from "../../api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../components/arrow-component"; // Update the import path as needed

const InstagramSection = () => {
  const [instagramData, setInstagramData] = useState([]);
  const [instaPosts, setInstaPosts] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    getInstagramPosts({
      setInstagramData: setInstagramData,
      setLoading: () => {},
    });
  }, []);

  useEffect(() => {
    const instagramPostData = instagramData.filter(
      (row) => row.media_type === "IMAGE" || row.media_type === "CAROUSEL_ALBUM"
    );
    setInstaPosts(instagramPostData);
  }, [instagramData]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default for big laptops and desktops (>= 1280px)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // Small laptops
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024, // Tablets landscape
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Tablets portrait
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1,
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
          color: "#2f3e4e",
          textAlign: "center",
          mb: 3,
          fontFamily: "'cinzel', serif",
          fontWeight: "500",
          fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
        }}
      >
        join us on instagram
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
          maxWidth: { xs: "75%", sm: "90%", md: "90%", lg: "94%" },
          margin: "20px auto",
          padding: { xs: "0 10px", sm: "0 10px", md: "0 10px", lg: "0 10px" },
          // overflow: "hidden", // Hide overflow
        }}
      >
        <Slider {...settings}>
          {instaPosts.map((post, index) => (
            <Box
              key={index}
              sx={{
                px: 1,
                position: "relative",
                cursor: "pointer",
                "&:hover .overlay": { opacity: 1 },
                maskImage:
                  "linear-gradient(to right, transparent, #000 10% 90%, transparent)",
              }}
              onClick={() => window.open(post.permalink)}
            >
              <Box
                sx={{
                  border: "1px solid #d6d6d6",
                  position: "relative",
                  paddingTop: "100%",

                  // width: { xs: 200, md: 250 },
                  // height: { xs: 200, md: 250 },
                  borderRadius: 1,
                  overflow: "hidden",

                  "&:hover": {
                    boxShadow: 6, // Increase shadow on hover
                    transition: "box-shadow 0.3s ease-in-out",
                  },
                }}
              >
                <img
                  src={post.media_url}
                  alt={`Instagram post ${index + 1}`}
                  style={{
                    objectPosition: "top",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    color: "white",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      // padding: "10px",
                      fontFamily: "'cinzel', serif",
                      color: "white",
                      textAlign: "center",
                      fontSize: {
                        xs: "15px",
                        sm: "15px",
                        md: "15px",
                        lg: "16px",
                      },
                    }}
                  >
                    {post.caption?.substring(0, 100)}...
                  </Typography>
                  <Typography variant="body1" className="overlay-date">
                    {post.date}
                  </Typography>
                  {/* <Typography variant="body2" sx={{ paddingTop: "5px" }}>
                    {{post.date?.substring(0, 10)}}
                  </Typography> */}
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          href="https://www.instagram.com/thelabel39/"
          variant="contained"
          color="custom"
          sx={{ width: "120px", borderRadius: "20px" }}
        >
          JOIN US
        </Button>
      </Box>

      <Box
        sx={{
          mt: 4,
          borderTop: "1px solid #d6d6d6",
          width: "90%",
          mx: "auto",
        }}
      />
    </Box>
  );
};

export default InstagramSection;

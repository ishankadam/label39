import React, { useState } from "react";
import ProductCard from "../../components/card/productCard";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import video1 from "../../assets/video1.MOV";
import video2 from "../../assets/video2.mov";
import bestSeller1 from "../../assets/bestseller1.jpeg";
import bestSeller3 from "../../assets/bestseller3.jpeg";
import "./../../css/asSeenOn.css";
import { Box, Button, IconButton, Typography } from "@mui/material";
import as_seen_on_hoverImg from "../../assets/as_seen_on_hover.jpeg";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const AsSeenOn = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [showProductInfo, setShowProductInfo] = useState(false); // For mobile hover effect

  const handleSlideChange = (next) => {
    setSlideNumber((prev) => {
      if (next) {
        return prev === asSeenOn.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? asSeenOn.length - 1 : prev - 1;
      }
    });
  };

  const asSeenOn = [
    {
      name: "Sapphire Applique Kurta Set",
      images: ["Cord71.jpg"],
      price: 9999,
      videoSrc: video2,
      hoverImgSrc: as_seen_on_hoverImg,
    },
    {
      name: "Sapphire Applique Kurta Set",
      images: ["Cord71.jpg"],
      price: 9999,
      videoSrc: video1,
    },
  ];

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
        as seen on
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
      <div className="seenon-container">
        <NavigateBeforeOutlinedIcon
          onClick={() => handleSlideChange(false)}
          sx={{
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            padding: "5px",
          }}
        />
        <div className="seenon-video-wrapper">
          <video
            key={asSeenOn[slideNumber].videoSrc}
            autoPlay
            muted
            loop
            className="centered-video"
          >
            <source src={asSeenOn[slideNumber].videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          className={`seenon-image-wrapper ${
            showProductInfo ? "show-product" : ""
          }`}
          onMouseEnter={() => setShowProductInfo(true)}
          onMouseLeave={() => setShowProductInfo(false)}
        >
          <ProductCard product={asSeenOn[slideNumber]} />
          <Button variant="contained" color="custom" className="product-button">
            View This Product
          </Button>
        </div>
        <NavigateNextOutlinedIcon
          onClick={() => handleSlideChange(true)}
          sx={{
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            padding: "5px",
          }}
        />
      </div>
      <hr
        className="footer-line"
        style={{ marginTop: "24px", borderTop: "1px solid #d6d6d6 !important" }}
      />
    </Box>
  );
};

export default AsSeenOn;

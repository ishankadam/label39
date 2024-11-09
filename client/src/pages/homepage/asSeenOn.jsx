import React, { useState } from "react";
import ProductCard from "../../components/card/productCard";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import video1 from "../../assets/video1.MOV";
import video2 from "../../assets/video2.mov";
import bestSeller1 from "../../assets/bestseller1.jpeg";
import bestSeller3 from "../../assets/bestseller3.jpeg";
import "./../../css/asSeenOn.css";
import { Button, Typography } from "@mui/material";
import as_seen_on_hoverImg from "../../assets/as_seen_on_hover.jpeg";

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
      label: "Sapphire Applique Kurta Set",
      imgSrc: [bestSeller1],
      price: 9999,
      videoSrc: video2,
      hoverImgSrc: as_seen_on_hoverImg,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: [bestSeller3],
      price: 9999,
      videoSrc: video1,
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          mt: 4,
          fontFamily: "'cinzel', serif",
          fontWeight: "600",
        }}
      >
        AS SEEN ON
        <div className="title-border" />
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
          <Button
            variant="contained"
            color="success"
            className="product-button"
          >
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
    </>
  );
};

export default AsSeenOn;

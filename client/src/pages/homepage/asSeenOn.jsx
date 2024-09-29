import React, { useState } from "react";
import ProductCard from "../../components/card/productCard";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import video1 from "../../assets/video1.MOV";
import video2 from "../../assets/video2.mov";
import bestSeller1 from "../../assets/bestseller1.jpeg";
import bestSeller3 from "../../assets/bestseller3.jpeg";
import "./asSeenOn.css";
import { Button, Typography } from "@mui/material";

const AsSeenOn = () => {
  const [slideNumber, setSlideNumber] = useState(0);

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
      imgSrc: bestSeller1,
      price: 9999,
      videoSrc: video2,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller3,
      price: 9999,
      videoSrc: video1,
    },
  ];

  return (
    <>
      <Typography variant="h4">AS SEEN ON</Typography>
      <div className="seenon-container">
        <NavigateBeforeOutlinedIcon onClick={() => handleSlideChange(false)} />
        <div className="seenon-video-wrapper">
          <video
            key={asSeenOn[slideNumber].videoSrc}
            width="500"
            autoPlay
            muted
            loop
            className="centered-video"
          >
            <source src={asSeenOn[slideNumber].videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="seenon-image-wrapper">
          <ProductCard product={asSeenOn[slideNumber]} />
          <Button variant="contained" color="success">
            View This Product
          </Button>
        </div>
        <NavigateNextOutlinedIcon onClick={() => handleSlideChange(true)} />
      </div>
    </>
  );
};

export default AsSeenOn;

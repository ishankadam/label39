import { Button, Typography } from "@mui/material";
import React from "react";
import video1 from "../../assets/video1.MOV";
import video2 from "../../assets/video2.mov";
import "./featuredSection.css";

const FeaturedSection = () => {
  const featured = [
    {
      label: "NEW ARRIVAL",
      videoSrc: video1,
    },
    {
      label: "READY TO SHIP",
      videoSrc: video2,
    },
    {
      label: "AS SEEN ON",
      videoSrc: video1,
    },
  ];
  return (
    <>
      {" "}
      <Typography variant="h4" sx={{ justifyContent: "center" }}>
        FEATURED
      </Typography>
      <div className="featured-container">
        {featured.map((item, index) => {
          return (
            <div className="video-container" key={`featured=${index}`}>
              {/* <img
                src={category.imgSrc}
                alt="Example"
                className="centered-image"
              /> */}
              <video width="500" autoPlay muted loop className="centered-video">
                <source src={item.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="label-button-wrapper">
                <Typography>{item.label}</Typography>
                <Button variant="contained" color="success">
                  SHOP
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FeaturedSection;

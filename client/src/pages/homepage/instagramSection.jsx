import { Typography } from "@mui/material";
import React from "react";
import "./Slider.css"; // Assuming you have the relevant CSS file here
import bestSeller1 from "../../assets/bestseller1.jpeg"; // Importing images
import bestSeller2 from "../../assets/bestseller2.jpeg"; // Importing images
import bestSeller3 from "../../assets/bestseller3.jpeg"; // Importing images
import bestSeller4 from "../../assets/bestseller4.jpeg"; // Importing images
import bestSeller5 from "../../assets/bestseller5.JPG"; // Importing images
import bestSeller6 from "../../assets/bestseller6.jpeg"; // Importing images

const InstagramSection = () => {
  const images = [
    {
      src: bestSeller1,
      date: "2024-10-01",
      text: "Hand-painted sunflowers art meets fashion, creating the perfect harmony.",
    },
    {
      src: bestSeller2,
      date: "2024-10-02",
      text: "Hand-painted sunflowers art meets fashion, creating the perfect harmony.",
    },
    {
      src: bestSeller3,
      date: "2024-10-03",
      text: "Hand-painted sunflowers art meets fashion, creating the perfect harmony.",
    },
    {
      src: bestSeller4,
      date: "2024-10-04",
      text: "Ut labore et dolore magna aliqua",
    },
    { src: bestSeller5, date: "2024-10-05", text: "Ut enim ad minim veniam" },
    {
      src: bestSeller6,
      date: "2024-10-06",
      text: "Quis nostrud exercitation ullamco",
    },
  ]; // Array of images with texts and dates

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          color: "#2f3e4e",
          textAlign: "center",
          mb: 1,
          mt: 4,
          fontFamily: "'cinzel', serif",
          fontWeight: "600",
        }}
      >
        join us on instagram
        <div
          className="title-border"
          style={{
            width: "80px",
            height: "3.5px",
            borderRadius: "100px",
            backgroundColor: "#2f3e4e",
            margin: "0 auto",
          }}
        />
      </Typography>
      <main className="slider-main">
        <div
          className="slider"
          reverse="true"
          style={{
            "--width": "300px",
            "--height": "300px",
            "--quantity": images.length,
          }}
        >
          <div className="list">
            {images.map((image, index) => (
              <div
                className="item"
                key={index}
                style={{ "--position": index + 1 }}
              >
                <img
                  src={image.src}
                  alt={`Slide ${index + 1}`}
                  className="slider-img"
                />
                <div className="overlay">
                  <Typography variant="h6" className="overlay-text">
                    {image.text}
                  </Typography>
                  <Typography variant="body1" className="overlay-date">
                    {image.date}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <hr
        className="footer-line"
        style={{ marginTop: "24px", borderTop: "1px solid #d6d6d6 !important" }}
      />
    </div>
  );
};

export default InstagramSection;

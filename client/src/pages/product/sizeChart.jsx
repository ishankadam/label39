import React, { useState } from "react";
import { Box, Typography, Button, Dialog } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage1 from "../../assets/cover1.jpg";
import heroImage2 from "../../assets/cover2.jpg";

const SizeChart = () => {
  // State to manage the dialog open/close
  const [sizeChartOpen, setSizeChartOpen] = useState(true); // Open by default for testing

  // Sample Size Chart Images (Replace with actual URLs)
  const sizeChartImages = [{ src: heroImage1 }, { src: heroImage2 }];

  // Slick Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Dialog open={sizeChartOpen} onClose={() => setSizeChartOpen(false)}>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" mb={2}>
          Size Chart
        </Typography>

        {/* Image Carousel */}
        <Slider {...sliderSettings}>
          {sizeChartImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Size Chart ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "400px",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </Slider>

        <Button
          onClick={() => setSizeChartOpen(false)}
          sx={{ mt: 2, display: "block", mx: "auto" }}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default SizeChart;

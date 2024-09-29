import { Button, Typography } from "@mui/material";
import React from "react";
import shirt from "../../assets/SHIRTS.png";
import coords from "../../assets/COORDS.png";
import suits from "../../assets/SUITS.png";
import festive from "../../assets/FESTIVE.png";
import "./categorySection.css";

const CategorySection = () => {
  const categories = [
    {
      label: "SHIRTS",
      imgSrc: shirt,
    },
    {
      label: "CO-ORDS",
      imgSrc: coords,
    },
    {
      label: "SUITS",
      imgSrc: suits,
    },
    {
      label: "FESTIVE",
      imgSrc: festive,
    },
  ];

  return (
    <>
      <Typography variant="h4" sx={{ justifyContent: "center" }}>
        CATEGORIES
      </Typography>
      <div className="categories-container">
        {categories.map((category) => {
          return (
            <div className="image-container">
              <img
                src={category.imgSrc}
                alt="Example"
                className="centered-image"
              />
              <Button
                variant="contained"
                color="primary"
                className="centered-button"
              >
                {category.label}
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategorySection;

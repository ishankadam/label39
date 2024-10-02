import { Button, Typography } from "@mui/material";
import React from "react";

import "./categorySection.css";
import { categories } from "../../common";

const CategorySection = () => {
  return (
    <>
      <Typography variant="h4" sx={{ justifyContent: "center" }}>
        CATEGORIES
      </Typography>
      <div className="categories-container">
        {categories.map((category, index) => {
          return (
            <div className="image-container" key={`categories=${index}`}>
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

import {
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Pagination,
} from "@mui/material";
import React from "react";

import "./../../css/categorySection.css";
import { categories } from "../../common";

const CategorySection = () => {
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
        CATEGORIES
        <div className="title-border" />
      </Typography>

      <Grid2
        container
        spacing={2}
        sx={{
          // padding: "10px",
          borderRadius: "5px",
        }}
      >
        {categories.map((category) => (
          <Grid2 item size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                margin: "20px",
                textAlign: "center",
                borderRadius: "3px",
                position: "relative",
                boxShadow: "none",
                border: "1px solid rgb(173, 173, 173)",
              }}
            >
              <CardMedia
                component="img"
                image={category.imgSrc}
                alt={category.label}
                sx={{ objectFit: "cover" }}
              />
              {/* Glassy Dark Overlay */}

              <Button
                className="category-btn"
                sx={{
                  width: {
                    xs: "120px", // Small screen
                    sm: "140px", // Tablet
                    md: "150px", // Desktop
                  },
                  fontSize: {
                    xs: "14px", // Small screen
                    sm: "16px", // Tablet
                    md: "18px", // Desktop
                  },
                  fontWeight: "700",
                  fontFamily: "'Cinzel', serif",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  padding: "10px !important",
                  borderRadius: "5px",
                  background: "#FAFDFF",
                  color: "#212121",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow on hover

                  // border: "1px solid #d6d6d6",
                  transition: "0.2s ease", // Smooth transition for hover effect
                  "&:hover": {
                    backgroundColor: "#FAFDFF", // Background color on hover
                    color: "#121212", // Text color on hover
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow on hover
                    transform: "translate(-50%, -50%) scale(1.1)", // Slightly scale the button on hover
                  },
                }}
              >
                {category.label}
              </Button>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <hr className="footer-line" />
    </>
  );
};

export default CategorySection;

import {
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import React from "react";

import "./../../css/categorySection.css";
import { categories } from "../../common";

const CategorySection = () => {
  return (
    <Box sx={{ marginTop: { xs: "20px", sm: "28px", md: "36px" } }}>
      <Typography
        sx={{
          fontSize: { xs: "26px", sm: "28px", md: "32px", lg: "34px" },
          color: "#2f3e4e",
          textAlign: "center",
          mb: 1,
          fontFamily: "'cinzel', serif",
          fontWeight: "500",
        }}
      >
        categories
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

      <Grid2
        container
        // spacing={2}
        sx={{
          // padding: "10px",
          borderRadius: "5px",
        }}
      >
        {categories.map((category) => (
          <Grid2 size={{ xs: 6, sm: 6, md: 3 }} key={category.label}>
            <Box sx={{ margin: "8px" }}>
              <Card
                sx={{
                  margin: "4px",
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
                  sx={{
                    objectFit: "cover",
                    height: {
                      xs: "350px",
                      sm: "460px",
                      md: "500px ",
                      lg: "550px",
                    },
                  }}
                />
                {/* Glassy Dark Overlay */}

                <Button
                  className="category-btn"
                  sx={{
                    width: {
                      xs: "150px", // Small screen
                      sm: "220px", // Desktop
                      md: "250px", // Desktop
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
                    padding: "10px 0px !important",
                    borderRadius: "2px",
                    background: "#FAFDFF",
                    color: "#a16149",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow on hover

                    // border: "1px solid #d6d6d6",
                    transition: "0.2s ease", // Smooth transition for hover effect
                    "&:hover": {
                      backgroundColor: "#FAFDFF",
                      color: "#a16149",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      transform: "translate(-50%, -50%) scale(1.1)",
                    },
                  }}
                >
                  {category.label}
                </Button>
              </Card>
            </Box>
          </Grid2>
        ))}
      </Grid2>

      {/* <hr className="footer-line" /> */}
    </Box>
  );
};

export default CategorySection;

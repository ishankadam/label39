import React from "react";
import { colors, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const NextArrow = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        width: "30px",
        height: "30px",
        top: "50%",
        right: "-40px", // Adjust spacing as needed
        transform: "translateY(-50%)",
        zIndex: 1,
        borderRadius: "50%", // Rounded button
        backgroundColor: "white", // Background color
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)", // Shadow for depth
        "&:hover": {
          backgroundColor: "#f0f0f0", // Change on hover
        },
      }}
    >
      <ArrowForwardIosIcon
        sx={{ fontSize: "16px", paddingLeft: "5px", color: "#494949" }}
      />
    </IconButton>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        width: "30px",
        height: "30px",
        top: "50%",
        left: "-40px", // Adjust spacing as needed
        transform: "translateY(-50%)",
        zIndex: 1,
        borderRadius: "50%", // Rounded button
        backgroundColor: "white", // Background color
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)", // Shadow for depth
        "&:hover": {
          backgroundColor: "#f0f0f0", // Change on hover
        },
      }}
    >
      <ArrowBackIosIcon
        sx={{ fontSize: "16px", paddingLeft: "5px", color: "#494949" }}
      />
    </IconButton>
  );
};

export { NextArrow, PrevArrow };

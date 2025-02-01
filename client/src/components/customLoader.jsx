import React from "react";
import Box from "@mui/material/Box";
import gifSrc from "../assets/cart-loader-transparent.gif";

const CustomLoader = ({ size = 100 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height
      }}
    >
      <img src={gifSrc} alt="Loading..." width={size} height={size} />
    </Box>
  );
};

export default CustomLoader;

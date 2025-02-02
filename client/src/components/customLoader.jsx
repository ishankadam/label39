import Box from "@mui/material/Box";
import React from "react";
import gifSrc from "../assets/cart-loader-transparent.gif";

const CustomLoader = ({ size = 100 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh", // Full screen height
        top: 0,
        left: "50%",
      }}
    >
      <img src={gifSrc} alt="Loading..." width={size} height={size} />
    </Box>
  );
};

export default CustomLoader;

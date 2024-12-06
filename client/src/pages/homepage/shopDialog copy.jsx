import * as React from "react";
import { Typography, Box, Button } from "@mui/material";
import shopImage from "../../assets/SHIRTS.png";
import { useShopContext } from "../../context/shopContext";

const ShopDialog = ({ onMouseEnter, onMouseLeave }) => {
  const { openShopMenu } = useShopContext();

  return openShopMenu ? (
    <Box
      sx={{
        position: "absolute",
        // top: "15%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#2f3e4e",
              mb: 1,
              fontFamily: "'Cinzel', serif",
              fontWeight: "600",
            }}
          >
            CATEGORIES
          </Typography>
          <Button sx={{ textAlign: "left", width: "100%" }}>SHIRTS</Button>
          <Button sx={{ textAlign: "left", width: "100%" }}>CO-ORD SETS</Button>
          <Button sx={{ textAlign: "left", width: "100%" }}>SUITS</Button>
          <Button sx={{ textAlign: "left", width: "100%" }}>FESTIVE</Button>
        </Box>

        <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#2f3e4e",
              mb: 1,
              fontFamily: "'Cinzel', serif",
              fontWeight: "600",
            }}
          >
            FEATURED
          </Typography>
          <Button sx={{ textAlign: "left", width: "100%" }}>NEW ARRIVAL</Button>
          <Button sx={{ textAlign: "left", width: "100%" }}>
            AS SEEN ON - CELEBRITY STYLE
          </Button>
          <Button sx={{ textAlign: "left", width: "100%" }}>
            CLIENTS DAIRY
          </Button>
          <Button sx={{ textAlign: "left", width: "100%" }}>KURTA SETS</Button>
          <Button sx={{ textAlign: "left", width: "100%" }}>
            BEST SELLERS
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            height: "200px",
          }}
        >
          <img
            src={shopImage}
            alt="Example"
            sx={{
              maxWidth: "100%", // Ensure the image does not exceed the container width
              height: "auto", // Maintain aspect ratio
            }}
          />
        </Box>
      </Box>
    </Box>
  ) : null;
};

export default ShopDialog;

import * as React from "react";
import { Typography, Box, Button } from "@mui/material";
import shopImage from "../../assets/SHIRTS.png";
import { useSelector } from "react-redux";

const ShopDialog = ({ onMouseEnter, onMouseLeave }) => {
  const openShopMenu = useSelector((state) => state.cart.openShopMenu);

  if (!openShopMenu) return null;

  return (
    <Box
      sx={{
        position: "absolute",
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
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            CO-ORD SETS
          </Button>
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            KURTAS
          </Button>
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            SHIRTS AND DRESSES
          </Button>
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            FESTIVE
          </Button>
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
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            NEW ARRIVAL
          </Button>
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            BEST SELLERS
          </Button>
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            Ready to ship
          </Button>
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            AS SEEN ON - CELEBRITY STYLE
          </Button>
          <Button sx={{ textAlign: "left", width: "100%", color: "#677489" }}>
            CLIENTS DAIRY
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
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ShopDialog;

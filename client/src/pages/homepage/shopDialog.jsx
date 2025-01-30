import * as React from "react";
import { Typography, Box, Button } from "@mui/material";
import shopImage from "../../assets/SHIRTS.png";

const ShopDialog = () => {
  return (
    <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 1 }}>
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
          {[
            "NEW ARRIVAL",
            "BEST SELLERS",
            "Ready to ship",
            "AS SEEN ON - CELEBRITY STYLE",
            "CLIENTS DAIRY",
          ].map((feature) => (
            <Button
              key={feature}
              sx={{ textAlign: "left", width: "100%", color: "#677489" }}
            >
              {feature}
            </Button>
          ))}
        </Box>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            height: "200px",
            width: "200px",
          }}
        >
          <img
            src={shopImage}
            alt="Shop Preview"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box> */}
      </Box>
    </Box>
  );
};

export default ShopDialog;

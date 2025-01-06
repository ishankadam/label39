import React, { useEffect, useState } from "react";
import ProductCard from "../../components/card/productCard";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import video1 from "../../assets/video1.MOV";
import video2 from "../../assets/video2.mov";
import "./../../css/asSeenOn.css";
import {
  Box,
  Button,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import as_seen_on_hoverImg from "../../assets/as_seen_on_hover.jpeg";
import { imageUrl } from "../../api";

const AsSeenOn = (props) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [showProductInfo, setShowProductInfo] = useState(false); // For mobile hover effect
  const [products, setProducts] = useState(props.asSeenOn || []);

  useEffect(() => {
    if (props.asSeenOn.length > 0) {
      setProducts(props.asSeenOn);
    }
  }, [props.asSeenOn]);

  const handleSlideChange = (next) => {
    setSlideNumber((prev) => {
      if (next) {
        return prev === products.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? products.length - 1 : prev - 1;
      }
    });
  };

  const asSeenOn = [
    {
      name: "Prachi with Sapphire Applique Kurta Set",
      images: ["Cord71.jpg"],
      price: 9999,
      videoSrc: video2,
      hoverImgSrc: as_seen_on_hoverImg,
    },
    {
      name: "Sapphire Applique Kurta Set",
      images: ["Cord71.jpg"],
      price: 9999,
      videoSrc: video1,
    },
  ];
  // Render only if products array has data
  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px", // Adjust height as needed
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "#F7ECE9",
        pt: { xs: "20px", sm: "28px", md: "36px" },
        pb: "20px",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
          color: "#2f3e4e",
          textAlign: "center",
          mb: 1,
          fontFamily: "'Cinzel', serif",
          fontWeight: "500",
        }}
      >
        Shop by video
        <Box
          sx={{
            width: "70px",
            height: "3px",
            borderRadius: "100px",
            backgroundColor: "#2f3e4e",
            mx: "auto",
            mt: "8px",
          }}
        />
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: "10px", sm: "20px" },
          flexDirection: { xs: "row", sm: "row" },
          width: "auto",
          mx: "10px",
          mt: "16px",

          // height: { xs: "auto", md: "600px" },
        }}
      >
        <IconButton
          onClick={() => handleSlideChange(false)}
          sx={{
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "#f0f0f0" },
            p: "5px",
          }}
        >
          <NavigateBeforeOutlinedIcon />
        </IconButton>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" }, // Hide on mobile, show on larger screens
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: { sm: "500px", md: "550px ", lg: "600px" },
            width: { sm: "auto" },
            overflow: "hidden",
          }}
        >
          <video
            key={products[slideNumber].videoSrc}
            autoPlay
            muted
            loop
            style={{
              borderRadius: "5px",
              maxHeight: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          >
            <source
              src={`${imageUrl}${products[slideNumber].videoSrc}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            // mt: { xs: "20px", sm: 0 },
            width: { xs: "270px", sm: "300px", md: "350px" },
          }}
        >
          <ProductCard
            product={products[slideNumber]}
            asSeenOn={true}
            country={props.country}
          />
          <Button
            variant="contained"
            color="custom"
            className="product-button"
            sx={{
              fontFamily: "'Roboto Serif', serif",
              fontWeight: 600,
            }}
            onClick={() => props.handleViewProduct(products[slideNumber])}
          >
            View This Product
          </Button>
        </Box>

        <IconButton
          onClick={() => handleSlideChange(true)}
          sx={{
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "#f0f0f0" },
            p: "5px",
          }}
        >
          <NavigateNextOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AsSeenOn;

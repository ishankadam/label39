import { Box, Button, Card, CardActions, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { imageUrl } from "../../api";

function ClientDiaryCard({ diary, setShowModal }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (diary.image.length > 1) {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % diary.image.length
          );
          setFadeIn(true);
        }, 500); // Wait for fade out before changing image
      }, 2000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [diary.image]);

  return (
    <Box>
      <Card
        sx={{
          borderRadius: "2px",
          boxShadow: "none",
          position: "relative",
          overflow: "hidden",

          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={`${imageUrl}clientDiaries/${diary.image[currentImageIndex]}`}
          alt={diary.name || ""}
          sx={{
            height: { xs: "320px", sm: "360px", md: "480px", lg: "500px" },
            objectFit: "cover",
            width: "100%",
            objectPosition: "top", // Add this property
          }}
        />
        {/* <CardActions
          sx={{
            mt: "auto",
            justifyContent: "space-between",
            padding: "16px 0",
          }}
        ></CardActions> */}
      </Card>
      <Button
        color="custom"
        variant="outlined"
        sx={{
          width: "100%", // Full width
          marginTop: 1, // Add space between card and button
          //   fontFamily: "'Cinzel', serif",
          //   fontWeight: { xs: "700", sm: "600", md: "700" },
          //   fontSize: { xs: "14px", sm: "14px", md: "16px" },
          padding: "10px",
          borderRadius: "2px",
        }}
        onClick={() => {
          setShowModal({
            open: true,
            data: diary.productDetails[0],
          });
        }}
      >
        View Product
      </Button>
    </Box>
  );
}

export default ClientDiaryCard;

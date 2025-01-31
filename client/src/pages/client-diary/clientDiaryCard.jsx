import { Button, Card, CardActions, CardMedia } from "@mui/material";
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
    <Card
      sx={{
        bgcolor: "#FFF8F5",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "none",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        image={`${imageUrl}clientDiaries/${diary.image[currentImageIndex]}`}
        alt={diary.name || ""}
        sx={{
          height: "auto",
          objectFit: "cover",
          transition: "opacity 0.5s ease-in-out",
          opacity: fadeIn ? 1 : 0.5,
        }}
      />
      <CardActions
        sx={{
          mt: "auto",
          justifyContent: "space-between",
          padding: "16px 0",
        }}
      >
        <Button
          color="custom"
          variant="outlined"
          sx={{
            flex: 1,
            borderColor: "#A16149",
            color: "#A16149",
            "&:hover": {
              backgroundColor: "#A16149",
              color: "white",
              borderColor: "#A16149",
            },
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
      </CardActions>
    </Card>
  );
}

export default ClientDiaryCard;

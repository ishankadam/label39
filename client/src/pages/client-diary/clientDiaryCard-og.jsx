import React, { useState, useEffect } from "react";
import { Button, Card, CardMedia, CardActions } from "@mui/material";

import { imageUrl } from "../../api";

const ClientDiaryCard = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // const imageArray = Array.isArray(imageUrl) ? imageUrl : [imageUrl];

  // useEffect(() => {
  //   if (imageArray.length > 1) {
  //     const interval = setInterval(() => {
  //       setFadeIn(false);
  //       setTimeout(() => {
  //         setCurrentImageIndex(
  //           (prevIndex) => (prevIndex + 1) % imageArray.length
  //         );
  //         setFadeIn(true);
  //       }, 500); // Wait for fade out before changing image
  //     }, 3000); // Change image every 3 seconds

  //     return () => clearInterval(interval);
  //   }
  // }, [imageArray]);

  // const currentImage =
  //   imageArray[currentImageIndex] || "/placeholder.svg?height=200&width=300";

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
        image={`${imageUrl}clientDiaries/${props.clientDiary.image[0]}`}
        alt={props.clientDiary.name}
        sx={{
          height: "100%",
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
            props.setShowModal({
              open: true,
              data: props.clientDiary.productDetails[0],
            });
          }}
        >
          View Product
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClientDiaryCard;

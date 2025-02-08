import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { imageUrl } from "../../api";

function CelebrityStyleCard({ celebrityDiary, setShowModal }) {
  return (
    // <Card
    //   sx={{
    //     bgcolor: "#FFF8F5",
    //     display: "flex",
    //     flexDirection: "column",
    //     height: "100%",
    //     boxShadow: "none",
    //     borderRadius: "2px",
    //     overflow: "hidden",
    //   }}
    // >
    //   <CardMedia
    //     component="img"
    //     image={`${imageUrl}celebrityStyles/${celebrityDiary.image[currentImageIndex]}`}
    //     alt={celebrityDiary.name || ""}
    //     sx={{
    //       background: "red",
    //       height: { xs: "320px", sm: "350px", md: "450px", lg: "500px" },
    //       objectFit: "cover",
    //       transition: "opacity 0.5s ease-in-out",
    //       opacity: fadeIn ? 1 : 0.5,
    //     }}
    //   />

    //   <CardActions
    //     sx={{
    //       mt: "auto",
    //       justifyContent: "space-between",
    //       padding: "16px 0",
    //     }}
    //   >
    //     <Button
    //       color="custom"
    //       variant="outlined"
    //       sx={{
    //         flex: 1,
    //         borderColor: "#A16149",
    //         color: "#A16149",
    //         "&:hover": {
    //           backgroundColor: "#A16149",
    //           color: "white",
    //           borderColor: "#A16149",
    //         },
    //       }}
    //       onClick={() => {
    //         setShowModal({
    //           open: true,
    //           data: celebrityDiary.productDetails[0],
    //         });
    //       }}
    //     >
    //       View Product
    //     </Button>
    //   </CardActions>
    // </Card>

    <Box>
      {/* Card with Blurred Background */}
      <Card
        sx={{
          borderRadius: "2px",
          boxShadow: "none",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      >
        {/* Main Image */}
        <CardMedia
          component="img"
          image={`${imageUrl}celebrityStyles/${celebrityDiary.image[0]}`}
          sx={{
            height: { xs: "320px", sm: "360px", md: "480px", lg: "520px" },
            width: "100%",
            objectFit: "cover",
            objectPosition: "top", // Add this property
          }}
        />

        {/* Bottom Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
            zIndex: 3,
          }}
        >
          <Typography
            sx={{
              flex: 7,
              fontSize: { xs: "13px", sm: "13px", md: "16px" },
              fontFamily: "'Cinzel', serif",
              fontWeight: { xs: "700", sm: "600", md: "700" },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "uppercase",
            }}
          >
            {celebrityDiary.name
              ? ` ${celebrityDiary.name} in ${celebrityDiary.productDetails[0].name}`
              : ""}
          </Typography>
        </Box>
      </Card>

      {/* Button Outside the Card */}
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
            data: celebrityDiary.productDetails[0],
          });
        }}
      >
        view product
      </Button>
    </Box>
  );
}

export default CelebrityStyleCard;

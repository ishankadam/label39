import React from "react";
import { Button, Card, CardMedia, CardActions } from "@mui/material";
import { imageUrl } from "../../api";

const ClientDiaryCard = (props) => {
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
        }}
      />
      <CardActions
        sx={{
          mt: "auto",
          justifyContent: "space-between",
          padding: "16px 0",
          //   gap: 2,
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
        {/* <Button
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
        >
          More Details
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default ClientDiaryCard;

import React from "react";
import { Fab } from "@mui/material";
import { WhatsApp as WhatsAppIcon } from "@mui/icons-material";

const WhatsAppButton = ({ phoneNumber, message = "" }) => {
  const handleClick = () => {
    // Format the phone number (remove any non-digit characters)
    const formattedNumber = phoneNumber.replace(/\D/g, "");

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Fab
      color="primary"
      aria-label="whatsapp"
      onClick={handleClick}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366", // WhatsApp green color
        "&:hover": {
          backgroundColor: "#128C7E", // Darker shade for hover
        },
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatsAppButton;

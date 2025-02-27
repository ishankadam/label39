import React from "react";
import { Fab, Tooltip } from "@mui/material";
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
    <Tooltip
      title="Contact us on WhatsApp"
      arrow
      placement="left"
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            bgcolor: "white",
            color: "#000",
            fontFamily: "'Roboto Serif', serif",
            padding: "12px 16px",
            margin: "5px", // Add margin
            fontSize: "14px", // Set font size
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Nice box shadow
          },
          "& .MuiTooltip-arrow": {
            color: "white", // Match arrow color to tooltip background
          },
        },
      }}
    >
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
    </Tooltip>
  );
};

export default WhatsAppButton;

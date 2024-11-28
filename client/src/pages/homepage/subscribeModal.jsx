import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextfield from "../../components/textfield/customTextfield";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import story from "../../assets/aboutImg.jpeg";

const SubscribeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="subscribe-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 0,
          borderRadius: 2,
          display: "flex", // Flexbox layout for side-by-side arrangement
          overflow: "hidden", // Prevent content overflow
        }}
      >
        {/* Left Side: Image */}
        <Box
          sx={{
            width: "50%", // 50% of the modal for the image
            backgroundImage: `url(${story})`, // Corrected backgroundImage
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>

        {/* Right Side: Content */}
        <Box
          sx={{
            width: "50%", // 50% of the modal for the content
            p: 4,
            textAlign: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            FIRST TIMER?
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sign up and get 10% off your first order
          </Typography>
          <CustomTextfield
            variant="outlined"
            fullWidth
            placeholder="Enter email here"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2, bgcolor: "#e2d7cc", color: "black" }}
          >
            SUBSCRIBE
          </Button>
          <Typography variant="body2" color="text.secondary">
            Subscribe to our newsletter and be the first to hear about our new
            arrivals, special promotions, and online exclusives.
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}
          >
            <FacebookIcon />
            <InstagramIcon />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubscribeModal;

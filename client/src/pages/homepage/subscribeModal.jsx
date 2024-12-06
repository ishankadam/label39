import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextfield from "../../components/textfield/customTextfield";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import story from "../../assets/aboutImg.jpeg";
import { Padding } from "@mui/icons-material";

const SubscribeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 100);
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
          width: { xs: "300px", sm: "600px", md: "700px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 0,
          borderRadius: "5px",
          border: "none !important",
          display: { xs: "flex", sm: "flex", md: "flex" }, // Flexbox layout for side-by-side arrangement
          overflow: "hidden", // Prevent content overflow
        }}
      >
        {/* Left Side: Image */}
        <Box
          sx={{
            width: { xs: "0", sm: "45%" }, // 50% of the modal for the image
            backgroundImage: `url(${story})`, // Corrected backgroundImage
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>

        {/* Right Side: Content */}
        <Box
          sx={{
            width: { xs: "100%", sm: "55%" }, // 50% of the modal for the content
            p: { xs: 3, sm: 4 },
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
          <Typography
            color="text.secondary"
            variant="subtitle2"
            sx={{
              mb: 1,
              mt: 1,
              fontWeight: "500",
              fontSize: {
                xs: "18px",
                sm: "18px",
                md: "20px",
                lg: "24px",
              },
              fontFamily: "'Cinzel', serif ",
            }}
          >
            FIRST TIMER?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "600",
              fontSize: {
                xs: "20px",
                sm: "20px",
                md: "22px",
                lg: "25px",
              },
              color: "#2F3E4E",
              fontFamily: "'Cinzel', serif ",
            }}
          >
            Sign up and get 10% off your first order
          </Typography>
          <CustomTextfield
            variant="outlined"
            // fullWidth
            placeholder="Enter email here"
            sx={{
              mb: 2,
              width: "100%", // Adjust width as required
              "& .MuiOutlinedInput-root": {
                padding: "0px 2px", // Padding for the input field
              },
            }}
          />
          <Button
            variant="contained"
            color="custom"
            fullWidth
            sx={{ mb: 2, color: "white" }}
          >
            SUBSCRIBE
          </Button>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: "400",
              fontSize: {
                xs: "15px",
                sm: "16px",
                md: "18px",
                lg: "19px",
              },
              fontFamily: "'Roboto Serif', serif ",
            }}
          >
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

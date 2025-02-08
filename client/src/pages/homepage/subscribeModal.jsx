import CloseIcon from "@mui/icons-material/Close";
import { Facebook, Instagram } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSubscription } from "../../api";
import story from "../../assets/aboutImg.jpeg";
import CustomTextfield from "../../components/textfield/customTextfield";
import { showSnackbar } from "../../store/cartSlice";

const SubscribeModal = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(props.open || false);
  const [subscriber, setSubscriber] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const [error, setError] = useState({
    email: "",
    phone: "",
  });

  const handleEdit = (value, field) => {
    setSubscriber((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubscribe = async () => {
    const data = await createSubscription({
      email: subscriber.email,
      phone: subscriber.phone,
    });
    dispatch(
      showSnackbar({
        message: data.message,
        severity: data.severity,
      })
    );
    handleClose();
  };
  const handleClose = () => props.setOpenSubscribeModal(false);

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
            label="Email Address"
            config={{ field: "email", type: "email" }}
            value={subscriber.email}
            handleEdit={handleEdit}
            error={error.email}
            errorObj={error}
            setError={setError}
            helperText={error.email ? "Please enter correct Email" : ""}
          />
          <CustomTextfield
            variant="outlined"
            // fullWidth
            placeholder="Enter Phone number here"
            sx={{
              mb: 2,
              width: "100%", // Adjust width as required
              "& .MuiOutlinedInput-root": {
                padding: "0px 2px", // Padding for the input field
              },
            }}
            label="Phone Number"
            config={{ field: "phone", type: "phone" }}
            value={subscriber.phone}
            handleEdit={handleEdit}
            error={error.phone}
            errorObj={error}
            setError={setError}
            helperText={error.phone ? "Please enter correct Phone Number" : ""}
          />
          <Button
            variant="contained"
            color="custom"
            fullWidth
            sx={{ mb: 2, color: "white" }}
            onClick={handleSubscribe}
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
            <IconButton
              className="findus-icon"
              sx={{
                color: "#1F2020",
                fontSize: "28px",
                // marginRight: "12px",
              }}
              component={Link}
              href="https://www.facebook.com/thelabel39/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook />
            </IconButton>
            <IconButton
              className="findus-icon"
              sx={{
                color: "#1F2020",
                fontSize: "28px",
              }}
              component={Link}
              href="https://www.instagram.com/thelabel39/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubscribeModal;

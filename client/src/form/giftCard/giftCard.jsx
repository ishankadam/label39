import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { createOrder } from "../../api";
import { razorpayId } from "../../pages/payment/paymentPage";
import gift from "../../assets/gift.jpg";
import CloseIcon from "@mui/icons-material/Close";

const GiftCardModal = ({ open, onClose }) => {
  const [amount, setAmount] = useState("");
  const predefinedValues = [500, 1000, 2000, 5000]; // Predefined amounts

  const handleChipClick = (value) => {
    setAmount(value); // Set the selected value in TextField
  };

  const handleChange = (event) => {
    setAmount(event.target.value); // Update amount from TextField
  };

  const handlePay = async () => {
    try {
      // Call createOrder to get the Razorpay order ID
      const { orderId } = await createOrder(amount);

      const options = {
        key: razorpayId, // Replace with your key_id
        amount: amount * 100, // Amount in the smallest currency unit
        currency: "INR",
        name: "The Label 39",
        description: "Payment Description",
        order_id: orderId,
        handler: function (response) {
          alert("Payment Successful!");
          console.log(response);
        },
        prefill: {
          name: "TheLabel39",
          email: "thelabel39@gmail.com",
          contact: "96749 49842",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "350px", sm: "500px", md: "600px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 1,
          borderRadius: "5px",
          border: "none !important",
          display: { xs: "flex", sm: "flex", md: "flex" }, // Flexbox layout for side-by-side arrangement
          overflow: "hidden",
        }}
      >
        {/* Left Side: Image */}
        <Box
          sx={{
            width: { xs: "0", sm: "40%" },
            backgroundImage: `url(${gift})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>

        {/* Right Side: Content */}
        <Box
          sx={{
            width: { xs: "100%", sm: "70%" }, // 50% of the modal for the content
            p: { xs: 3, sm: 4 },
            // textAlign: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
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
            Purchase Gift Card
          </Typography>
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
            Select a predefined amount or enter a custom value.
          </Typography>

          <Stack direction="row" spacing={1} sx={{ my: 2, flexWrap: "wrap" }}>
            {predefinedValues.map((value) => (
              <Chip
                key={value}
                label={`₹${value}`}
                onClick={() => handleChipClick(value)}
                sx={{
                  fontWeight: "600",
                  cursor: "pointer",
                  bgcolor: amount === value ? "#A16149" : "transparent",
                  color: amount === value ? "white" : "#A16149",
                  border: `1px solid #A16149`, // Outline with #A16149
                  "&:hover": {
                    bgcolor: "#A16149",
                    color: "white",
                  },
                }}
              />
            ))}
          </Stack>

          <TextField
            fullWidth
            type="number"
            label="Enter Amount"
            value={amount}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            color="custom"
            onClick={handlePay}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GiftCardModal;

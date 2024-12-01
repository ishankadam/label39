import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { createOrder } from "../../api";
import { razorpayId } from "../../pages/payment/paymentPage";

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
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Purchase Gift Card
        </Typography>
        <Typography variant="body2" gutterBottom>
          Select a predefined amount or enter a custom value.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ my: 2, flexWrap: "wrap" }}>
          {predefinedValues.map((value) => (
            <Chip
              key={value}
              label={`₹${value}`}
              onClick={() => handleChipClick(value)}
              sx={{
                cursor: "pointer",
                bgcolor: amount === value ? "primary.main" : "default",
                color: amount === value ? "white" : "inherit",
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
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handlePay}
        >
          Pay Now
        </Button>
      </Box>
    </Modal>
  );
};

export default GiftCardModal;

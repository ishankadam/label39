import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { createOrder, verifyPayment } from "../../api";
import { razorpayId } from "../../pages/payment/paymentPage";
import gift from "../../assets/giftcard.jpg";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextfield from "../../components/textfield/customTextfield";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeGiftCard } from "../../store/cartSlice";

const GiftCardModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [giftcardDetails, setGiftcardDetails] = useState({
    balance: "",
    email: "",
    phone: "",
  });

  const handleEdit = (value, field) => {
    setGiftcardDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const predefinedValues = [500, 1000, 2000, 5000]; // Predefined amounts

  const handleChipClick = (value) => {
    setGiftcardDetails((prev) => ({
      ...prev,
      balance: value,
    }));
  };

  const handlePay = async () => {
    try {
      // Call createOrder to get the Razorpay order ID
      const { orderId } = await createOrder(giftcardDetails.balance);

      const options = {
        key: razorpayId, // Replace with your key_id
        amount: giftcardDetails.balance * 100, // Amount in the smallest currency unit
        currency: "INR",
        name: "The Label 39",
        description: "Payment Description",
        order_id: orderId,
        handler: async function (response) {
          const result = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            giftCardData: giftcardDetails,
            type: "giftcard",
          });

          if (result.success) {
            onClose();
            alert("Payment Successful");
            navigate("/");
          } else {
            alert("Payment Failed");
          }
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
          width: { xs: "350px", sm: "700px", md: "800px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          // p: 1,
          borderRadius: "5px",
          border: "none !important",
          display: "flex", // Default layout for larger screens
          flexDirection: { xs: "column", sm: "row" },
          overflow: "hidden",
        }}
      >
        {/* Left Side: Image */}
        <Box
          sx={{
            width: { xs: "100%", sm: "45%" }, // Full width on mobile, partial on larger screens
            backgroundImage: `url(${gift})`,
            backgroundSize: "contain",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            borderBottom: "1px solid rgb(234, 229, 229)",
            height: { xs: "200px", sm: "auto" }, // Fixed height for mobile to keep aspect ratio
          }}
        />

        {/* Right Side: Content */}
        <Box
          sx={{
            width: { xs: "100%", sm: "60%" }, // 50% of the modal for the content
            p: { xs: 3, sm: 2 },
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
                xs: "14px",
                sm: "14px",
                md: "14px",
                lg: "14px",
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
                  bgcolor:
                    giftcardDetails.amount === value
                      ? "#A16149"
                      : "transparent",
                  color: giftcardDetails.amount === value ? "white" : "#A16149",
                  border: `1px solid #A16149`, // Outline with #A16149
                  "&:hover": {
                    bgcolor: "#A16149",
                    color: "white",
                  },
                }}
              />
            ))}
          </Stack>

          <CustomTextfield
            fullWidth
            type="number"
            label="Enter Amount"
            config={{ field: "amount" }}
            value={giftcardDetails.balance}
            handleEdit={handleEdit}
            inputProps={{ min: 0 }}
            sx={{ mb: 2, width: "100%" }}
          />

          <CustomTextfield
            fullWidth
            type="email"
            label="Enter Email"
            config={{ field: "email" }}
            value={giftcardDetails.email}
            handleEdit={handleEdit}
            inputProps={{ min: 0 }}
            sx={{ mb: 2, width: "100%" }}
          />

          <CustomTextfield
            fullWidth
            type="phone"
            label="Enter Phone Number"
            config={{ field: "phone" }}
            value={giftcardDetails.phone}
            handleEdit={handleEdit}
            inputProps={{ min: 0 }}
            sx={{ mb: 2, width: "100%" }}
          />

          <Button
            variant="contained"
            fullWidth
            color="custom"
            onClick={handlePay}
          >
            Pay Now
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 2,
              fontWeight: "400",
              fontSize: {
                xs: "14px",
                sm: "14px",
                md: "14px",
                lg: "14px",
              },
              fontFamily: "'Roboto Serif', serif ",
            }}
          >
            Give the gift of choice to your loved ones. Let them pick what they
            love and make them feel like a meadow, full of a million blooms.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default GiftCardModal;

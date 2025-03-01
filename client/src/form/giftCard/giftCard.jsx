import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "../../api";
import gift from "../../assets/giftcard.jpg";
import CustomTextfield from "../../components/textfield/customTextfield";
import { razorpayId } from "../../pages/payment/paymentPage";

const GiftCardModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [giftcardDetails, setGiftcardDetails] = useState({
    balance: "",
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    balance: false,
  });

  const handleEdit = (value, field) => {
    setGiftcardDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const { name, balance, email, phone } = giftcardDetails;

    // Check if any field is empty or if any field has an error
    if (
      !balance ||
      !email ||
      !phone ||
      !name ||
      error.email ||
      error.phone ||
      error.balance
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [giftcardDetails, error]);

  const predefinedValues = [5000, 10000, 15000, 20000]; // Predefined amounts

  const handleChipClick = (value) => {
    setGiftcardDetails((prev) => ({
      ...prev,
      balance: value,
    }));
  };

  const handlePay = async () => {
    console.log(error);
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
            setGiftcardDetails({});
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
          width: { xs: "90%", sm: "90%", md: "800px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          // p: 1,
          borderRadius: "5px",
          border: "none !important",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          maxHeight: { xs: "90vh", sm: "auto" }, // Limits height for scrolling on mobile
          overflowY: { xs: "auto", sm: "hidden" }, // Enables scroll on mobile
          margin: "auto", // Keeps modal centered
        }}
      >
        {/* Left Side: Image */}
        <Box
          sx={{
            width: { xs: "100%", sm: "45%" },
            backgroundImage: `url(${gift})`,
            backgroundSize: "contain",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            borderBottom: "1px solid rgb(234, 229, 229)",
            display: { xs: "block", sm: "block" },
            height: { xs: "180px", sm: "auto" },
            minHeight: "180px",
          }}
        />

        {/* Right Side: Content */}
        <Box
          sx={{
            width: { xs: "100%", sm: "55%" },
            p: { xs: 2, sm: 2 },
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
            config={{ field: "balance", type: "amount" }}
            value={giftcardDetails.balance}
            handleEdit={handleEdit}
            error={error.balance}
            errorObj={error}
            setError={setError}
            helperText={
              error.balance ? "Amount should be greater than 2500" : ""
            }
            inputProps={{ min: 0 }}
            sx={{
              mt: 1,
              width: "100%",
              "& .MuiInputLabel-root": {
                fontSize: "15px",
                top: "-6px",
              },
              "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                top: "0",
              },
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />

          <CustomTextfield
            fullWidth
            type="name"
            label="Enter name"
            config={{ field: "name" }}
            value={giftcardDetails.name}
            handleEdit={handleEdit}
            inputProps={{ min: 0 }}
            error={error.name}
            errorObj={error}
            setError={setError}
            helperText={error.name ? "Please enter your name" : ""}
            sx={{
              mt: "20px",
              width: "100%",
              "& .MuiInputLabel-root": {
                fontSize: "15px",
                top: "-6px",
              },
              "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                top: "0",
              },
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />

          <CustomTextfield
            fullWidth
            type="email"
            label="Enter Email"
            config={{ field: "email", type: "email" }}
            value={giftcardDetails.email}
            handleEdit={handleEdit}
            inputProps={{ min: 0 }}
            error={error.email}
            errorObj={error}
            setError={setError}
            helperText={error.email ? "Please enter correct Email" : ""}
            sx={{
              mt: "20px",
              width: "100%",
              "& .MuiInputLabel-root": {
                fontSize: "15px",
                top: "-6px",
              },
              "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                top: "0",
              },
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />

          <CustomTextfield
            fullWidth
            type="phone"
            label="Enter Phone Number"
            config={{ field: "phone", type: "phone" }}
            value={giftcardDetails.phone}
            handleEdit={handleEdit}
            inputProps={{ min: 0 }}
            error={error.phone}
            errorObj={error}
            setError={setError}
            helperText={error.phone ? "Please enter correct Phone Number" : ""}
            sx={{
              mt: "20px",
              width: "100%",
              "& .MuiInputLabel-root": {
                fontSize: "15px",
                top: "-6px",
              },
              "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                top: "0",
              },
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />

          <Button
            sx={{ mt: "20px" }}
            variant="contained"
            fullWidth
            color="custom"
            onClick={handlePay}
            disabled={buttonDisabled}
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
                xs: "13px",
                sm: "13px",
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

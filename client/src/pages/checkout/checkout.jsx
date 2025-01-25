import React from "react";
import CheckoutForm from "./checkoutForm";
import { Box } from "@mui/material";

const Checkout = () => {
  return (
    <Box sx={{ mb: { xs: "170px", sm: "170px", md: "40px" } }}>
      <CheckoutForm></CheckoutForm>
    </Box>
  );
};

export default Checkout;

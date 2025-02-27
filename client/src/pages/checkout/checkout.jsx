import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./checkoutForm";

const Checkout = (props) => {
  const [country, setCountry] = useState(props.country || "INR");

  useEffect(() => {
    setCountry(props.country);
  }, [props.country]);

  return (
    <Box sx={{ mb: { xs: "170px", sm: "170px", md: "40px" } }}>
      <CheckoutForm
        country={country}
        setCountry={props.setCountry}
      ></CheckoutForm>
    </Box>
  );
};

export default Checkout;

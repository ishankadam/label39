import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Footer from "../homepage/footer";

const ShippingPolicy = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4, mb: 5 }}>
        <Typography
          sx={{
            fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
            color: "#2f3e4e",
            textAlign: "center",
            mb: 4,
            fontFamily: "'Cinzel', serif",
            fontWeight: "600",
          }}
        >
          Shipping Policy
          <Box
            sx={{
              width: "70px",
              height: "3px",
              borderRadius: "100px",
              backgroundColor: "#2f3e4e",
              mx: "auto",
              mt: "8px",
            }}
          />
        </Typography>

        <Box>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            Please review the estimated delivery time we provided. If you are
            unavailable during that period, kindly notify us at{" "}
            <a href="mailto:thelabel39@gmail.com">thelabel39@gmail.com</a> so we
            can delay your shipment until you're available.
          </Typography>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            If you are unavailable at the time of delivery, our delivery
            partners will attempt to contact you and try delivering the package
            again before returning it to us. To ensure a quicker delivery,
            please provide a complete and accurate shipping address and mobile
            number. Please note that if an order is shipped and returned due to
            non-availability, no refunds will be issued, and the customer will
            be responsible for the re-shipping costs.
          </Typography>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            For international shipments, if the customer is unavailable, the
            shipping company will make an attempt to redeliver the package
            before transferring it to the local delivery office. If
            unavailability continues, the shipment will be returned to us in
            India. This return may incur significant duties/taxes, which the
            customer must pay, along with any re-shipping fees to the
            destination country. If the customer refuses to cover the customs
            duty/tax charges in India for the return shipment, the package will
            remain with Indian customs, and no further assistance will be
            provided.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ShippingPolicy;

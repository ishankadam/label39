import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Footer from "../homepage/footer";

const ReturnsAndCancellations = () => {
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
          Refund, Exchange and Cancellation Policy
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
            We sincerely regret to inform you that we do not offer refunds,
            returns, or exchanges as we take pride in our exceptional quality
            and individually crafted “Made to Order” pieces. Each garment is
            individually crafted by skilled artisans with detailed attention to
            quality and precision.
          </Typography>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            However, for customized order alterations, please notify us within 7
            days of receiving your parcel. No alteration requests will be
            entertained post that. Courier charges for alterations will be borne
            by the customer. Alteration service is available only for domestic
            orders.
          </Typography>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            In case of any manufacturing defect, we happily offer an exchange
            once our QC team approves it as a manufacturing defect. Reach out to
            us within 48 hours of receiving the order for such cases.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ReturnsAndCancellations;

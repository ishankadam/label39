import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";

const TermsAndConditions = () => {
  return (
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
        Terms and Conditions
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
        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
            color: "#2f3e4e",
            textAlign: "left",
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "600",
          }}
        >
          Domestic Shipping
        </Typography>

        <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
          We offer free shipping across India.
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
            color: "#2f3e4e",
            textAlign: "left",
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "600",
          }}
        >
          Delivery Time
        </Typography>
        <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
          We are a “Made to Order” brand, and hence delivery time varies from
          product to product. Normally we take 2-3 weeks for Pret Wear and 3-4
          weeks for Festive wear. This is a tentative timeline and orders might
          get delayed due to situations beyond our control, such as COVID-19,
          bad weather, flight delays, natural calamities, transport strikes,
          etc.
          <br />
          In case you need a garment by a particular date, please reach out to
          our team and inform us in advance.
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
            color: "#2f3e4e",
            textAlign: "left",
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "600",
          }}
        >
          International Shipping
        </Typography>
        <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
          We provide worldwide shipping. We charge a nominal amount for
          international shipments. Shipping and handling charges depend on the
          weight, volume, and final destination. The final shipping rates will
          be shown at checkout based on your location.
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
            color: "#2f3e4e",
            textAlign: "left",
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "600",
          }}
        >
          Exchanges/Returns/Refunds
        </Typography>
        <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
          We sincerely regret to inform you that we do not offer refunds,
          returns, or exchanges as we take pride in our exceptional quality and
          individually crafted “Made to Order” pieces. Each garment is
          individually crafted by skilled artisans with detailed attention to
          quality and precision.
          <br />
          However, for customized order alterations, please notify us within 7
          days of receiving your parcel. No alteration requests will be
          entertained post that. Courier charges for alterations will be borne
          by the customer. Alteration service is available only for domestic
          orders.
          <br />
          In case of any manufacturing defect, we happily offer an exchange once
          our QC team approves it as a manufacturing defect. Reach out to us
          within 48 hours of receiving the order for such cases.
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
            color: "#2f3e4e",
            textAlign: "left",
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "600",
          }}
        >
          Sale Items
        </Typography>
        <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
          We do not offer exchange, refund, or return facilities for sale orders
          under any circumstances.
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
            color: "#2f3e4e",
            textAlign: "left",
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "600",
          }}
        >
          Payments, Taxes, and Duties
        </Typography>
        <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
          All prices mentioned are inclusive of GST. For international
          shipments, custom duty charges are to be borne by the customer as some
          countries by law may impose custom duty once the package arrives in
          their country.
          <br />
          In such cases, the recipient is liable to pay the additional charges.
          We will not be responsible for the payment of custom duties or
          delivery delays due to non-payment.
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
            color: "#2f3e4e",
            textAlign: "left",
            fontFamily: "'Roboto Serif', serif",
            fontWeight: "600",
          }}
        >
          Garment Details
        </Typography>
        <Typography paragraph sx={{ color: "#66544B", mb: 1 }}>
          <strong
            style={{ fontFamily: "'Roboto Serif', serif", fontWeight: "600" }}
          >
            Sizing:
          </strong>
          Our standard size chart with body measurements in inches is attached
          for each product. We add easing to create a comfortable and relaxed
          fit. Extra charges apply for sizes above XL due to intricate
          embroidery and fabrics.
        </Typography>
        <Typography paragraph sx={{ color: "#66544B", mb: 1 }}>
          <strong
            style={{ fontFamily: "'Roboto Serif', serif", fontWeight: "600" }}
          >
            Customizations:
          </strong>
          For custom orders, please contact us at +91 9137845071. We are happy
          to create a specially crafted outfit for you.
        </Typography>
        <Typography paragraph sx={{ color: "#66544B", mb: 2 }}>
          <strong
            style={{ fontFamily: "'Roboto Serif', serif", fontWeight: "600" }}
          >
            Wash Care:
          </strong>
          We strictly prohibit washing our outfits as they are hand-dyed and
          made with silk fabric with intricate embroidery. We are not
          responsible for any damage caused to the garment in case of contact
          with water.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;

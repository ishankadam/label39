import { Typography, Box, imageListClasses } from "@mui/material";
import React from "react";
import story from "../../assets/aboutImg.jpeg";
import Container from "@mui/material/Container";
import backgroundImage from "../../assets/aboutbg2.png";
// import backgroundImage from "../../assets/about.png";
// import backgroundImage from "../../assets/aboutbg3.jpg";
// import backgroundImage from "../../assets/aboutbg4.png";
import footerImg from "../../assets/wine-os.png";

const OurStory = () => {
  return (
    <Box sx={{ marginBottom: "200px" }}>
      <Typography
        sx={{
          textAlign: "center",
          mb: 5,
          mt: 3,
          fontFamily: "'cinzel', serif",
          fontWeight: "600",
          fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
        }}
      >
        OUR STORY
        <div className="title-border" />
      </Typography>

      <Box
        component="img"
        src={footerImg}
        sx={{
          mb: 5,
          width: "100%",
          display: "block",
          borderBottom: "1px solid #ccc",
          // boxShadow:
          //   "rgba(215, 180, 167, 0.4) -5px 5px, rgba(215, 180, 167, 0.3) -10px 10px, rgba(215, 180, 167, 0.2) -15px 15px, rgba(215, 180, 167, 0.1) -20px 20px, rgba(215, 180, 167, 0.05) -25px 25px",
        }}
        alt=""
      />

      <Container
        className="story-wrapper"
        sx={{
          padding: "0 25px",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          flexDirection: { xs: "row", sm: "row", md: "row" }, // Default flex-direction for mobile (column layout)
        }}
      >
        <Typography
          sx={{
            color: "#494949",

            textAlign: "justify",
            fontFamily: "Roboto, serif",

            fontSize: {
              xs: "0.9rem",
              sm: "0.9rem",
              md: "1.0rem",
              lg: "1.3rem",
            }, // Responsive font sizes
            order: { xs: 2, md: 1 },
            // wordBreak: "break-word",
            wordSpacing: "7px",
          }}
        >
          The Label 39 is the creative expression of a mother-daughter duo,
          Anita and Prachi, who embarked on their journey in 2021. With Anita’s
          20+ years of expertise in the fashion industry and Prachi’s refined
          education from the prestigious London College of Fashion, the brand
          seamlessly blends heritage with innovation.{" "}
          {/* <Box sx={{ marginTop: 2 }} /> */}
          The Label 39 began with a focus on pret wear—effortlessly chic and
          versatile pieces that became an instant hit. Building on this success,
          we introduced our Drape Collection in 2024, a celebration of festive
          elegance filled with fusion, designed for modernity.
        </Typography>
      </Container>
      <hr className="footer-line" style={{ margin: "40px 0px" }} />

      <Container
        className="story-wrapper"
        sx={{
          padding: "0 25px",

          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "flex-start", sm: "center", md: "center" },
          flexDirection: {
            xs: "row",
            sm: "row",
            md: "row",
          }, // Default flex-direction for mobile (column layout)
        }}
      >
        <Box
          sx={{
            display: { xs: "block", sm: "flex" }, // Block on mobile, flex on larger screens
            alignItems: { xs: "flex-start", sm: "center", md: "center" },
          }}
        >
          <Box
            component={"img"}
            key={`story-Thumbnail`}
            src={story}
            alt={`story-Thumbnail`}
            sx={{
              float: { xs: "left", sm: "none" }, // Float image to the left on mobile
              width: {
                xs: "170px",
                sm: "50% !important",
                md: "50% !important",
                lg: "350px",
              },
              maxWidth: "350px",
              height: { xs: "300px", sm: "350px", md: "auto", lg: "auto" },
              objectFit: "cover",
              marginRight: { xs: "15px", sm: "30px", md: "0", lg: "0px" },
              marginBottom: { xs: "0", sm: "0" }, // Add bottom margin for mobile
            }}
          />
          <Typography
            sx={{
              color: "#494949",
              textAlign: "justify",
              fontFamily: "Roboto, serif",
              marginLeft: { md: "40px" }, // Left margin on larger screens
              fontSize: {
                xs: "0.9rem",
                sm: "0.9rem",
                md: "1.0rem",
                lg: "1.3rem",
              }, // Responsive font sizes
            }}
          >
            Our creations feature intricate appliqué, embroidery, hand beadwork,
            cutwork, and hand-painted details. Made with pure, eco-friendly
            fabrics, we prioritise sustainability and embrace the ethos of slow
            fashion with made-to-order designs that minimise waste.
            <Box sx={{ marginTop: 2 }} />
            At the heart of The Label 39 lies a passion for Indian
            craftsmanship, reimagined with a contemporary flair. Each silhouette
            is thoughtfully designed to offer comfort, grace, and a story of
            artistry. We are proud to present a brand that values authenticity,
            sustainability, and the effortless charm of the modern woman.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default OurStory;

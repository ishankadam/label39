import { Typography, Box } from "@mui/material";
import React from "react";
import story from "../../assets/aboutImg.jpeg";
import Container from "@mui/material/Container";
import backgroundImage from "../../assets/aboutbg2.png";
// import backgroundImage from "../../assets/aboutbg2.png";
// import backgroundImage from "../../assets/about.png";
// import backgroundImage from "../../assets/aboutbg3.jpg";
// import backgroundImage from "../../assets/aboutbg2.png";

const OurStory = () => {
  return (
    <div
      style={{
        background: "#F7ECE9",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100%",
        padding: "33px 0px", // Optional: Add some padding
        objectFit: "cover",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",

          // padding: "40px 0", // Add some padding if needed
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            mb: 4,
            mt: 2,
            fontFamily: "'cinzel', serif",
            fontWeight: "600",
            fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
          }}
        >
          OUR STORY
          <div className="title-border" />
        </Typography>
        <Container
          className="story-wrapper"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row", md: "row" }, // Default flex-direction for mobile (column layout)
          }}
        >
          <Box
            component={"img"}
            key={`story-Thumbnail`}
            src={story}
            alt={`story-Thumbnail`}
            sx={{
              width: {
                xs: "100%",
                sm: "40% !important",
                md: "100%",
                lg: "100%",
              }, // Full width on mobile
              maxWidth: "300px", // Fixed max-width for larger screens
              height: "350px", // Maintain aspect ratio
              borderRadius: "1%",
              objectFit: "cover",
              marginRight: { xs: "0px", sm: "30px", md: "0", lg: "0" },
            }}
          />
          <Typography
            sx={{
              color: "#494949",

              textAlign: "justify",
              fontFamily: "Roboto, serif",
              marginLeft: { md: "40px" }, // Left margin on larger screens
              fontSize: {
                xs: "0.8rem",
                sm: "0.9rem",
                md: "1.0rem",
                lg: "1.2rem",
              }, // Responsive font sizes
              order: { xs: 2, md: 1 },
            }}
          >
            The Label 39 is the creative expression of a mother-daughter duo,
            Anita and Prachi, who embarked on their journey in 2021. With
            Anita’s 20+ years of expertise in the fashion industry and Prachi’s
            refined education from the prestigious London College of Fashion,
            the brand seamlessly blends heritage with innovation.{" "}
            <Box sx={{ marginTop: 2 }} />
            The Label 39 began with a focus on pret wear—effortlessly chic and
            versatile pieces that became an instant hit. Building on this
            success, we introduced our Drape Collection in 2024, a celebration
            of festive elegance filled with fusion, designed for modernity.
          </Typography>
        </Container>

        <Container
          className="story-wrapper"
          sx={{
            mt: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: {
              xs: "column",
              sm: "row-reverse",
              md: "row-reverse",
            }, // Default flex-direction for mobile (column layout)
          }}
        >
          <Box
            component={"img"}
            key={`story-Thumbnail`}
            src={story}
            alt={`story-Thumbnail`}
            sx={{
              width: {
                xs: "100%",
                sm: "40% !important",
                md: "100%",
                lg: "100%",
              }, // Full width on mobile
              maxWidth: "300px", // Fixed max-width for larger screens
              // height: "auto",
              height: "350px", // Maintain aspect ratio

              borderRadius: "1%",
              objectFit: "cover",
              marginLeft: { xs: "0px", sm: "30px", md: "0", lg: "0" },
            }}
          />
          <Typography
            sx={{
              color: "#494949",

              textAlign: "justify",
              fontFamily: "Roboto, serif",
              marginRight: { md: "40px" }, // Left margin on larger screens
              fontSize: {
                xs: "0.8rem",
                sm: "0.9rem",
                md: "1.0rem",
                lg: "1.2rem",
              }, // Responsive font sizes
              order: { xs: 2, md: 1 },
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
        </Container>
      </Container>
    </div>
  );
};

export default OurStory;

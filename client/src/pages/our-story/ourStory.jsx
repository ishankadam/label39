import { Typography, Box } from "@mui/material";
import React from "react";
import story from "../../assets/story.png";
import Container from "@mui/material/Container";
import backgroundImage from "../../assets/leaf-bg2-cropped.jpg"; // Import your background image

const OurStory = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "1800px 700px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100%", // Ensure it covers the full viewport height
        padding: "33px 0px", // Optional: Add some padding
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
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            mt: 4,
            fontFamily: "'cinzel', serif",
            fontWeight: "600",
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
            alignItems: "flex-start",
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
              maxWidth: "400px", // Fixed max-width for larger screens
              height: "auto", // Maintain aspect ratio
              borderRadius: "1%",
              objectFit: "cover",
              marginRight: { xs: "0px", sm: "30px", md: "0", lg: "0" },
              marginBottom: "20px", // Spacing between the image and text on mobile
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
                sm: "1rem",
                md: "1.2rem",
                lg: "1.4rem",
              }, // Responsive font sizes
              order: { xs: 2, md: 1 }, // Image comes first, text comes second on mobile
            }}
          >
            We are a clothing brand based in Kolkata. We believe in making
            conscious clothing for everyday. We want to be a part of the new
            ethos where we are making thoughtful and personal design which
            connects the wearer with the maker. We work closely with craftsmen
            and weavers across the country to preserve age-old techniques and
            practices of our country whilst contemporizing the product. Each
            piece is a story of all the hands that came together in creating it.
            We want to create separates that you will wear time and again,
            perhaps in a different way each time. Design that is functional yet
            thoughtful, contemporary yet rooted, classic yet versatile. Fashion
            which celebrates everyday together with the special occasions.
            Clothes that let you breathe easy, let you be yourself and yet make
            you feel good.
          </Typography>
        </Container>
      </Container>
    </div>
  );
};

export default OurStory;

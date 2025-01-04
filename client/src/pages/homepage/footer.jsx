import React from "react";
import { Container, Grid2, Typography, Link, Box } from "@mui/material";
// import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import "../../css/footer.css";
import textile from "../../assets/texttile.jpg";
import textile2 from "../../assets/texttile2.jpeg";

import woven from "../../assets/woven.png";
import mindful from "../../assets/mindful.png";
import sustainable from "../../assets/sustainable.png";
import footerImg from "../../assets/wine-os.png";
// import TermsAndCondition from "../termsAndCondition/termsAndCondition.jsx";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/backgroundfooter.jpg";
const Footer = (props) => {
  const navigate = useNavigate();

  const handlePageChange = (path) => {
    const navigateToPage = (targetPath) => {
      navigate(targetPath);
    };

    return (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      navigateToPage(path);
    };
  };

  return (
    <Box className="container">
      <Box
        component="img"
        src={footerImg}
        sx={{
          width: "100%",
          height: { xs: "90px", sm: "auto" },
          display: "block",
          // mixBlendMode: "multiply",
          // filter: "brightness(0) invert(1)",
        }}
        alt=""
      />

      {/* Top Section */}
      {props.topSection && (
        <Box>
          <div className="top-section">
            <div className="top-item">
              <img src={textile} alt="textile" className="bottom-icons" />
              <Typography>Textile Revival</Typography>
            </div>
            <div className="top-item">
              <img src={sustainable} alt="textile" className="bottom-icons" />
              <Typography>Textile Revival</Typography>
            </div>
            <div className="top-item">
              <img src={textile2} alt="textile" className="bottom-icons" />
              <Typography>Woven by Hand</Typography>
            </div>
            <div className="top-item">
              <img src={mindful} alt="textile" className="bottom-icons" />
              <Typography>Mindful Design</Typography>
            </div>
            <div className="top-item">
              <img src={sustainable} alt="textile" className="bottom-icons" />
              <Typography>Sustainable Practices</Typography>
            </div>
          </div>
        </Box>
      )}
      <footer
        style={{
          position: "relative",
          backgroundImage: `url(${backgroundImage})`, // Path to your background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "40px 0",
          color: "#fff",
        }}
      >
        {/* Transparent Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(224, 211, 208, 0.9)", // Transparent brown color
            zIndex: 1,
          }}
        ></div>

        {/* Content */}
        <Container
          sx={{
            position: "relative", // Ensure content stays above the overlay
            zIndex: 2,
            maxWidth: "none !important",
            padding: {
              xs: "0 15px !important",
              sm: "0 30px !important",
              md: "0 30px !important",
              lg: "0 50px !important",
            },
            textAlign: { xs: "center", sm: "center", md: "start", lg: "start" },
          }}
        >
          <Grid2 container spacing={4}>
            {/* Left Side (Company Information) */}
            <Grid2 item size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: { xs: "20px", sm: "20px", md: "26px", lg: "28px" },
                  color: "#374151",
                  fontWeight: "bolder",
                }}
              >
                KNOW ABOUT US
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "rgba(35, 42, 54, 0.8)",
                  lineHeight: "26px",
                }}
              >
                Born from the sheer love for clothes, The Label 39 is a fusion
                of simple and sophistication. We work directly with artisans
                from across the country to create conscious and intricate
                clothing that is true to its craftsmanship.
              </Typography>
            </Grid2>

            {/* Center Section (Links) */}
            <Grid2 item size={{ xs: 6, md: 2 }}>
              <Typography variant="h6" className="footer-links-header">
                INFO
              </Typography>
              <ul>
                <li>
                  <Link
                    onClick={handlePageChange("/ourStory")}
                    className="footer-links"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handlePageChange("/contactUs")}
                    className="footer-links"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handlePageChange("/termsAndCondition")}
                    className="footer-links"
                  >
                    Terms & Condition
                  </Link>
                </li>
              </ul>
            </Grid2>

            {/* Product Section */}
            <Grid2 item size={{ xs: 6, md: 2 }}>
              <Typography variant="h6" className="footer-links-header">
                PRODUCT
              </Typography>
              <ul>
                <li>
                  <Link href="#" className="footer-links">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-links">
                    Pricing
                  </Link>
                </li>
              </ul>
            </Grid2>

            {/* Subscribe Section */}
            <Grid2 item size={{ xs: 12, md: 4 }}>
              <div className="subscribe">
                <h3 className="subscribe-title">Subscribe</h3>
                <form>
                  <input type="email" placeholder="Email address" />
                  <button type="submit">➔</button>
                </form>
                <Typography className="subscribe-text">
                  Stay in the loop with the latest updates, unlock exclusive
                  deals, and be the first to know about exciting offers!
                </Typography>
              </div>
            </Grid2>
          </Grid2>
        </Container>
      </footer>
    </Box>
  );
};

export default Footer;

import React from "react";
import {
  Container,
  Grid2,
  Typography,
  IconButton,
  Link,
  Box,
} from "@mui/material";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import "../../css/footer.css";
import textile from "../../assets/texttile.png";
import woven from "../../assets/woven.png";
import mindful from "../../assets/mindful.png";
import sustainable from "../../assets/sustainable.png";
import footerImg from "../../assets/footer.jpg";
import TermsAndCondition from "../termsAndCondition/termsAndCondition.jsx";
import { useNavigate } from "react-router-dom";
const Footer = (props) => {
  const navigate = useNavigate();

  const handlePageChange = () => {
    navigate("/termsAndCondition");
  };
  return (
    <div className="container">
      <img src={footerImg} style={{ width: "100%", display: "block" }} alt="" />

      {/* Top Section */}
      {props.topSection && (
        <div className="top-section">
          <div className="top-item">
            <img src={textile} alt="textile" className="bottom-icons" />
            <Typography>Textile Revival</Typography>
          </div>
          <div className="top-item">
            <img src={woven} alt="textile" className="bottom-icons" />
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
      )}
      <footer
        style={{
          backgroundColor: "#F7ECE9",
          padding: "40px 0",
          color: "#fff",
        }}
      >
        <Container
          sx={{
            maxWidth: "none !important",
            padding: {
              xs: "0 15px !important",
              sm: "0 30px !important",
              md: "0 30px !important",
              lg: "0 50px !important",
            },
            textAlign: { xs: "start", sm: "center", md: "start", lg: "start" },
          }}
        >
          <Grid2 container spacing={4}>
            {/* Left Side (Company Information) */}
            <Grid2 item size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  padding: {
                    xs: "0 6px !important",
                    sm: "0 16px !important",
                    md: "0 20px !important",
                    lg: "0 20px !important",
                  },
                  fontFamily: "'Cinzel', serif",
                  fontSize: {
                    xs: "20px",
                    sm: "20px",
                    md: "26px",
                    lg: "28px",
                  },
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
                  fontSize: {
                    xs: "15px",
                    sm: "15px",
                    md: "15px",
                    lg: "15px",
                  },
                  fontWeight: "600",
                  color: "rgba(55, 65, 81, 0.9);",
                  lineHeight: "26px",
                  margin: "0 !important",
                  padding: {
                    xs: "0 6px !important",
                    sm: "0 16px !important",
                    md: "0 20px !important",
                    lg: "0 20px !important",
                  },
                }}
              >
                Born from the sheer love for clothes, The Label 39 is a fusion
                of simple and sophistication. We work directly with artisans
                from across the country to create conscious and intricate
                clothing that is true to its craftsmanship.
              </Typography>
              {/* Social Media Icons */}
              <Box
                sx={{ marginLeft: { xs: 0, sm: 0, md: "10px", lg: "10px" } }}
              >
                <IconButton
                  className="footer-icon"
                  sx={{
                    color: "#374151",
                    fontSize: "28px",
                    // marginRight: "12px",
                    // padding: "0px 20px !important",
                  }}
                  component={Link}
                  href="#"
                  aria-label="Facebook"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  className="footer-icon"
                  sx={{
                    color: "#374151",
                    fontSize: "28px",

                    // marginRight: "12px",
                  }}
                  component={Link}
                  href="#"
                  aria-label="Instagram"
                >
                  <Instagram />
                </IconButton>
              </Box>
            </Grid2>

            {/* Center Section (Links) */}
            <Grid2 item size={{ xs: 6, md: 2 }} sx={{ cursor: "pointer" }}>
              <Typography variant="h6" className="footer-links-header">
                INFO
              </Typography>
              <ul style={{}}>
                <li>
                  <Link
                    href="#"
                    className="footer-links"
                    sx={{ textDecoration: "none" }}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/contactus" className="footer-links">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link onClick={handlePageChange} className="footer-links">
                    Terms and Condition
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-links">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </Grid2>

            {/* Product Section */}
            <Grid2 item size={{ xs: 6, md: 2 }}>
              <Typography variant="h6" className="footer-links-header">
                PRODUCT
              </Typography>
              <ul style={{ listStyleType: "none", padding: 0 }}>
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
                <li>
                  <Link href="#" className="footer-links">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-links">
                    Help desk
                  </Link>
                </li>
              </ul>
            </Grid2>

            {/* Legal Section */}
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
    </div>
  );
};

export default Footer;

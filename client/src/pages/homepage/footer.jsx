import React from "react";
import { Container, Grid2, Typography, IconButton, Link } from "@mui/material";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import "../../css/footer.css";
import textile from "../../assets/texttile.png";
import woven from "../../assets/woven.png";
import mindful from "../../assets/mindful.png";
import sustainable from "../../assets/sustainable.png";

const Footer = (props) => {
  return (
    <div className="container">
      {/* Top Section */}
      {props.topSection && (
        <div className="top-section">
          <div className="top-item">
            <img src={textile} alt="textile" />
            <Typography>Textile Revival</Typography>
          </div>
          <div className="top-item">
            <img src={woven} alt="textile" />
            <Typography>Woven by Hand</Typography>
          </div>
          <div className="top-item">
            <img src={mindful} alt="textile" />
            <Typography>Mindful Design</Typography>
          </div>
          <div className="top-item">
            <img src={sustainable} alt="textile" />
            <Typography>Sustainable Practices</Typography>
          </div>
        </div>
      )}
      <footer
        style={{ backgroundColor: "#F5F5F6", padding: "40px 0", color: "#fff" }}
      >
        <Container
          sx={{
            maxWidth: "none !important",
            padding: "0 50px !important",
            alignItems: "center",
          }}
        >
          <Grid2 container spacing={4}>
            {/* Left Side (Company Information) */}
            <Grid2 item size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  padding: "0px 20px !important",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "28px",
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
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "rgba(55, 65, 81, 0.9);",
                  lineHeight: "26px",
                  margin: "0 !important",
                  padding: "0px 20px !important",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
              {/* Social Media Icons */}
              <div>
                <IconButton
                  className="footer-icon"
                  sx={{
                    color: "#374151",
                    fontSize: "28px",
                    // marginRight: "12px",
                    padding: "0px 20px !important",
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
              </div>
            </Grid2>

            {/* Center Section (Links) */}
            <Grid2 item size={{ xs: 12, md: 2.5 }}>
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
                  <Link href="#" className="footer-links">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-links">
                    FAQs
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
            <Grid2 item size={{ xs: 12, md: 2.5 }}>
              <Typography variant="h6" className="footer-links-header">
                Product
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
            <Grid2 item size={{ xs: 12, md: 3 }}>
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

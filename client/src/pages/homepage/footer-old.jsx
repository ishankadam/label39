import React from "react";
import "./../../css/footer.css";
import textile from "../../assets/texttile.png";
import woven from "../../assets/woven.png";
import mindful from "../../assets/mindful.png";
import sustainable from "../../assets/sustainable.png";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="container">
      {/* Top Section */}
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
      <div className="footer-wrapper">
        <div className="about-section">
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cinzel', serif",
              fontSize: "32px",
              color: "#374151",
              fontWeight: "bolder",
            }}
          >
            Know About Us
          </h2>
          <Typography
            sx={{
              fontFamily: "'Cinzel', serif",
              fontSize: "18px",
              fontWeight: "600",
              color: "#494949",
              margin: "20px auto !important",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
          <div className="social-icons">
            <FacebookIcon
              sx={{ color: "#374151", fontSize: "28px", marginRight: "12px" }}
            />
            <Instagram sx={{ color: "#374151", fontSize: "28px" }} />
          </div>
        </div>

        {/* Info and Product Sections */}
        <div className="info-product-section">
          <div className="info">
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Cinzel', serif",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Info
            </Typography>
            <List>
              <ListItem button>
                <ListItemText primary="About Us" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Contact Us" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="FAQs" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Privacy Policy" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Terms & Service" />
              </ListItem>
            </List>
          </div>
          <div className="product">
            <Typography variant="h5">Product</Typography>
            <List>
              <ListItem button>
                <ListItemText primary="Features" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Pricing" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="News" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Help Desk" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Support" />
              </ListItem>
            </List>
          </div>

          {/* Subscribe Section */}
          <div className="subscribe">
            <h3>Subscribe</h3>
            <form>
              <input type="email" placeholder="Email address" />
              <button type="submit">➔</button>
            </form>
            <Typography>
              Stay in the loop with the latest updates, unlock exclusive deals,
              and be the first to know about exciting offers!
            </Typography>
          </div>
        </div>
      </div>
      {/* Know About Us Section */}
    </div>
  );
};

export default Footer;

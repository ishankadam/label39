import { Box, Container, Grid2, Link, Stack, Typography } from "@mui/material";
import React from "react";
// import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useEffect, useState } from "react";
import textile from "../../assets/1.png";
import woven from "../../assets/2.png";
import sustainable from "../../assets/31.png";
import mindful from "../../assets/4.png";
import textile2 from "../../assets/5.png";
import footerImg from "../../assets/wine-os.png";
import "../../css/footer.css";
// import TermsAndCondition from "../termsAndCondition/termsAndCondition.jsx";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/backgroundfooter.jpg";
import { setFilter, showSnackbar } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubscribe = () => {
    dispatch(
      showSnackbar({
        message: `You've successfully subscribed to TheLabel39!`,
        severity: "success",
      })
    );
  };
  const handlePageChange = (path, filter) => {
    const navigateToPage = (targetPath) => {
      navigate(targetPath);
      filter && dispatch(setFilter({ [filter.field]: filter.value }));
    };

    return (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      navigateToPage(path);
    };
  };

  const items = [
    { img: textile, text: "Textile Revival" },
    { img: textile2, text: "Hand Embroidered" },
    { img: woven, text: "Mindful Design" },
    { img: mindful, text: "Crafted With Love" },
    { img: sustainable, text: "Sustainable" },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 640);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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

      <Box
        sx={{
          backgroundColor: "rgba(183, 121, 97, 0.7)",
          backdropFilter: "blur(100px)",
          WebkitBackdropFilter: "blur(10px)",
          padding: "16px",
          color: "white",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: "16px",
            flexWrap: isMobile ? "nowrap" : "wrap",
            justifyContent: isMobile ? "flex-start" : "space-around",
            animation: isMobile ? "marquee 10s linear infinite" : "none",
            "&:hover": {
              animationPlayState: isMobile ? "paused" : "running",
            },
            "@keyframes marquee": {
              "0%": { transform: "translateX(0%)" },
              "100%": { transform: "translateX(-100%)" },
            },
            "&::after": isMobile
              ? {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "100%",
                  width: "100%",
                  height: "100%",
                  background: "inherit",
                }
              : {},
          }}
        >
          {(isMobile ? [...items, ...items] : items).map((item, index) => (
            <Box
              key={isMobile ? index : item.text}
              sx={{
                flex: isMobile ? "0 0 auto" : "1 1 auto",
                textAlign: "center",
                minWidth: isMobile ? "120px" : "auto",
                maxWidth: isMobile ? "none" : "20%",
              }}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.text}
                sx={{
                  width: "45px",
                  height: "45px",
                  marginBottom: "8px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "Roboto Serif, serif",
                  fontWeight: 500,
                  whiteSpace: isMobile ? "nowrap" : "normal",
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

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
                  <Link
                    href="#"
                    className="footer-links"
                    onClick={handlePageChange("/shop", {
                      field: "category",
                      value: "cord",
                    })}
                  >
                    CO-ORDS
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-links"
                    onClick={handlePageChange("/shop", {
                      field: "category",
                      value: "festive",
                    })}
                  >
                    FESTIVE
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-links"
                    onClick={handlePageChange("/shop", {
                      field: "category",
                      value: "kurtas",
                    })}
                  >
                    KURTAS
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-links"
                    onClick={handlePageChange("/shop", {
                      field: "category",
                      value: "shirtsAndDresses",
                    })}
                  >
                    SHIRTS AND DRESSES
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
                  <button type="submit" onClick={handleSubscribe}>
                    ➔
                  </button>
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

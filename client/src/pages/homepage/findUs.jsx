import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Grid,
  Container,
  Grid2,
  IconButton,
  Link,
  Box,
} from "@mui/material";

import React, { useState } from "react";
import findUs1 from "../../assets/findus1.png";
import "./../../css/findUs.css";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";

import CustomTextfield from "../../components/textfield/customTextfield";

const FindUs = () => {
  const [addressSlide, setAddressSlide] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const toggleMapVisibility = () => {
    setShowMap((prev) => !prev); // Toggle map visibility
  };

  return (
    <Box sx={{ marginTop: { xs: "20px", sm: "28px", md: "36px" } }}>
      <Typography
        variant="h4"
        sx={{
          color: "#2f3e4e",
          textAlign: "center",
          mb: 1,
          fontFamily: "'cinzel', serif",
          fontWeight: "500",
        }}
      >
        contact us
        <div
          className="title-border"
          style={{
            width: "70px",
            height: "3px",
            borderRadius: "100px",
            backgroundColor: "#2f3e4e",
            margin: "0 auto",
          }}
        />
      </Typography>
      <div className="findus-container">
        <Card className="card-container">
          <Grid container>
            <Grid item xs={12} sm={6}>
              {showMap ? (
                <CardMedia
                  className="card-image"
                  component="img"
                  height="140"
                  image={findUs1}
                  alt="find us"
                />
              ) : (
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83918911796!2d77.06889984999999!3d28.4743844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1612dfde9c9%3A0x29a8983a3a749f20!2sThe%20Dhanmill!5e0!3m2!1sen!2sin!4v1692722440123!5m2!1sen!2sin"
                  height="100%"
                  width="100%"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: 0 }}
                  title="The Dhanmill Location"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} className="content-container">
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: " 'Berkshire Swash', serif",
                    fontWeight: "400",
                    fontSize: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {showMap ? "Find us at" : "Write us at"}
                </Typography>
                {/* <Divider sx={{ my: 1 }} /> */}
                {!showMap ? (
                  <>
                    <Typography
                      gutterBottom
                      // variant="h2"
                      component="div"
                      sx={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: {
                          xs: "28px",
                          sm: "32px",
                          md: "36px",
                          lg: "42px",
                        },
                        color: "#a16149",
                        marginBottom: "20px",
                        fontWeight: "600",
                      }}
                    >
                      TheLabel39
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        color: "#494949",
                        fontSize: "18px",
                        fontFamily: "'Roboto Serif', serif",
                        marginBottom: "20px",
                      }}
                    >
                      The Dhanmill, SSN Marg, 100 Feet Road, Chhatarpur, New
                      Delhi, Delhi, 110074
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#494949",
                        fontSize: "16px",
                        fontFamily: "'Roboto Serif', serif",
                      }}
                    >
                      Phone Number: +91 9674949842
                    </Typography>{" "}
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        position: "relative", // Parent should be relative for absolute positioning
                        width: "fit-content", // Shrinks the parent width to the content's size
                      }}
                    >
                      <CustomTextfield
                        multiple={true}
                        sx={{
                          width: "300px",
                          marginBottom: "10px",
                        }}
                        label="Name"
                      ></CustomTextfield>
                      <CustomTextfield
                        multiple={true}
                        sx={{
                          width: "300px",
                          marginBottom: "10px",
                        }}
                        label="Email Address"
                      ></CustomTextfield>
                      <CustomTextfield
                        multiple={true}
                        sx={{
                          width: "300px",
                          marginBottom: "10px",
                        }}
                        label="Phone Number"
                      ></CustomTextfield>
                      <CustomTextfield
                        multiple={true}
                        sx={{
                          width: "300px",
                          marginBottom: "10px",
                        }}
                        label="message"
                      ></CustomTextfield>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          position: "absolute", // Absolutely position the button
                          right: "20px", // Slightly offset to the right of the textfield
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                    <Divider sx={{ margin: "50px 15px 15px 15px" }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: " 'Berkshire Swash', serif",
                        fontWeight: "400",
                        fontSize: "20px",
                      }}
                    >
                      Follow us
                    </Typography>
                    <IconButton
                      className="findus-icon"
                      sx={{
                        color: "#7D818D",
                        fontSize: "28px",
                        // marginRight: "12px",
                        padding: "0px 0px !important",
                      }}
                      component={Link}
                      href="#"
                      aria-label="Facebook"
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton
                      className="findus-icon"
                      sx={{
                        color: "#7D818D",
                        fontSize: "28px",

                        // marginRight: "12px",
                      }}
                      component={Link}
                      href="#"
                      aria-label="Instagram"
                    >
                      <Instagram />
                    </IconButton>
                  </>
                )}
              </CardContent>
            </Grid>
          </Grid>
          <Link
            component="button"
            onClick={toggleMapVisibility}
            sx={{
              color: "#a16149",
              fontSize: "16px",
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            {showMap
              ? "Show Shop Address"
              : "To send us your queries click here"}
          </Link>
        </Card>
      </div>
    </Box>
  );
};

export default FindUs;

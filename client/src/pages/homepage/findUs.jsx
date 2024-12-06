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
        sx={{
          color: "#2f3e4e",
          textAlign: "center",
          mb: 1,
          fontFamily: "'cinzel', serif",
          fontWeight: "500",
          fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
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
                  image={findUs1}
                  alt="find us"
                />
              ) : (
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83918911796!2d77.06889984999999!3d28.4743844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1612dfde9c9%3A0x29a8983a3a749f20!2sThe%20Dhanmill!5e0!3m2!1sen!2sin!4v1692722440123!5m2!1sen!2sin"
                  height="380px"
                  width="100%"
                  allowFullScreen
                  loading="lazy"
                  title="The Dhanmill Location"
                  sx={{ border: 0 }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} className="content-container">
              <CardContent>
                {/* <Divider sx={{ my: 1 }} /> */}
                {!showMap ? (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: " 'Berkshire Swash', serif",
                        fontWeight: "400",
                        fontSize: "20px",
                        marginBottom: "25px",
                      }}
                    >
                      Find us at
                    </Typography>
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
                        marginBottom: "25px",
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
                        marginBottom: "25px",
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
                  <Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: " 'Berkshire Swash', serif",
                          fontWeight: "400",
                          fontSize: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        Write us at
                      </Typography>
                      <Box>
                        <IconButton
                          className="findus-icon"
                          sx={{
                            color: "#1F2020",
                            fontSize: "28px",
                            // marginRight: "12px",
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
                            color: "#1F2020",
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
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <CustomTextfield
                          multiple={true}
                          label="Name"
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root": {
                              fontSize: "14px",
                              top: "-5px",
                            },
                            "& .MuiOutlinedInput-root": {
                              height: "40px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <CustomTextfield
                          multiple={true}
                          label="Email Address"
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root": {
                              fontSize: "14px",
                              top: "-5px",
                            },
                            "& .MuiOutlinedInput-root": {
                              height: "40px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <CustomTextfield
                          multiple={true}
                          label="Phone Number"
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root": {
                              fontSize: "14px",
                              top: "-5px",
                            },
                            "& .MuiOutlinedInput-root": {
                              height: "40px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <CustomTextfield
                          multiple={true}
                          label="Message"
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root": {
                              fontSize: "14px",
                              top: "-5px",
                            },
                            "& .MuiOutlinedInput-root": {
                              height: "40px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button color="custom" variant="contained">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                <Link
                  component="button"
                  onClick={toggleMapVisibility}
                  sx={{
                    color: "#a16149",
                    mt: 2,
                    fontSize: "16px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    "&:hover": {
                      textDecoration: "none",
                    },

                    fontFamily: " 'Roboto Serif', serif",
                    fontWeight: "400",
                    // marginBottom: "25px",
                  }}
                >
                  {showMap
                    ? "Show Shop Address"
                    : " Click here to send us your queries"}
                </Link>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Box>
  );
};

export default FindUs;

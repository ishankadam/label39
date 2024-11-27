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

  const handleSlideChange = () => {
    setAddressSlide(!addressSlide);
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
        <NavigateBeforeOutlinedIcon
          onClick={handleSlideChange}
          sx={{
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            padding: "5px",
            cursor: "pointer",
            margin: "100px",
            // opacity: currentSlide === 0 ? 0.5 : 1,
          }}
        />
        <Card className="card-container">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <CardMedia
                className="card-image"
                component="img"
                height="140"
                image={findUs1}
                alt="find us"
              />
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
                  {addressSlide ? "Find us at" : "Write us at"}
                </Typography>
                {/* <Divider sx={{ my: 1 }} /> */}
                {addressSlide ? (
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
                    </Typography>
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
                          height: "100px", // Set the desired height
                          margin: "0 20px",
                        }}
                      ></CustomTextfield>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          position: "absolute", // Absolutely position the button
                          top: "-50px", // Align to the top of the parent div
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
        </Card>
        <NavigateNextOutlinedIcon
          onClick={handleSlideChange}
          sx={{
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            padding: "5px",
            cursor: "pointer",
            margin: "100px",

            // opacity: currentSlide >= slides.length - 2 ? 0.5 : 1,
          }}
        />
      </div>
    </Box>
  );
};

export default FindUs;

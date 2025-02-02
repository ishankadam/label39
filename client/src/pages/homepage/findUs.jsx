import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

import { Facebook, Instagram } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import findUs1 from "../../assets/findus1.JPG";
import "./../../css/findUs.css";

import { sendQueryEmail } from "../../api";
import CustomTextfield from "../../components/textfield/customTextfield";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../store/cartSlice";

const FindUs = () => {
  const dispatch = useDispatch();

  const [showMap, setShowMap] = useState(false);

  const toggleMapVisibility = () => {
    setShowMap((prev) => !prev); // Toggle map visibility
  };
  const [, setButtonDisabled] = useState(true);
  const [query, setQuery] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  useEffect(() => {
    const { name, email, phone, message } = query;
    if (!name || !email || !phone || !message) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [query]);

  const handleEdit = (value, field) => {
    setQuery((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(
      showSnackbar({
        message: `EMAIL SENT SUCCESSFULLY`,
        severity: "success",
      })
    );
    sendQueryEmail({ query });
    setQuery({ name: "", email: "", phone: "", message: "" });
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
        <Card
          className="card-container"
          sx={{ maxWidth: { xs: "100%", sm: "95%", md: "800px", lg: "900px" } }}
        >
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1017166108327!2d72.84595687466584!3d19.10319315111933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b5a556b17f%3A0x707b76f49810088a!2sSun%20Vision%20Classic!5e0!3m2!1sen!2sin!4v1735222194257!5m2!1sen!2sin"
                  height="380px"
                  width="100%"
                  allowFullScreen
                  loading="lazy"
                  title="TheLabel39 Location"
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
                        textAlign: "center",
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
                        textAlign: "center",
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
                        textAlign: "center",
                      }}
                    >
                      302 sun vision classic Hanuman road Vile Parle East Mumbai
                      - 400057
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#494949",
                        fontSize: "16px",
                        fontFamily: "'Roboto Serif', serif",
                        textAlign: "center",
                      }}
                    >
                      Phone Number: +91 9137845071
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
                          config={{ field: "name" }}
                          value={query.name}
                          handleEdit={handleEdit}
                          error={error.name}
                          errorObj={error}
                          setError={setError}
                          helperText={
                            error.name ? "Please enter your name" : ""
                          }
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root": {
                              fontSize: "15px",
                              top: "-6px",
                            },
                            "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                              top: "0",
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
                          config={{ field: "email", type: "email" }}
                          value={query.email}
                          handleEdit={handleEdit}
                          error={error.email}
                          errorObj={error}
                          setError={setError}
                          helperText={
                            error.email ? "Please enter correct Email" : ""
                          }
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root": {
                              fontSize: "15px",
                              top: "-6px",
                            },
                            "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                              top: "0",
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
                          config={{ field: "phone", type: "phone" }}
                          value={query.phone}
                          handleEdit={handleEdit}
                          error={error.phone}
                          errorObj={error}
                          setError={setError}
                          helperText={
                            error.phone
                              ? "Please enter correct Phone Number"
                              : ""
                          }
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root": {
                              fontSize: "15px",
                              top: "-6px",
                            },
                            "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                              top: "0",
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
                          config={{ field: "message" }}
                          value={query.message}
                          handleEdit={handleEdit}
                          error={error.message}
                          errorObj={error}
                          setError={setError}
                          helperText={
                            error.message ? "Please enter a message" : ""
                          }
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root": {
                              fontSize: "15px",
                              top: "-6px",
                            },
                            "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                              top: "0",
                            },
                            "& .MuiOutlinedInput-root": {
                              height: "40px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button
                          color="custom"
                          variant="contained"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                <Typography sx={{ textAlign: "center" }}>
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
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Box>
  );
};

export default FindUs;

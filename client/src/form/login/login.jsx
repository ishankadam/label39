import React, { useState, useEffect } from "react";
import "../../css/login2.css";
import LoginImg from "../../assets/login.png";
import SignupImg from "../../assets/signup.png";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CustomTextfield from "../../components/textfield/customTextfield";
import backgroundImage from "../../assets/leaf-bg2.jpg"; // Import your background image
import TextField from "@mui/material/TextField";

const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // 0-based index for the first image

  const images = [LoginImg, SignupImg];

  const handleToggle = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  // Function to automatically slide the images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensure it covers the full viewport height
        padding: "20px 0px", // Optional: Add some padding
      }}
    >
      <main id="main" className={isSignUpMode ? "sign-up-mode" : ""}>
        <div className="box">
          <div className="inner-box">
            <div className="forms-wrap">
              {/* Sign In Form */}
              <form
                id="forms"
                action="index.html"
                autoComplete="off"
                className="sign-in-form"
              >
                <div className="heading">
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      fontFamily: "'Cinzel Serif', serif ",
                      textAlign: "center",
                      color: "#2f3e4e",
                    }}
                  >
                    LOGIN
                  </Typography>
                </div>

                <div className="actual-form">
                  <div className="form">
                    {/* <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                        fontFamily: "'Roboto Serif', serif ",
                        textAlign: "center",
                        marginBottom: "18px",
                      }}
                    >
                      LOGIN
                    </Typography> */}
                    <div className="input-wrap">
                      <TextField
                        label="Email ID"
                        variant="outlined"
                        color="success"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "15px", // Set the font size
                          },
                        }}
                      />
                    </div>

                    <div className="input-wrap">
                      <TextField
                        label="Password"
                        variant="outlined"
                        color="success"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "15px", // Set the font size
                          },
                        }}
                      />
                      <Link href="#">
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "grey",
                            display: "flex",
                            justifyContent: "right",
                            margin: "5px 0",
                          }}
                        >
                          Forgot Password?
                        </Typography>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="form">
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    value="Log In"
                    className="sign-btn"
                    sx={
                      {
                        // marginTop: 5,
                      }
                    }
                  >
                    Log In
                  </Button>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "grey",
                      display: "flex",
                      justifyContent: "center",
                      margin: "20px 0",
                    }}
                  >
                    Don't have an account?{"    "}
                    <Link onClick={handleToggle}>
                      {" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          marginLeft: "0.4rem",
                          fontWeight: "bold",
                          fontFamily: "'Roboto Serif', serif ",
                          color: "#2f3e4e",
                        }}
                      >
                        Register Here
                      </Typography>
                    </Link>
                  </Typography>
                </div>
              </form>

              {/* Sign Up Form */}
              <form
                action="index.html"
                autoComplete="off"
                id="forms"
                className={`sign-up-form ${
                  isSignUpMode ? "" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="heading">
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "18px",
                        sm: "24px",
                        md: "28px",
                        lg: "28px",
                      },
                      fontWeight: "bold",
                      fontFamily: "'Cinzel Serif', serif ",
                      textAlign: "center",
                      color: "#2f3e4e",
                    }}
                  >
                    CREATE AN ACCOUNT
                  </Typography>
                </div>

                <div className="actual-form">
                  <div className="form">
                    {/* <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                        fontFamily: "'Roboto Serif', serif ",
                        textAlign: "center",
                        marginBottom: "18px",
                      }}
                    >
                      REGISTER
                    </Typography> */}
                    <div className="input-wrap">
                      <TextField
                        label="Name"
                        variant="outlined"
                        color="success"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "15px", // Set the font size
                          },
                        }}
                      />
                    </div>
                    <div className="input-wrap">
                      <TextField
                        label="Email ID"
                        variant="outlined"
                        color="success"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "15px", // Set the font size
                          },
                        }}
                      />
                    </div>
                    <div className="input-wrap">
                      <TextField
                        label="Contact No"
                        variant="outlined"
                        color="success"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "15px", // Set the font size
                          },
                        }}
                      />
                    </div>

                    <div className="input-wrap">
                      <TextField
                        label="Password"
                        variant="outlined"
                        color="success"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "15px", // Set the font size
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form">
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    value="Sign In"
                    className="sign-btn"
                    sx={
                      {
                        // marginTop: 5,
                      }
                    }
                  >
                    GET STARTED
                  </Button>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "grey",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    Already have an account?{"    "}
                    <Link onClick={handleToggle} color="inherit">
                      <Typography
                        sx={{
                          fontSize: "14px",
                          marginLeft: "0.4rem",
                          fontWeight: "bold",
                          fontFamily: "'Roboto Serif', serif ",
                          color: "#2f3e4e",
                        }}
                      >
                        Login Here
                      </Typography>
                    </Link>
                  </Typography>
                </div>
              </form>
            </div>

            {/* Carousel */}
            <div className="carousel">
              <div className="images-wrapper">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className={`image ${activeSlide === index ? "show" : ""}`}
                    alt={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

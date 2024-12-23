import React, { useState, useEffect } from "react";
import "../../css/login2.css";
import LoginImg from "../../assets/login.png";
import SignupImg from "../../assets/signup.png";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextfield from "../../components/textfield/customTextfield";
import backgroundImage from "../../assets/about.png"; // Import your background image
import TextField from "@mui/material/TextField";
import { login } from "../../api";

const Login = (props) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // 0-based index for the first image
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const images = [LoginImg, SignupImg];

  const handleToggle = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const navigate = useNavigate();
  // Function to automatically slide the images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await login(user, error, setError, navigate);
      if (loggedInUser) {
        navigate("/"); // Redirect to the homepage or another route after successful login
        props.setUserUpdated(true);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleEdit = (value, field) => {
    setUser({ ...user, [field]: value });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
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
                onSubmit={handleSubmit}
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
                      <CustomTextfield
                        id="login-email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={user.email}
                        error={error.email}
                        errorObj={error}
                        setError={setError}
                        helperText={
                          error.email ? "Please enter correct Email" : ""
                        }
                        config={{ field: "email", type: "email" }}
                        handleEdit={handleEdit}
                        sx={{ width: "100%" }}
                      />
                    </div>

                    <div className="input-wrap">
                      <CustomTextfield
                        label="Password"
                        variant="outlined"
                        color="success"
                        fullWidth
                        value={user.password}
                        error={error.password}
                        errorObj={error}
                        setError={setError}
                        helperText={
                          error.password ? "Please enter correct password" : ""
                        }
                        config={{ field: "password" }}
                        handleEdit={handleEdit}
                        type="password"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "15px", // Set the font size
                          },
                          width: "100%",
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
                    color="custom"
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
                      fontSize: "28px",
                      fontWeight: "bold",
                      fontFamily: "'Cinzel Serif', serif ",
                      textAlign: "center",
                      color: "#2f3e4e",
                      paddingBottom: "20px",
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
                    color="custom"
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

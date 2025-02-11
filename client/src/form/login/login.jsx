import React, { useEffect, useState } from "react";
import "../../css/login2.css";
// import LoginImg from "../../assets/login.jpg";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser, login } from "../../api";
import backgroundImage from "../../assets/backgroundfooter.jpg"; // Import your background image
import SignupImg from "../../assets/signup.jpeg";
import CustomTextfield from "../../components/textfield/customTextfield";
import { showSnackbar } from "../../store/cartSlice";

const Login = (props) => {
  const dispatch = useDispatch();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // 0-based index for the first image
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [signupDisabled, setSignupDisabled] = useState(true);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [newUserError, setNewUserError] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const images = [SignupImg];

  useEffect(() => {
    if (
      newUser.name !== "" &&
      newUser.email !== "" &&
      newUser.password !== "" &&
      newUser.phone !== ""
    ) {
      setSignupDisabled(false);
    } else {
      setSignupDisabled(true);
    }
  }, [newUser]);

  const handleToggle = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  useEffect(() => {
    console.log(isSignUpMode);
  }, [isSignUpMode]);

  const navigate = useNavigate();
  // Function to automatically slide the images

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await login(user, error, setError, navigate);
      if (loggedInUser) {
        navigate("/"); // Redirect to the homepage or another route after successful login
        props.setUserUpdated(true);
        dispatch(
          showSnackbar({
            message: `Welcome! You're now logged in. `,
            severity: "success",
          })
        );
      }
    } catch (err) {
      console.error("Login failed:", err);
      dispatch(
        showSnackbar({
          message: "Oops! Something went wrong. Unable to log in.",
          severity: "error",
        })
      );
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await createUser({ userDetails: newUser });
    console.log(response);
    if (response.success) {
      setIsSignUpMode(!isSignUpMode);
      dispatch(
        showSnackbar({
          message: response.message,
          severity: response.severity,
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: response.message,
          severity: response.severity,
        })
      );
    }
  };

  const handleEdit = (value, field) => {
    setUser({ ...user, [field]: value });
  };

  const handleEditNewUser = (value, field) => {
    setNewUser({ ...newUser, [field]: value });
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px 0px", // Optional: Add some padding
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
      <main
        id="main"
        className={isSignUpMode ? "sign-up-mode" : ""}
        style={{
          position: "relative", // Ensure content stays above the overlay
          zIndex: 2,
        }}
      >
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
                    <div className="login-input-wrap">
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

                    <div className="login-input-wrap">
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
                      <Link to="/forgotPassword">
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
                    value="Log In"
                    className="sign-btn"
                    sx={
                      {
                        // marginTop: 5,
                      }
                    }
                    onClick={handleLogin}
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
                      <CustomTextfield
                        id="name"
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={newUser.name}
                        error={newUserError.name}
                        errorObj={newUserError}
                        setError={setNewUserError}
                        helperText={
                          newUserError.name ? "Please enter correct Name" : ""
                        }
                        config={{ field: "name" }}
                        handleEdit={handleEditNewUser}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="input-wrap">
                      <CustomTextfield
                        id="login-email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={newUser.email}
                        error={newUserError.email}
                        errorObj={newUserError}
                        setError={setNewUserError}
                        helperText={
                          newUserError.email ? "Please enter correct Email" : ""
                        }
                        config={{ field: "email", type: "email" }}
                        handleEdit={handleEditNewUser}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="input-wrap">
                      <CustomTextfield
                        id="phone"
                        label="Phone Number"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={user.phone}
                        error={error.phone}
                        errorObj={newUserError}
                        setError={setNewUserError}
                        helperText={
                          newUserError.phone
                            ? "Please enter correct Phone Number"
                            : ""
                        }
                        config={{ field: "phone", type: "phone" }}
                        handleEdit={handleEditNewUser}
                        sx={{ width: "100%" }}
                      />
                    </div>

                    <div className="input-wrap">
                      <CustomTextfield
                        label="Password"
                        variant="outlined"
                        color="success"
                        fullWidth
                        value={newUser.password}
                        error={newUserError.password}
                        errorObj={newUserError}
                        setError={setNewUserError}
                        helperText={
                          newUserError.password
                            ? "Please enter correct password"
                            : ""
                        }
                        config={{ field: "password" }}
                        handleEdit={handleEditNewUser}
                        type="password"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "15px", // Set the font size
                          },
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form">
                  <Button
                    variant="contained"
                    color="custom"
                    value="Sign In"
                    className="sign-btn"
                    sx={
                      {
                        // marginTop: 5,
                      }
                    }
                    disabled={signupDisabled}
                    onClick={handleSignup}
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

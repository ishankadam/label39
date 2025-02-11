import { Box, Button, Card, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../../assets/signup.png";
import { hasEmptyField } from "../../common";
import CustomTextfield from "../../components/textfield/customTextfield";

import { Cancel, CheckCircle } from "@mui/icons-material";
import { createUser } from "../../api";
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [validation, setValidation] = useState({
    minLength: null,
    uppercase: null,
    lowercase: null,
    digit: null,
    specialChar: null,
  });

  const handleEdit = (value, field) => {
    setUser((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  useEffect(() => {
    const hasErrors = Object.values(error).some((err) => err === true);
    const hasEmptyFields = hasEmptyField(user);
    setButtonDisabled(hasEmptyFields || hasErrors);
  }, [user, error]);

  const BulletPoint = ({ condition, text }) => (
    <Box
      display="flex"
      alignItems="center"
      mb={1}
      color={condition !== null ? (condition ? "green" : "red") : "grey"}
    >
      {condition ? <CheckCircle /> : <Cancel />}
      <Typography ml={1}>{text}</Typography>
    </Box>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError({ ...error, confirmPassword: true });
    } else {
      setError({ ...error, confirmPassword: false });
    }
    const response = createUser({ userDetails: user });
    console.log(response);
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: "70%",
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px",
      }}
    >
      {/* Image Section */}
      <div
        style={{
          flex: 1,
          maxWidth: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          key={`login-Thumbnail`}
          src={signup}
          alt={`login-Thumbnail`}
          style={{
            width: "400px",
            height: "600px",
            objectFit: "cover",
            borderRadius: "2%",
          }}
        />
      </div>

      {/* Form Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
          maxWidth: "50%",
        }}
      >
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          LET'S GET YOU STARTED
        </Typography>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "left",
          }}
        >
          CREATE AN ACCOUNT
        </Typography>
        <CustomTextfield
          id="login-fullName"
          label="Full Name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={user.name}
          error={error.name}
          errorMessage="This field is required"
          helperText={error.name ? "Please enter your full name" : ""}
          errorObj={error}
          setError={setError}
          config={{ isrequired: true, field: "name", type: "name" }}
          handleEdit={handleEdit}
        />
        <CustomTextfield
          id="login-email"
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          type="email"
          value={user.email}
          error={error.email}
          errorMessage="This field is required"
          helperText={error.email ? "Please enter correct email id" : ""}
          errorObj={error}
          setError={setError}
          config={{ isrequired: true, field: "email", type: "email" }}
          handleEdit={handleEdit}
        />
        <CustomTextfield
          id="login-phone"
          label="Phone Number"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={user.phone}
          error={error.phone}
          errorMessage="This field is required"
          helperText={
            error.phone ? "Please enter your correct phone number" : ""
          }
          errorObj={error}
          setError={setError}
          type="number"
          config={{ isrequired: true, field: "phone", type: "phone" }}
          handleEdit={handleEdit}
        />
        <Box>
          <CustomTextfield
            label="Password"
            type="password"
            value={user.password}
            error={error.password}
            errorObj={error}
            setError={setError}
            handleEdit={handleEdit}
            variant="outlined"
            fullWidth
            setValidation={setValidation}
            errorMessage="This field is required"
            helperText={error.password ? "Please enter your passowrd" : ""}
            config={{ isrequired: true, field: "password", type: "password" }}
            sx={{ width: "100%" }}
          />
          <Box mt={2}>
            <Typography variant="body2">
              <BulletPoint
                condition={validation.minLength}
                text="At least 8 characters"
              />
              <BulletPoint
                condition={validation.uppercase}
                text="At least one uppercase letter"
              />
              <BulletPoint
                condition={validation.lowercase}
                text="At least one lowercase letter"
              />
              <BulletPoint
                condition={validation.digit}
                text="At least one digit"
              />
              <BulletPoint
                condition={validation.specialChar}
                text="At least one special character"
              />
            </Typography>
          </Box>
        </Box>
        <CustomTextfield
          id="signup-confirm-password"
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          type="password"
          value={user.confirmPassword}
          error={error.confirmPassword}
          errorObj={error}
          setError={setError}
          errorMessage="This field is required"
          helperText={error.confirmPassword ? "Password does not match" : ""}
          config={{
            isrequired: true,
            field: "confirmPassword",
            type: "password",
          }}
          handleEdit={handleEdit}
        />

        <Button
          color="success"
          variant="contained"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
          disabled={buttonDisabled}
          onClick={handleSubmit}
        >
          GET STARTED
        </Button>

        <Typography align="center" sx={{ margin: "10px 0" }}>
          or
        </Typography>

        <Typography align="center">
          Already have an account?
          <Link
            underline="hover"
            onClick={() => {
              navigate("/login");
            }}
          >
            LOGIN HERE
          </Link>
        </Typography>
      </div>
    </Card>
  );
};

export default Signup;

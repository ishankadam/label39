import { Button, Card, Link, Typography } from "@mui/material";
import React from "react";
import CustomTextfield from "../../components/textfield/customTextfield";
import signup from "../../assets/signup.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
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
        <CustomTextfield label="Email" sx={{ marginTop: "20px" }} />
        <CustomTextfield
          label="Contact No"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        />
        <CustomTextfield
          label="Email"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        />
        <CustomTextfield
          label="Password"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        />

        <Button
          color="success"
          variant="contained"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
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

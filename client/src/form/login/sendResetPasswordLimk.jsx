import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../api";
import CustomTextfield from "../../components/textfield/customTextfield";
import { showSnackbar } from "../../store/cartSlice";
import backgroundImage from "../../assets/backgroundfooter.jpg";
import LockIcon from "@mui/icons-material/Lock";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email });

      if (!response.isValid) {
        setMessage(response.message);
        dispatch(
          showSnackbar({ message: response.message, severity: "error" })
        );
      } else {
        dispatch(
          showSnackbar({
            message: "A reset link has been sent to your email.",
            severity: "success",
          })
        );
        setMessage(""); // Clear error message if successful
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Network error. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        // p: 2,
      }}
    >
      {/* Transparent Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(224, 211, 208, 0.9)",
        }}
      />

      <Card
        sx={{
          margin: "20px",
          marginTop: "-15vh",
          position: "relative",
          maxWidth: 400,
          width: "100%",
          boxShadow: 2,
          zIndex: 1,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LockIcon sx={{ fontSize: 80, color: "#A16149" }} />
          <Typography
            variant="h6"
            sx={{
              // mb: 2,
              fontWeight: "600",
              fontSize: {
                xs: "20px",
                sm: "22px",
                md: "24px",
                lg: "28px",
              },
              color: "#2F3E4E",
              fontFamily: "'Cinzel', serif ",
            }}
          >
            Forgot Password
          </Typography>
          <CustomTextfield
            label="Email"
            type="email"
            config={{ field: "email" }}
            value={email}
            handleEdit={setEmail}
            required
            fullWidth
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="custom"
            fullWidth
            onClick={handleSubmit}
          >
            Send Reset Link
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              textAlign: "center",
              fontFamily: "'Roboto Serif', serif",
            }}
          >
            We'll send you an email with instructions to reset your password.
          </Typography>
          {/* {message && <Alert severity="error">{message}</Alert>} */}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;

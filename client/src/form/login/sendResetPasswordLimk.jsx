import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../api";
import CustomTextfield from "../../components/textfield/customTextfield";
import { showSnackbar } from "../../store/cartSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleEdit = (value) => {
    setEmail(value);
  };

  const snackbar = useSelector((state) => state.cart.snackbars);
  console.log(snackbar);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email });
      console.log(response);
      // Assuming the response has the structure { isValid: false, message: 'User not found' }
      if (!response.isValid) {
        setMessage(response.message); // Set the error message if user is not found
        dispatch(
          showSnackbar({
            message: response.message,
            severity: "error",
          })
        );
      } else {
        console.log("test");
        dispatch(
          showSnackbar({
            message: "A reset link has been sent to your email.",
            severity: "success",
          })
        );
      }
    } catch (error) {
      console.error(error);

      // Improved error handling
      if (error.response) {
        // Check if error.response and error.response.data exist before accessing message
        setMessage(
          error.response.data?.message || "An unexpected error occurred."
        );
      } else {
        setMessage(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Forgot Password
          </Typography>
          <CustomTextfield
            label="Email"
            type="email"
            config={{ field: "email" }}
            value={email}
            handleEdit={handleEdit}
            required
            fullWidth
            variant="outlined"
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
          {message && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;

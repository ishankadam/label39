import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api";
import CustomTextfield from "../../components/textfield/customTextfield";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();
  const handleEdit = (value) => {
    setNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword({ token, newPassword });
      setMessage(response.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <CustomTextfield
            label="New password"
            type="password"
            config={{ field: "newPassword" }}
            value={newPassword}
            handleEdit={handleEdit}
            required
            fullWidth
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
        {message && (
          <Typography color="primary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default ResetPassword;

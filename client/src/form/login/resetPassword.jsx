import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api";
import CustomTextfield from "../../components/textfield/customTextfield";
import LockResetIcon from "@mui/icons-material/LockReset";
import backgroundImage from "../../assets/backgroundfooter.jpg";

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
    // <Container maxWidth="sm">
    //   <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
    //     <Typography variant="h4" component="h2" gutterBottom>
    //       Reset Password
    //     </Typography>
    //     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    //       <CustomTextfield
    //         label="New password"
    //         type="password"
    //         config={{ field: "newPassword" }}
    //         value={newPassword}
    //         handleEdit={handleEdit}
    //         required
    //         fullWidth
    //         variant="outlined"
    //         sx={{ width: "100%" }}
    //       />
    //       <Button type="submit" variant="contained" color="custom" fullWidth>
    //         Reset Password
    //       </Button>
    //     </Box>
    //     {message && (
    //       <Typography color="primary" sx={{ mt: 2 }}>
    //         {message}
    //       </Typography>
    //     )}
    //   </Paper>
    // </Container>
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
          <LockResetIcon sx={{ fontSize: 80, color: "#A16149" }} />
          <Typography
            variant="h6"
            sx={{
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
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <CustomTextfield
              label="New password"
              type="password"
              config={{ field: "newPassword" }}
              value={newPassword}
              handleEdit={handleEdit}
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
              sx={{ mt: 2, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>

          {/* {message && <Alert severity="error">{message}</Alert>} */}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ResetPassword;

import { useState } from "react";
import { Box, Typography, Button, keyframes } from "@mui/material";
import { useNavigate } from "react-router-dom";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const PageNotFound = () => {
  const navigate = useNavigate();

  const [isShaking, setIsShaking] = useState(false);

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "93vh",
        backgroundColor: "#f5e6e0",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          animation: `${float} 3s ease-in-out infinite`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", sm: "8rem", md: "10rem" },
            fontWeight: "bold",
            color: "#a16149",
            mb: 2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            textAlign: "center",
            mb: 4,
            color: "#a16149",
            maxWidth: "80%",
            animation: isShaking ? `${shake} 0.5s ease-in-out` : "none",
          }}
          onClick={handleShake}
        >
          Oops! The page you are looking for does not exist.
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{
          fontSize: { xs: "1rem", sm: "1.2rem" },
          padding: "10px 30px",
          borderRadius: "5px",
          backgroundColor: "#a16149",
          color: "#ffffff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#8a5340",
            transform: "translateY(-5px) scale(1.05)",
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default PageNotFound;

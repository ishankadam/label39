import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { featured } from "../../common";
import { setFilter } from "../../store/cartSlice";

const ShopDialog = (props) => {
  const [categories, setCategories] = useState(props.allCategories);
  const [formattedCategories, setFormattedCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    if (!categories) return;
    const formattedCategories = categories
      .filter((row) => row.show)
      .map((category) => ({
        label: category.name,
        value: category.value,
      }));
    setFormattedCategories(formattedCategories);
  }, [categories]);

  const handlePageChange = (page, category, field) => {
    navigate(page);
    category && dispatch(setFilter({ [field]: category }));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        borderRadius: 1,
        margin: "2px",
        width: { sm: "460px", md: "460px", lg: "480px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box sx={{ marginBottom: "5px", textAlign: "center" }}>
          {}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              color: "#2f3e4e",
              mb: 1,
              fontFamily: "'Cinzel', serif",
              fontWeight: "600",
            }}
          >
            CATEGORIES
          </Typography>
          <>
            {formattedCategories.map((category) => {
              return (
                <Button
                  key={category.label}
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    color: "#677489",
                    fontFamily: "'Cinzel', serif",
                    fontWeight: "600",
                    mb: "5px",
                    "&:hover": {
                      color: "#a16149",
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={() =>
                    handlePageChange("/shop", category.value, "category")
                  }
                >
                  {category.label}
                </Button>
              );
            })}
          </>
        </Box>

        <Box sx={{ marginBottom: "5px", textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#2f3e4e",
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              mb: 1,
              fontFamily: "'Cinzel', serif",
              fontWeight: "600",
            }}
          >
            FEATURED
          </Typography>
          {featured.map((feature) => (
            <Button
              key={feature}
              sx={{
                textAlign: "center",
                width: "100%",
                color: "#677489",
                fontFamily: "'Cinzel', serif",
                fontWeight: "600",
                mb: "5px",
                "&:hover": {
                  color: "#a16149",
                  backgroundColor: "transparent",
                },
              }}
              onClick={() =>
                handlePageChange("/shop", feature.value, "featured")
              }
            >
              {feature.label}
            </Button>
          ))}
        </Box>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            height: "200px",
            width: "200px",
          }}
        >
          <img
            src={shopImage}
            alt="Shop Preview"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box> */}
      </Box>
    </Container>
  );
};

export default ShopDialog;

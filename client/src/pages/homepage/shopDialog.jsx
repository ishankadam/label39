import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../../store/cartSlice";

const featured = [
  { label: "NEW ARRIVAL", value: "newArrival" },
  { label: "BEST SELLERS", value: "bestSellers" },
  { label: "Ready to ship", value: "readyToShip" },
  { label: "AS SEEN ON - CELEBRITY STYLE", value: "asSeenOn" },
  { label: "CLIENTS DAIRY", value: "clientsDiaries" },
];

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

  const handlePageChange = (page, category) => {
    console.log(page);
    navigate(page);
    category && dispatch(setFilter({ category }));
  };

  return (
    <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
          {}
          <Typography
            variant="h6"
            sx={{
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
                  sx={{ textAlign: "left", width: "100%", color: "#677489" }}
                  onClick={() => handlePageChange("/shop", category.value)}
                >
                  {category.label}
                </Button>
              );
            })}
          </>
        </Box>

        <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#2f3e4e",
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
              sx={{ textAlign: "left", width: "100%", color: "#677489" }}
              onClick={() => handlePageChange(feature.value)}
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
    </Box>
  );
};

export default ShopDialog;

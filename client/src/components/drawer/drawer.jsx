import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import bestseller1 from "../../assets/bestSellerP1.jpg";
import bestseller2 from "../../assets/bestSellerP4.jpg";
import CustomTextfield from "../textfield/customTextfield";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CustomDrawer = (props) => {
  const [cartDetails, setCartDetails] = useState(props.cartDetails || {});
  const [displayNote, setDisplayNote] = useState(false);
  useEffect(() => {
    setCartDetails(props.cartDetails);
  }, [props.cartDetails]);
  const cartItems = [
    {
      id: 1,
      image: bestseller1, // Replace with actual image URL
      title: "Gulshan Anarkali with Embroidered Jacket",
      price: 59900,
      quantity: 1,
      size: "M",
    },
    {
      id: 2,
      image: bestseller2, // Replace with actual image URL
      title: "Classic Silk Saree",
      price: 45000,
      quantity: 1,
      size: "Free Size",
    },
    {
      id: 3,
      image: bestseller2, // Replace with actual image URL
      title: "Classic Silk Saree",
      price: 45000,
      quantity: 1,
      size: "Free Size",
    },
  ];

  const handleOrderNote = () => {
    setDisplayNote(!displayNote);
  };

  const onClose = () => {
    props.setCartDetails((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={cartDetails.open}
        onClose={onClose}
        PaperProps={{
          sx: { width: { xs: "90%", sm: "50%", md: "30%" } }, // Adjust the width as needed
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            border: "1px solid #2f3e4e",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#2f3e4e",

                fontFamily: "'cinzel', serif",
                fontWeight: "700",
              }}
            >
              cart
            </Typography>
            <IconButton>
              <CloseIcon sx={{ color: "#2f3e4e" }} onClick={onClose} />
            </IconButton>
          </Box>

          <Box sx={{ overflowY: "scroll", height: "80%" }}>
            {/* Cart item */}
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  mt: 2,
                  mb: 2,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    aspectRatio: "2:3",
                    width: "120px",
                    height: "180px",
                    marginRight: 16,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Roboto Serif', serif",
                      fontWeight: "400",
                      fontSize: { xs: "11px", sm: "12px", md: "16px" },
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Roboto Serif', serif",
                      fontWeight: "400",
                      fontSize: { xs: "11px", sm: "12px", md: "15px" },
                      mb: 1,
                    }}
                    color="textSecondary"
                  >
                    Size : {item.size}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Roboto Serif', serif",
                      fontWeight: "400",
                      fontSize: { xs: "11px", sm: "12px", md: "15px" },
                      mb: 1,
                    }}
                    color="textSecondary"
                  >{`Rs. ${item.price}`}</Typography>
                  <IconButton
                    // onClick={() => handleQuantityChange(item.id, "decrease")}
                    size="small"
                    sx={{
                      border: "1px solid #ccc", // Outlined style
                      borderRadius: "4px",
                      padding: "4px",
                      mr: 1,
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" component="span" sx={{ mx: 1 }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    // onClick={() => handleQuantityChange(item.id, "increase")}
                    size="small"
                    sx={{
                      border: "1px solid #ccc", // Outlined style
                      borderRadius: "4px",
                      padding: "4px",
                      ml: 1,
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  {/* <br /> */}
                  <Button
                    // onClick={() => handleRemoveItem(item.id)}
                    color="textSecondary"
                    size="small"
                    sx={{
                      ml: 2,
                      fontFamily: "'Roboto Serif', serif",
                      fontWeight: "400",
                      fontSize: { xs: "11px", sm: "12px", md: "13px" },
                      mt: 1,
                      textDecoration: "underline !important",
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          <Box mt="auto" sx={{}}>
            <Box sx={{ display: "grid" }}>
              <Link
                onClick={handleOrderNote}
                sx={{
                  color: "#2f3e4e",
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "400",
                  fontSize: { xs: "11px", sm: "12px", md: "15px" },
                  mt: 2,
                  mb: 2,
                  textDecoration: "underline !important",
                }}
              >
                Add Order Note
              </Link>
              {displayNote && (
                <CustomTextfield
                  label="Order Note"
                  sx={{ mb: 1 }}
                ></CustomTextfield>
              )}
            </Box>

            <Typography
              display="block"
              color="textSecondary"
              sx={{
                fontSize: { xs: "11px", sm: "12px", md: "15px" },
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "400",
                mb: 1,
              }}
            >
              Taxes and shipping calculated at checkout
            </Typography>
            <Typography
              display="block"
              variant="subtitle2"
              sx={{
                fontSize: { xs: "11px", sm: "12px", md: "15px" },
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "600",
                mb: 1,
              }}
            >
              By clicking checkout, you agree to terms and conditions
            </Typography>
            <Button
              variant="contained"
              // color="success"
              sx={{
                letterSpacing: "2px",
                fontFamily: "'cinzel', serif",
                fontWeight: "700",
                borderRadius: 0,
                padding: "8px 5px",
                backgroundColor: "#a16149",
                color: "#fff",
                boxShadow: "none",
              }}
              fullWidth
            >
              Checkout • Rs.{" "}
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default CustomDrawer;

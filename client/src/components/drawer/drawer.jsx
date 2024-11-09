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
import bestseller1 from "../../assets/bestseller1.jpeg";
import bestseller2 from "../../assets/bestseller2.jpeg";
import CustomTextfield from "../textfield/customTextfield";

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
          sx: { width: 400 }, // Adjust the width as needed
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Cart</Typography>
            <IconButton>
              <CloseIcon onClick={onClose} />
            </IconButton>
          </Box>

          {/* Cart item */}
          {cartItems.map((item) => (
            <Box key={item.id} sx={{ display: "flex", mt: 2, mb: 2 }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: 80, height: 80, marginRight: 16 }}
              />
              <Box>
                <Typography variant="body1">{item.title}</Typography>
                <Typography variant="body1">Size : {item.size}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`Rs. ${item.price}`}</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    // onClick={() => handleQuantityChange(item.id, "decrease")}
                  >
                    -
                  </Button>
                  <Typography mx={1}>{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    // onClick={() => handleQuantityChange(item.id, "increase")}
                  >
                    +
                  </Button>
                </Box>
                <Button
                  //   onClick={() => handleRemoveItem(item.id)}
                  color="primary"
                  size="small"
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}

          <Box mt="auto" sx={{}}>
            <Box sx={{ display: "grid" }}>
              <Link onClick={handleOrderNote}>Add Order Note</Link>
              {displayNote && (
                <CustomTextfield label="Order Note"></CustomTextfield>
              )}
            </Box>

            <Typography variant="caption" display="block" sx={{ mb: 1 }}>
              Taxes and shipping calculated at checkout
            </Typography>
            <Typography variant="caption" display="block" sx={{ mb: 2 }}>
              By clicking checkout, you agree to terms and conditions
            </Typography>
            <Button variant="contained" fullWidth>
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

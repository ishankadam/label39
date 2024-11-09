/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import bestseller1 from "../../assets/bestseller1.jpeg";
import bestseller2 from "../../assets/bestseller2.jpeg";
const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image: bestseller1,
      title: "Prajakta Koli in Marble Cape Set",
      price: 49900,
      quantity: 1,
      size: "XS",
    },
    {
      id: 2,
      image: bestseller2,
      title: "Genelia Deshmukh in Gulshan Anarkali with Embroidered Jacket",
      price: 59900,
      quantity: 1,
      size: "M",
    },
  ];

  const handleQuantityChange = (id, action) => {
    console.log(`Change quantity of item ${id} with action ${action}`);
  };

  const handleRemoveItem = (id) => {
    console.log(`Remove item with id ${id}`);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div>
      <Box sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          Cart
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Product
            </Typography>
          </Grid>
          <Grid item xs={3} textAlign="center">
            <Typography variant="subtitle1" color="textSecondary">
              Quantity
            </Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography variant="subtitle1" color="textSecondary">
              Total
            </Typography>
          </Grid>

          {cartItems.map((item) => (
            <Grid
              container
              key={item.id}
              spacing={2}
              sx={{ borderBottom: "1px solid #ccc", paddingY: 2 }}
            >
              <Grid item xs={6} sx={{ display: "flex" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 120, height: 150, marginRight: 16 }}
                />
                <Box>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >{`Rs. ${item.price.toLocaleString()}`}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.size}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={3}
                textAlign="center"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography variant="body1" sx={{ mx: 1 }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange(item.id, "increase")}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  color="primary"
                  size="small"
                >
                  Remove
                </Button>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body1">{`Rs. ${(
                  item.price * item.quantity
                ).toLocaleString()}`}</Typography>
              </Grid>
            </Grid>
          ))}

          {/* Order Note */}
          <Grid container spacing={2}>
            {/* Add order note section */}
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Add order note
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="How can we help you?"
              />
            </Grid>

            {/* Total and checkout section */}
            <Grid item xs={6} textAlign="right" sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {`Total: Rs. ${totalPrice.toLocaleString()}`}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                Taxes and{" "}
                <a href="#" style={{ color: "#007bff" }}>
                  shipping
                </a>{" "}
                calculated at checkout
              </Typography>
              <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                By clicking checkout, you agree to terms and conditions
              </Typography>
              <Button variant="contained" fullWidth>
                Checkout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Cart;

import React from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Card,
  Badge,
} from "@mui/material";
import { cartItems } from "../../common";
import CustomTextfield from "../../components/textfield/customTextfield";

const CheckoutProducts = (props) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "none !important",
        boxShadow: "none",
        width: "50%",
        // maxWidth: 600,
        margin: "auto",
        borderLeft: "1px solid #ccc",
      }}
    >
      {" "}
      {cartItems.map((item) => (
        <Grid
          container
          key={item.id}
          spacing={2}
          sx={{ borderBottom: "1px solid #ccc", paddingY: 2 }}
        >
          <Grid item xs={6} sx={{ display: "flex" }}>
            <Badge badgeContent={item.quantity} color="info">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: 120, height: 150, marginRight: 16 }}
              />
            </Badge>
            <Box>
              <Typography variant="body1">{item.title}</Typography>
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
          ></Grid>
          <Grid item xs={3} textAlign="right">
            <Typography variant="body1">{`Rs. ${(
              item.price * item.quantity
            ).toLocaleString()}`}</Typography>
          </Grid>
        </Grid>
      ))}
      <CustomTextfield
        label="Discount code and Gift card"
        config={{ field: "pincode", isRequired: true }}
        handleEdit={props.handleEdit}
        sx={{ margin: "10px" }}
      ></CustomTextfield>
      <Button variant="contained" color="info">
        Apply
      </Button>
      <Grid item xs={6} textAlign="right" sx={{ mt: 2 }}>
        <Typography>{`Subtotal  ${cartItems.length} items`}</Typography>
        <Typography variant="h6" gutterBottom>
          {`INR. ₹ ${totalPrice.toLocaleString()}`}
        </Typography>
        <Typography>Shipping</Typography>
        <Typography variant="h6" gutterBottom>
          Free
        </Typography>
        <Typography>Total</Typography>
        <Typography variant="h6" gutterBottom>
          {`INR. ₹ ${totalPrice.toLocaleString()}`}
        </Typography>
      </Grid>
    </Card>
  );
};

export default CheckoutProducts;

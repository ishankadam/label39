import React, { useState } from "react";
import {
  Button,
  Card,
  Typography,
  Grid,
  Box,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomTextfield from "../../components/textfield/customTextfield";
import { useSelector } from "react-redux";
import { imageUrl } from "../../api";
import { createOrder } from "../../api";
const { RAZORPAY_KEY_ID } = process.env;
export const razorpayId = RAZORPAY_KEY_ID;

const CheckoutForm = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [checkoutData, setCheckoutData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  const handleEdit = (value, field) => {
    setCheckoutData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOrderPlacement = async () => {
    const amount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    try {
      const { orderId } = await createOrder(amount);
      const options = {
        key: razorpayId, // Replace with your key_id
        amount: amount * 100, // Amount in the smallest currency unit
        currency: "INR",
        name: "The Label 39",
        description: "Payment Description",
        order_id: orderId,
        handler: function (response) {
          alert("Payment Successful!");
          console.log(response);
        },
        prefill: {
          name: "TheLabel39",
          email: "thelabel39@gmail.com",
          contact: "96749 49842",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log(rzp);
    } catch (error) {
      console.error("Payment failed:", error);
    }
    console.log(checkoutData);
  };

  return (
    <>
      {/* Accordion */}
      <Accordion
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          background: "#F6F6F6",
          boxShadow: "none",
          borderBottom: "1px solid #ccc",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "'Roboto Serif', serif", fontWeight: "500" }}
          >
            Show Order Summary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card
            sx={{
              padding: "2%",
              borderRadius: "none !important",
              boxShadow: "none",
              width: { xs: "100%", sm: "100%", md: "45%" },
              border: "1px solid #ccc",
              background: "#FAFAFA",
            }}
          >
            {/* Cart item */}
            {cartItems.map((item) => (
              <Grid
                key={item.id}
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2, // Spacing between elements
                  margin: "2vh 0",
                }}
              >
                <Badge badgeContent={item.quantity} color="warning">
                  <Box
                    sx={{
                      position: "relative",
                      border: "1px solid #ccc",
                      width: "70px",
                      height: "70px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    {/* Image */}
                    <img
                      src={`${imageUrl}products/${item.images[0]}`}
                      alt={item.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Badge>

                {/* Title and Size */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Roboto Serif', serif",
                      fontWeight: "500",
                      fontSize: { xs: "11px", sm: "12px", md: "14px" },
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      fontFamily: "'Roboto Serif', serif",
                      fontWeight: "400",
                      fontSize: { xs: "11px", sm: "12px", md: "13px" },
                    }}
                  >
                    Size: {item.size}
                  </Typography>
                </Box>

                {/* Price */}
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Roboto Serif', serif",
                    fontWeight: "500",
                    fontSize: { xs: "11px", sm: "12px", md: "14px" },
                  }}
                >
                  {`Rs. ${(item.price * item.quantity).toLocaleString()}`}
                </Typography>
              </Grid>
            ))}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px", // Space between the TextField and Button
                margin: "3vh 0",
              }}
            >
              <CustomTextfield
                label="Discount code and Gift card"
                config={{ field: "pincode", isRequired: true }}
                handleEdit={handleEdit}
                sx={{
                  flex: 1, // Allows the TextField to take remaining space
                  height: "56px", // Matches the default Button height
                }}
                value={checkoutData.pincode}
              />
              <Button
                variant="contained"
                sx={{
                  height: "56px", // Matches the height of the CustomTextfield
                  minWidth: "100px", // Optional: ensures the button isn't too narrow
                  backgroundColor: "#F1F1F1", // Button background color
                  color: "#6A6A6A",
                  boxShadow: "none",
                  border: "1px solid #ccc", // Button text color
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                Apply
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px", // Space between the TextField and Button
                margin: "3vh 0",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "500",
                  fontSize: { xs: "11px", sm: "12px", md: "14px" },
                }}
              >{`Subtotal . ${cartItems.length} items`}</Typography>
              <Typography
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "500",
                  fontSize: { xs: "11px", sm: "12px", md: "14px" },
                }}
              >
                {`INR. ₹ ${totalPrice.toLocaleString()}`}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px", // Space between the TextField and Button
                margin: "3vh 0",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "500",
                  fontSize: { xs: "11px", sm: "12px", md: "14px" },
                }}
              >
                Shipping
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "500",
                  fontSize: { xs: "11px", sm: "12px", md: "14px" },
                }}
              >
                FREE
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px", // Space between the TextField and Button
                margin: "3vh 0",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "700",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                }}
              >
                Total
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "700",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                }}
              >
                {`INR. ₹ ${totalPrice.toLocaleString()}`}
              </Typography>
            </Box>
          </Card>
        </AccordionDetails>
      </Accordion>

      <Card
        sx={{
          display: "flex",
          boxShadow: "none",
          border: "1px solid #ccc",
          margin: "20px 4%",
        }}
      >
        {/* card1 */}
        <Card
          sx={{
            padding: "2%",
            overflowY: { xs: "none", sm: "none", md: "scroll" },
            height: { xs: "auto", sm: "auto", md: "80vh" },
            borderRadius: "none !important",
            boxShadow: "none",
            width: { xs: "100%", sm: "100%", md: "55%" },

            // Custom Scrollbar Styles
            "&::-webkit-scrollbar": {
              width: "6px", // Slim scrollbar width
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0", // Track background color
              borderRadius: "10px", // Rounded corners for the track
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Scrollbar thumb color
              borderRadius: "10px", // Pill-shaped scrollbar
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Darker thumb color on hover
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "600",
                  mb: 2,
                }}
              >
                Contact
              </Typography>
              <CustomTextfield
                label="Phone number"
                value={checkoutData.phone}
                config={{ field: "phone", type: "phone", isRequired: true }}
                handleEdit={handleEdit}
                sx={{ width: "100%" }}
              ></CustomTextfield>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  mt: 3,
                  fontWeight: "600",
                }}
              >
                Delivery
              </Typography>
            </Grid>

            {/* First Name and Last Name on the same row */}
            <Grid item xs={12} sm={6}>
              <CustomTextfield
                label="First Name"
                variant="outlined"
                value={checkoutData.firstName}
                config={{ field: "firstName", isRequired: true }}
                handleEdit={handleEdit}
                fullWidth
                required
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextfield
                label="Last Name"
                variant="outlined"
                value={checkoutData.lastName}
                config={{ field: "lastName", isRequired: true }}
                handleEdit={handleEdit}
                fullWidth
                required
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextfield
                label="Email"
                variant="outlined"
                value={checkoutData.email}
                config={{ field: "email", type: "email", isRequired: true }}
                handleEdit={handleEdit}
                fullWidth
                required
                sx={{ width: "100%" }}
              />
            </Grid>

            {/* Address Field */}
            <Grid item xs={12}>
              <CustomTextfield
                label="Address"
                value={checkoutData.address}
                config={{ field: "address", isRequired: true }}
                handleEdit={handleEdit}
                fullWidth
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextfield
                label="Apartment, Suite, etc. (optional)"
                value={checkoutData.apartment}
                config={{ field: "apartment", isRequired: true }}
                handleEdit={handleEdit}
                fullWidth
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextfield
                label="City"
                value={checkoutData.city}
                config={{ field: "city", isRequired: true }}
                handleEdit={handleEdit}
                fullWidth
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextfield
                label="State"
                value={checkoutData.state}
                config={{ field: "state", isRequired: true }}
                handleEdit={handleEdit}
                fullWidth
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextfield
                label="Pincode"
                value={checkoutData.pincode}
                config={{ field: "pincode", isRequired: true }}
                handleEdit={handleEdit}
                fullWidth
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  mt: 3,
                  fontWeight: "600",
                }}
              >
                Shipping Method
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "56px", // Standard height for TextField
                  padding: "0 12px",
                  backgroundColor: "#F6F6F6", // Light gray background
                  borderRadius: "4px", // Rounded corners
                  border: "1px solid #212121", // Optional: Border for better definition
                }}
              >
                {/* Left Text */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#121212", // Regular dark text
                    fontFamily: "'Roboto Serif', serif",
                  }}
                >
                  Standard Shipping
                </Typography>

                {/* Right Text */}
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold", // Makes the text bold
                    color: "#121212", // Regular dark text
                    fontFamily: "'Roboto Serif', serif",
                  }}
                >
                  FREE
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  mt: 3,
                  fontWeight: "600",
                }}
              >
                Payment
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "500",
                }}
              >
                After clicking “Pay now”, you will be redirected to Razorpay
                Secure (UPI, Cards, Wallets, NetBanking) to complete your
                purchase securely.
              </Typography>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="custom"
              fullWidth
              sx={{
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "700",
                fontSize: "18px",
                p: 1,
              }}
              onClick={() => handleOrderPlacement()}
            >
              Pay Now
            </Button>
          </Box>
        </Card>

        {/* card2 */}
        <Card
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            padding: "2%",

            // paddingTop: "16px",
            borderRadius: "none !important",
            boxShadow: "none",
            width: { xs: "100%", sm: "100%", md: "45%" },
            // maxWidth: 600,
            // margin: "auto",
            borderLeft: "1px solid #ccc",
            background: "#FAFAFA",
          }}
        >
          {/* Cart item */}
          {cartItems.map((item) => (
            <Grid
              key={item.id}
              item
              xs={12}
              sx={{
                width: "100%",
                display: "flex",
                // alignItems: "center",
                justifyContent: "space-between",
                gap: 2, // Spacing between elements
                margin: "2vh 0",
              }}
            >
              <Badge badgeContent={item.quantity} color="warning">
                <Box
                  sx={{
                    position: "relative",
                    border: "1px solid #ccc",
                    width: "70px",
                    height: "70px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {/* Image */}
                  <img
                    src={`${imageUrl}products/${item.images[0]}`}
                    alt={item.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Badge>

              {/* Title and Size */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Roboto Serif', serif",
                    fontWeight: "500",
                    fontSize: { xs: "11px", sm: "12px", md: "14px" },
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontFamily: "'Roboto Serif', serif",
                    fontWeight: "400",
                    fontSize: { xs: "11px", sm: "12px", md: "13px" },
                  }}
                >
                  {`Size: Upper - ${item.sizes.Upper} | ${
                    item.sizes.Bottom ? `Bottom - ${item.sizes.Bottom}` : ""
                  }`}
                </Typography>
              </Box>

              {/* Price */}
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "500",
                  fontSize: { xs: "11px", sm: "12px", md: "14px" },
                }}
              >
                {`Rs. ${(item.price * item.quantity).toLocaleString()}`}
              </Typography>
            </Grid>
          ))}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px", // Space between the TextField and Button
              margin: "3vh 0",
            }}
          >
            <CustomTextfield
              label="Discount code and Gift card"
              config={{ field: "pincode", isRequired: true }}
              handleEdit={props.handleEdit}
              sx={{
                flex: 1, // Allows the TextField to take remaining space
                height: "56px", // Matches the default Button height
              }}
            />
            <Button
              variant="contained"
              sx={{
                height: "56px", // Matches the height of the CustomTextfield
                minWidth: "100px", // Optional: ensures the button isn't too narrow
                backgroundColor: "#F1F1F1", // Button background color
                color: "#6A6A6A",
                boxShadow: "none",
                border: "1px solid #ccc", // Button text color
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Apply
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px", // Space between the TextField and Button
              margin: "3vh 0",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "500",
                fontSize: { xs: "11px", sm: "12px", md: "14px" },
              }}
            >{`Subtotal . ${cartItems.length} items`}</Typography>
            <Typography
              sx={{
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "500",
                fontSize: { xs: "11px", sm: "12px", md: "14px" },
              }}
            >
              {`INR. ₹ ${totalPrice.toLocaleString()}`}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px", // Space between the TextField and Button
              margin: "3vh 0",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "500",
                fontSize: { xs: "11px", sm: "12px", md: "14px" },
              }}
            >
              Shipping
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "500",
                fontSize: { xs: "11px", sm: "12px", md: "14px" },
              }}
            >
              FREE
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px", // Space between the TextField and Button
              margin: "3vh 0",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "700",
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "700",
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
              }}
            >
              {`INR. ₹ ${totalPrice.toLocaleString()}`}
            </Typography>
          </Box>
        </Card>
      </Card>
    </>
  );
};

export default CheckoutForm;

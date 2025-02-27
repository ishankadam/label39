import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
} from "@mui/material";
import {
  ShoppingBag,
  CreditCard,
  LocalShipping,
  Person,
  Email,
  Phone,
  Home,
} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
function ViewOrders(props) {
  const {
    orderId,
    paymentId,
    checkoutData,
    paymentInfo,
    cartItems,
    createdAt,
  } = props.data;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        elevation={3}
        sx={{
          // background: "#F9F9F9",
          // padding: 2,
          borderRadius: "5px",
          border: "1px solid #ccc",
          mb: 3,
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="start">
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  fontFamily: "Roboto Serif, serif",
                  color: "#333",
                  mb: 1,
                }}
                gutterBottom
              >
                Order Summary
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "500",
                  fontFamily: "Roboto Serif, serif",
                  color: "#333",
                  mb: "4px",
                }}
              >
                Order ID: {orderId}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "500",
                  fontFamily: "Roboto Serif, serif",
                  color: "#333",
                  mb: "4px",
                }}
              >
                Payment ID: {paymentId}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "500",
                  fontFamily: "Roboto Serif, serif",
                  color: "#333",
                  mb: "4px",
                }}
              >
                Date: {new Date(createdAt).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  fontFamily: "Roboto Serif, serif",
                  color: "#333",
                  mb: 1,
                }}
                gutterBottom
              >
                Payment Info
              </Typography>
              <Box
                display="flex"
                flexDirection={"column"}
                alignItems="start"
                mb={1}
              >
                <Chip
                  icon={<CreditCard />}
                  label={`Method = ${paymentInfo.method}`}
                  color="info"
                  sx={{ mb: 1, textTransform: "capitalize" }}
                />
                <Chip
                  icon={<CheckCircleIcon />}
                  label={`Status = ${paymentInfo.status}`}
                  sx={{ textTransform: "capitalize" }}
                  color={
                    paymentInfo.status === "success" ? "success" : "default"
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card
        elevation={3}
        sx={{
          // background: "#F9F9F9",
          // padding: 2,
          borderRadius: "5px",
          border: "1px solid #ccc",
          mb: 3,
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="start">
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  fontFamily: "Roboto Serif, serif",
                  color: "#333",
                  mb: 1,
                }}
                gutterBottom
              >
                Customer Information
              </Typography>
              <List sx={{ padding: 0 }}>
                <ListItem sx={{ padding: 0 }}>
                  <Person sx={{ mr: 2 }} />
                  <ListItemText
                    primary={
                      <span
                        style={{
                          fontSize: "14px",
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >{`${checkoutData.firstName} ${checkoutData.lastName}`}</span>
                    }
                  />
                </ListItem>
                <ListItem sx={{ padding: 0 }}>
                  <Email sx={{ mr: 2 }} />
                  <ListItemText
                    primary={
                      <span
                        style={{
                          fontSize: "14px",
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {checkoutData.email}{" "}
                      </span>
                    }
                  />
                </ListItem>
                <ListItem sx={{ padding: 0 }}>
                  <Phone sx={{ mr: 2 }} />
                  <ListItemText
                    primary={
                      <span
                        style={{
                          fontSize: "14px",
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {checkoutData.phone}
                      </span>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  fontFamily: "Roboto Serif, serif",
                  color: "#333",
                  mb: 1,
                }}
                gutterBottom
              >
                Shipping Address
              </Typography>
              <List sx={{ padding: 0 }}>
                <ListItem sx={{ padding: 0 }}>
                  <Home sx={{ mr: 2 }} />
                  <ListItemText
                    sx={{
                      fontFamily: "Roboto Serif, serif",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontFamily: "Roboto Serif, serif",
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >{`${checkoutData.address}, ${checkoutData.apartment}, ${checkoutData.city}, ${checkoutData.state} ${checkoutData.pincode}`}</span>
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card
        elevation={3}
        sx={{
          background: "#fff",
          borderRadius: "5px",
          border: "1px solid #ccc",
          mb: 1,
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "600",
              fontFamily: "Roboto Serif, serif",
              color: "#333",
              mb: 1,
            }}
            gutterBottom
          >
            Order Items
          </Typography>
          <List sx={{ padding: "0" }}>
            {cartItems.map((item, index) => (
              <React.Fragment key={item.productId}>
                {index > 0 && <Divider />}
                <ListItem alignItems="center" sx={{ padding: "0" }}>
                  {/* <Avatar
                    src={`/placeholder.svg?height=60&width=60`}
                    alt={item.name}
                    variant="rounded"
                    sx={{ mr: 2, width: 60, height: 60 }}
                  /> */}
                  <ListItemText
                    sx={{ m: "12px 0" }}
                    variant="subtitle2"
                    primary={
                      <span
                        style={{
                          fontSize: "13px",
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {item.name}
                      </span>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{
                            fontSize: "13px",
                            fontFamily: "Roboto Serif, serif",
                            fontWeight: "500",
                            color: "#333",
                          }}
                        >
                          ₹{item.price.toLocaleString()} x {item.quantity}
                        </Typography>
                        {" — "}
                        {Object.entries(item.sizes).map(([key, value]) => (
                          <Typography
                            key={key}
                            component="span"
                            variant="body2"
                            sx={{
                              fontSize: "13px",
                              fontFamily: "Roboto Serif, serif",
                              fontWeight: "500",
                              color: "#333",
                            }}
                          >
                            {key}: {value}{" "}
                          </Typography>
                        ))}
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{
                            fontSize: "13px",
                            fontFamily: "Roboto Serif, serif",
                            fontWeight: "500",
                            // color: "#333",
                          }}
                        >
                          {item.deliveryIn[0]}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      minWidth: 80,
                      textAlign: "right",
                      fontSize: "14px",
                      fontFamily: "Roboto Serif, serif",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </Typography>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Roboto Serif, serif",
                fontWeight: "500",
              }}
            >
              Total
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Roboto Serif, serif",
                fontWeight: "600",
              }}
            >
              ₹{totalAmount.toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ViewOrders;

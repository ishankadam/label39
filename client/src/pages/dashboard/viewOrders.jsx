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
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Order Details
      </Typography>

      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Typography variant="body1">Order ID: {orderId}</Typography>
              <Typography variant="body1">Payment ID: {paymentId}</Typography>
              <Typography variant="body1">
                Date: {new Date(createdAt).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Payment Info
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <CreditCard sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Method: {paymentInfo.method}
                </Typography>
              </Box>
              <Chip
                icon={<CreditCard />}
                label={`Status: ${paymentInfo.status}`}
                color={paymentInfo.status === "success" ? "success" : "default"}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Customer Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem>
                  <Person sx={{ mr: 2 }} />
                  <ListItemText
                    primary={`${checkoutData.firstName} ${checkoutData.lastName}`}
                  />
                </ListItem>
                <ListItem>
                  <Email sx={{ mr: 2 }} />
                  <ListItemText primary={checkoutData.email} />
                </ListItem>
                <ListItem>
                  <Phone sx={{ mr: 2 }} />
                  <ListItemText primary={checkoutData.phone} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem>
                  <Home sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Shipping Address"
                    secondary={`${checkoutData.address}, ${checkoutData.apartment}, ${checkoutData.city}, ${checkoutData.state} ${checkoutData.pincode}`}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <List>
            {cartItems.map((item, index) => (
              <React.Fragment key={item.productId}>
                {index > 0 && <Divider />}
                <ListItem alignItems="flex-start">
                  <Avatar
                    src={`/placeholder.svg?height=60&width=60`}
                    alt={item.name}
                    variant="rounded"
                    sx={{ mr: 2, width: 60, height: 60 }}
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          ₹{item.price.toLocaleString()} x {item.quantity}
                        </Typography>
                        {" — "}
                        {Object.entries(item.sizes).map(([key, value]) => (
                          <Typography
                            key={key}
                            component="span"
                            variant="body2"
                          >
                            {key}: {value}{" "}
                          </Typography>
                        ))}
                        <Typography variant="caption" display="block">
                          {item.deliveryIn[0]}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ minWidth: 80, textAlign: "right" }}
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
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">
              ₹{totalAmount.toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ViewOrders;

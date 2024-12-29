import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const ProfilePage = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // This would typically come from a prop or context in a real application
  const profileData = {
    firstName: "Ishan ",
    lastName: "Kadam",
    address: "oahoiqwdnqndoiq andq wiqd qjwndiqw",
    apartment: "oheqeqh",
    city: " qndioqdi",
    state: "wqenoqhe",
    pincode: "400963",
    phone: "8652241163",
    email: "ishan@gmail.com",
  };

  const pastOrders = [
    {
      _id: { $oid: "676bf3c584e68854faaeba2f" },
      orderId: "order_PbOwSQX4eBPSJN",
      paymentId: "pay_PbOwcplBtXWQ9H",
      paymentInfo: { status: "success", method: "razorpay" },
      cartItems: [
        {
          productId: 5722614439,
          name: "IVORY APPLIQUE AND CUTWORK CO-ORD SET",
          price: 13300,
          quantity: 1,
          sizes: { Upper: "XS", Bottom: "XS" },
        },
        {
          productId: 7719436122,
          name: "MYSTIC IVORY CO-ORD",
          price: 12530,
          quantity: 1,
          sizes: { Upper: "XS", Bottom: "XS" },
        },
        {
          productId: 6538646960,
          name: "STRIPE FLORAL HAND PAINTED CO-ORD SET",
          price: 15105,
          quantity: 1,
          sizes: { Upper: "XS", Bottom: "XS" },
        },
      ],
      createdAt: { $date: { $numberLong: "1735128005833" } },
    },
  ];

  const styles = {
    container: {
      padding: "24px",
      maxWidth: "800px",
      margin: "auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    card: {
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      overflow: "hidden",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
      },
    },
    avatar: {
      width: "100px",
      height: "100px",
      backgroundColor: "#1976d2",
      fontSize: "40px",
    },
    name: {
      fontWeight: "bold",
      color: "#333",
      marginBottom: "16px",
    },
    sectionTitle: {
      fontWeight: "bold",
      color: "#1976d2",
      marginBottom: "8px",
    },
    infoText: {
      color: "#666",
    },
    accordion: {
      marginTop: "24px",
      borderRadius: "8px",
      "&:before": {
        display: "none",
      },
    },
    accordionSummary: {
      backgroundColor: "#e3f2fd",
    },
    orderItem: {
      borderBottom: "1px solid #e0e0e0",
      "&:last-child": {
        borderBottom: "none",
      },
    },
  };

  return (
    <Box style={styles.container}>
      <Card style={styles.card}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1" style={styles.name}>
              {profileData.firstName} {profileData.lastName}
            </Typography>
          </Box>

          <Divider style={{ margin: "16px 0" }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" style={styles.sectionTitle}>
                Email
              </Typography>
              <Typography variant="body1" style={styles.infoText}>
                {profileData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" style={styles.sectionTitle}>
                Phone
              </Typography>
              <Typography variant="body1" style={styles.infoText}>
                {profileData.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" style={styles.sectionTitle}>
                Address
              </Typography>
              <Typography variant="body1" style={styles.infoText}>
                {profileData.address}
                {profileData.apartment && `, ${profileData.apartment}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" style={styles.sectionTitle}>
                City
              </Typography>
              <Typography variant="body1" style={styles.infoText}>
                {profileData.city}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" style={styles.sectionTitle}>
                State
              </Typography>
              <Typography variant="body1" style={styles.infoText}>
                {profileData.state}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" style={styles.sectionTitle}>
                Pincode
              </Typography>
              <Typography variant="body1" style={styles.infoText}>
                {profileData.pincode}
              </Typography>
            </Grid>
          </Grid>

          {pastOrders.length > 0 ? (
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              style={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={styles.accordionSummary}
              >
                <Typography variant="h6">Past Orders</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {pastOrders.map((order) => (
                  <Box key={order.orderId} mb={2}>
                    <Typography variant="subtitle1" style={styles.sectionTitle}>
                      Order ID: {order.orderId}
                    </Typography>
                    <Typography variant="body2" style={styles.infoText}>
                      Payment Status: {order.paymentInfo.status}
                    </Typography>
                    <Typography variant="body2" style={styles.infoText}>
                      Payment Method: {order.paymentInfo.method}
                    </Typography>
                    <List>
                      {order.cartItems.map((item) => (
                        <ListItem key={item.productId} style={styles.orderItem}>
                          <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity}, Price: ₹${item.price}, Size: Upper - ${item.sizes.Upper}, Bottom - ${item.sizes.Bottom}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="body2" style={styles.infoText}>
                      Total: ₹
                      {order.cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography variant="h6" style={{ margin: "16px 0" }}>
              No past orders found
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;

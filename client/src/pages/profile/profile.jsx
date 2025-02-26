import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../api";

const ProfilePage = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getUserDetails({ userId, setUserDetails: setProfileData });
  }, []);

  // const profileData = {
  //   firstName: "Ishan ",
  //   lastName: "Kadam",
  //   address: "oahoiqwdnqndoiq andq wiqd qjwndiqw",
  //   apartment: "oheqeqh",
  //   city: " qndioqdi",
  //   state: "wqenoqhe",
  //   pincode: "400963",
  //   phone: "8652241163",
  //   email: "ishan@gmail.com",
  // };

  // const pastOrders = [
  //   {
  //     _id: { $oid: "676bf3c584e68854faaeba2f" },
  //     orderId: "order_PbOwSQX4eBPSJN",
  //     paymentId: "pay_PbOwcplBtXWQ9H",
  //     paymentInfo: { status: "success", method: "Razorpay" },
  //     cartItems: [
  //       {
  //         productId: 5722614439,
  //         name: "IVORY APPLIQUE AND CUTWORK CO-ORD SET",
  //         price: 13300,
  //         quantity: 1,
  //         sizes: { Upper: "XS", Bottom: "XS" },
  //       },
  //       {
  //         productId: 7719436122,
  //         name: "MYSTIC IVORY CO-ORD",
  //         price: 12530,
  //         quantity: 1,
  //         sizes: { Upper: "XS", Bottom: "XS" },
  //       },
  //       {
  //         productId: 6538646960,
  //         name: "STRIPE FLORAL HAND PAINTED CO-ORD SET",
  //         price: 15105,
  //         quantity: 1,
  //         sizes: { Upper: "XS", Bottom: "XS" },
  //       },
  //     ],
  //     createdAt: { $date: { $numberLong: "1735128005833" } },
  //   },
  // ];

  const styles = {
    container: {
      // padding: "24px",
      maxWidth: "800px",
      margin: "20px auto",
      minHeight: "100vh",
    },
    card: {
      margin: "10px",
      borderRadius: "5px",
      boxShadow:
        "0px 1px 3px 0px rgba(0, 0, 0, 0.02), 0px 0px 0px 1px rgba(27, 31, 35, 0.15)",
    },
    label: {
      fontWeight: "600",
      fontFamily: "Roboto Serif, serif",
      color: "#333",
    },
    value: {
      border: "1px solid #ddd",
      padding: "8px",
      borderRadius: "4px",
      fontFamily: "Roboto Serif, serif",
      color: "#666",
      width: "100%",
      textAlign: "left",
      backgroundColor: "#f9f9f9",
    },
    fieldWrapper: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
    },
    accordion: {
      // marginTop: "24px",
      borderRadius: 0,
      border: "1px solid #ccc",
      "&:before": {
        display: "none",
      },
      boxShadow: "none",
    },
    accordionSummary: {
      backgroundColor: "#F7ECE9",
    },
    orderItem: {
      borderBottom: "1px solid #e0e0e0",
      "&:last-child": {
        borderBottom: "none",
      },
    },
  };

  return (
    <Box
      style={styles.container}
      sx={{ pb: { xs: "170px", sm: "170px", md: "40px" } }}
    >
      <Card style={styles.card}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Typography
              variant="h4"
              component="h1"
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: "600",
                color: "#8C4E3D",
              }}
            >
              {profileData.user?.name}
            </Typography>
          </Box>

          <Divider style={{ margin: "16px 0" }} />

          <Box>
            <Box style={styles.fieldWrapper}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Typography style={styles.label}>Email</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box style={styles.value}>{profileData.user?.email}</Box>
                </Grid>
              </Grid>
            </Box>
            <Box style={styles.fieldWrapper}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Typography style={styles.label}>Phone</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box style={styles.value}>{profileData.user?.phone}</Box>
                </Grid>
              </Grid>
            </Box>
            {profileData.pastOrders?.length > 0 ? (
              <>
                <Box style={styles.fieldWrapper}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Typography style={styles.label}>Address</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Box style={styles.value}>
                        {
                          profileData.pastOrders[0]?.checkoutData
                            ?.shippingAddress.address
                        }
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box style={styles.fieldWrapper}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Typography style={styles.label}>Apartment</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Box style={styles.value}>
                        {
                          profileData.pastOrders[0]?.checkoutData
                            ?.shippingAddress.apartment
                        }
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box style={styles.fieldWrapper}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Typography style={styles.label}>City</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Box style={styles.value}>
                        {
                          profileData.pastOrders[0]?.checkoutData
                            ?.shippingAddress.city
                        }
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box style={styles.fieldWrapper}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Typography style={styles.label}>State</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Box style={styles.value}>
                        {
                          profileData.pastOrders[0]?.checkoutData
                            ?.shippingAddress.state
                        }
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box style={styles.fieldWrapper}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Typography style={styles.label}>Pincode</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Box style={styles.value}>
                        {
                          profileData.pastOrders[0]?.checkoutData
                            ?.shippingAddress.pincode
                        }
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <></>
            )}
          </Box>

          {profileData.pastOrders?.length > 0 ? (
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              style={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={styles.accordionSummary}
              >
                <Typography style={{ ...styles.label }}>Past Orders</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#F9F9F9",
                }}
              >
                {profileData.pastOrders?.map((order) => (
                  <Box
                    key={order.orderId}
                    mt={2}
                    sx={{
                      background: "#fff",
                      padding: 2,
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ ...styles.label }}
                      sx={{ mb: 2 }}
                    >
                      Order ID: {order.orderId}
                    </Typography>
                    {order.paymentInfo.status === "success" ? (
                      <Alert
                        sx={{
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                        }}
                        icon={<CheckIcon fontSize="inherit" />}
                        severity="success"
                      >
                        Payment Status : Success
                      </Alert>
                    ) : order.paymentInfo.status === "failed" ? (
                      <Alert
                        severity="error"
                        sx={{
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                        }}
                      >
                        Payment Status : Failed
                      </Alert>
                    ) : null}

                    <Alert
                      severity="info"
                      sx={{
                        mt: 2,
                        fontFamily: "Roboto Serif, serif",
                        fontWeight: "500",
                      }}
                    >
                      Payment Method: {order.paymentInfo.method}
                    </Alert>

                    <List>
                      {order.cartItems.map((item) => (
                        <ListItem
                          key={item.productId}
                          style={styles.orderItem}
                          sx={{ paddingLeft: 0 }}
                        >
                          <ListItemText
                            sx={{ mb: 2 }}
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
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Roboto Serif, serif",
                                }}
                              >
                                {`Quantity: ${item.quantity}, Price: ₹${item.price}, Size: Upper - ${item.sizes.Upper}, Bottom - ${item.sizes.Bottom}`}
                              </span>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                    <div
                      // style={styles.value}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        border: "1px solid #ddd",
                        padding: "8px",
                        borderRadius: "4px",
                        color: "#666",
                        textAlign: "left",
                        backgroundColor: "#F7ECE9",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                        }}
                      >
                        Total :
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "600",
                        }}
                      >
                        ₹
                        {order.cartItems.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </AccordionDetails>
              <AccordionDetails
                sx={{
                  background: "#F9F9F9",
                }}
              >
                {profileData.pastOrders.map((order) => (
                  <Box
                    key={order.orderId}
                    mt={2}
                    sx={{
                      background: "#fff",
                      padding: 2,
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ ...styles.label }}
                      sx={{ mb: 2 }}
                    >
                      Order ID: {order.orderId}
                    </Typography>
                    {order.paymentInfo.status === "success" ? (
                      <Alert
                        sx={{
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                        }}
                        icon={<CheckIcon fontSize="inherit" />}
                        severity="success"
                      >
                        Payment Status : Success
                      </Alert>
                    ) : order.paymentInfo.status === "failed" ? (
                      <Alert
                        severity="error"
                        sx={{
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                        }}
                      >
                        Payment Status : Failed
                      </Alert>
                    ) : null}

                    <Alert
                      severity="info"
                      sx={{
                        mt: 2,
                        fontFamily: "Roboto Serif, serif",
                        fontWeight: "500",
                      }}
                    >
                      Payment Method: {order.paymentInfo.method}
                    </Alert>

                    <List>
                      {order.cartItems.map((item) => (
                        <ListItem
                          key={item.productId}
                          style={styles.orderItem}
                          sx={{ paddingLeft: 0 }}
                        >
                          <ListItemText
                            sx={{ mb: 2 }}
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
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Roboto Serif, serif",
                                }}
                              >
                                {`Quantity: ${item.quantity}, Price: ₹${item.price}, Size: Upper - ${item.sizes.Upper}, Bottom - ${item.sizes.Bottom}`}
                              </span>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                    <div
                      // style={styles.value}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        border: "1px solid #ddd",
                        padding: "8px",
                        borderRadius: "4px",
                        color: "#666",
                        textAlign: "left",
                        backgroundColor: "#F7ECE9",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "500",
                        }}
                      >
                        Total :
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "Roboto Serif, serif",
                          fontWeight: "600",
                        }}
                      >
                        ₹
                        {order.cartItems.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography
              variant="h6"
              style={{ margin: "16px 0", fontFamily: "Roboto Serif, serif" }}
            >
              No past orders found
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;

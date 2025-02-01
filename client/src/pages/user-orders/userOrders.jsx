import {
  Alert,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../api";
import CheckIcon from "@mui/icons-material/Check";
import { imageUrl } from "../../api";
import { Chip } from "@mui/material";

const UserOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    setLoading(true);
    getAllOrders({ userId, role, setAllOrders: setOrders, setLoading });
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const statusStyles = {
    placed: { bgcolor: "#1976d2", color: "white" }, // Primary Blue
    shipped: { bgcolor: "#ed6c02", color: "white" }, // Warning Orange
    delivered: { bgcolor: "#2e7d32", color: "white" }, // Success Green
    rejected: { bgcolor: "#d32f2f", color: "white" }, // Error Red
  };
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

    orderItem: {
      borderBottom: "1px solid #e0e0e0",
      "&:last-child": {
        borderBottom: "none",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
            color: "#2f3e4e",
            textAlign: "center",
            mt: 2,
            mb: 1,
            fontFamily: "'cinzel', serif",
            fontWeight: "500",
          }}
        >
          user orders
          <div
            className="title-border"
            style={{
              width: "70px",
              height: "3px",
              borderRadius: "100px",
              backgroundColor: "#2f3e4e",
              margin: "0 auto",
            }}
          />
        </Typography>
        {orders.map((order, index) => (
          <Box
            maxWidth="lg"
            key={order.orderId}
            mt={2}
            sx={{
              background: "#fff",
              padding: 2,
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <Box
              sx={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="subtitle2"
                style={{ ...styles.label }}
                sx={{ mb: 2 }}
              >
                Order ID: {order.orderId}
              </Typography>

              {/* Order Status Chip */}
              <Chip
                label={order.orderStatus}
                sx={{
                  fontWeight: "500",
                  textTransform: "capitalize",
                  bgcolor:
                    statusStyles[order.orderStatus]?.bgcolor || "grey.300",
                  color: statusStyles[order.orderStatus]?.color || "black",
                }}
              />
            </Box>
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
                  <Box
                    sx={{
                      position: "relative",
                      border: "1px solid #ccc",
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                      margin: "10px 10px 10px 0",
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
          // <div key={index}>
          //   <Typography>{order.orderId}</Typography>
          //   <Typography>{order.paymentInfo.status}</Typography>
          //   <Typography>{order.paymentInfo.method}</Typography>
          //   <Typography>
          //     {order.cartItems.map((item) => item.name).join(", ")}
          //   </Typography>
          // </div>
        ))}
      </Box>
    </Box>
  );
};

export default UserOrders;

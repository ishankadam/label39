import CheckIcon from "@mui/icons-material/Check";
import {
  Alert,
  Box,
  Button,
  Chip,
  keyframes,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders, imageUrl } from "../../api";
import { findLabelByValue, orderStatus } from "../../common";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();
  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    setLoading(true);
    getAllOrders({ userId, role, setAllOrders: setOrders, setLoading });
  }, []);

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
        {orders.length > 0 ? (
          orders.map((order) => (
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
                  label={findLabelByValue(orderStatus, order.status)}
                  sx={{
                    fontWeight: "500",
                    textTransform: "capitalize",
                    bgcolor: statusStyles[order.status]?.bgcolor || "grey.300",
                    color: statusStyles[order.status]?.color || "black",
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
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                animation: `${float} 3s ease-in-out infinite`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                  textAlign: "center",
                  mb: 4,
                  color: "#a16149",
                  maxWidth: "80%",
                  animation: isShaking ? `${shake} 0.5s ease-in-out` : "none",
                }}
                onClick={handleShake}
              >
                Oops! You don't have any past orders.
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/shop")}
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem" },
                padding: "10px 30px",
                borderRadius: "5px",
                backgroundColor: "#a16149",
                color: "#ffffff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#8a5340",
                  transform: "translateY(-5px) scale(1.05)",
                  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Go to shop
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserOrders;

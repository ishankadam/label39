import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../api";
import {
  addCommaToPrice,
  calculatePriceAfterDiscount,
  getCurrencySymbol,
} from "../../common";
import {
  closeCartDrawer,
  removeFromCart,
  showSnackbar,
  updateQuantity,
} from "../../store/cartSlice";
import CustomTextfield from "../textfield/customTextfield";

const CustomDrawer = (props) => {
  const [displayNote, setDisplayNote] = useState(false);
  const openDrawer = useSelector((state) => state.cart.openCartDrawer);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveItem = (productId, item) => {
    dispatch(removeFromCart(productId));
    dispatch(
      showSnackbar({
        message: `${(productId, item.name)} HAS BEEN REMOVED FROM YOUR CART`,
        severity: "error",
      })
    );
  };

  const handleUpdateQuantity = (productId, operation) => {
    dispatch(updateQuantity({ productId, operation }));
  };

  const handleOrderNote = () => {
    setDisplayNote(!displayNote);
  };

  const onClose = () => {
    dispatch(closeCartDrawer());
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={onClose}
        PaperProps={{
          sx: { width: { xs: "90%", sm: "50%", md: "30%" } }, // Adjust the width as needed
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            border: "1px solid #2f3e4e",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#2f3e4e",

                fontFamily: "'cinzel', serif",
                fontWeight: "700",
              }}
            >
              cart
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon sx={{ color: "#2f3e4e" }} />
            </IconButton>
          </Box>

          <Box sx={{ overflowY: "scroll", height: "80%" }}>
            {/* Cart item */}
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                return (
                  <Box
                    key={`${item.productId}-cart-item`}
                    sx={{
                      display: "flex",
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    <img
                      src={`${imageUrl}products/${item.images[0]}`}
                      alt={item.name}
                      style={{
                        aspectRatio: "2:3",
                        width: "120px",
                        height: "180px",
                        marginRight: 16,
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "'Roboto Serif', serif",
                          fontWeight: "400",
                          fontSize: { xs: "11px", sm: "12px", md: "16px" },
                          mb: 1,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Roboto Serif', serif",
                          fontWeight: "400",
                          fontSize: { xs: "11px", sm: "12px", md: "15px" },
                          mb: 1,
                        }}
                        color="textSecondary"
                      >
                        {`Size: Upper - ${item.sizes.Upper} | ${
                          item.sizes.Bottom
                            ? `Bottom - ${item.sizes.Bottom}`
                            : ""
                        }`}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Roboto Serif', serif",
                          fontWeight: "400",
                          fontSize: { xs: "11px", sm: "12px", md: "15px" },
                          mb: 1,
                        }}
                        color="textSecondary"
                      >
                        {item.sale && item.sale.isActive ? (
                          <>
                            <span
                              style={{
                                textDecoration: "line-through",
                                marginRight: "8px",
                              }}
                            >
                              {addCommaToPrice(item.price)}
                            </span>
                            <span style={{ marginRight: "8px" }}>
                              {`${item.sale.discountValue}${
                                item.sale.discountType === "Percentage"
                                  ? "%"
                                  : getCurrencySymbol(props.country)
                              } off`}
                            </span>
                            <span
                              style={{ color: "#a16149", fontWeight: "bold" }}
                            >
                              {calculatePriceAfterDiscount(
                                item.price,
                                item.sale.discountType,
                                item.sale.discountValue
                              )}
                            </span>
                          </>
                        ) : (
                          addCommaToPrice(item.price)
                        )}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          handleUpdateQuantity(item.productId, "decrease")
                        }
                        size="small"
                        sx={{
                          border: "1px solid #ccc", // Outlined style
                          borderRadius: "4px",
                          padding: "4px",
                          mr: 1,
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ mx: 1 }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          handleUpdateQuantity(item.productId, "increase")
                        }
                        size="small"
                        sx={{
                          border: "1px solid #ccc", // Outlined style
                          borderRadius: "4px",
                          padding: "4px",
                          ml: 1,
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                      {/* <br /> */}
                      <Button
                        // onClick={() => handleRemoveItem(item.id)}
                        color="textSecondary"
                        size="small"
                        sx={{
                          ml: 2,
                          fontFamily: "'Roboto Serif', serif",
                          fontWeight: "400",
                          fontSize: { xs: "11px", sm: "12px", md: "13px" },
                          mt: 1,
                          textDecoration: "underline !important",
                        }}
                        onClick={() => handleRemoveItem(item.productId, item)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    mt: 5,
                    fontSize: { xs: "18px", sm: "18px", md: "18px" },
                    fontFamily: "'Cinzel', serif",
                    fontWeight: "300",
                    color: "#9a847a",
                  }}
                >
                  Your cart is currently empty
                </Typography>
                <Button
                  size="small"
                  color="custom"
                  variant="outlined"
                  onClick={() => {
                    navigate("/shop");
                    dispatch(closeCartDrawer());
                  }}
                  sx={{
                    mt: 4,
                    width: "140px",
                  }}
                >
                  Go to shop
                </Button>
              </Box>
            )}
          </Box>

          <Box mt="auto" sx={{}}>
            <Box sx={{ display: "grid" }}>
              <Link
                onClick={handleOrderNote}
                sx={{
                  color: "#2f3e4e",
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "400",
                  fontSize: { xs: "11px", sm: "12px", md: "15px" },
                  mt: 2,
                  mb: 2,
                  textDecoration: "underline !important",
                }}
              >
                Add Order Note
              </Link>
              {displayNote && (
                <CustomTextfield
                  label="Order Note"
                  sx={{ mb: 1 }}
                ></CustomTextfield>
              )}
            </Box>

            <Typography
              display="block"
              color="textSecondary"
              sx={{
                fontSize: { xs: "11px", sm: "12px", md: "15px" },
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "400",
                mb: 1,
              }}
            >
              Taxes and shipping calculated at checkout
            </Typography>
            <Typography
              display="block"
              variant="subtitle2"
              sx={{
                fontSize: { xs: "11px", sm: "12px", md: "15px" },
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "600",
                mb: 1,
              }}
            >
              By clicking checkout, you agree to terms and conditions
            </Typography>
            <Button
              variant="contained"
              // color="success"
              sx={{
                letterSpacing: "2px",
                fontFamily: "'cinzel', serif",
                fontWeight: "700",
                borderRadius: 0,
                padding: "8px 5px",
                backgroundColor: "#a16149",
                color: "#fff",
                boxShadow: "none",
              }}
              fullWidth
              onClick={() => {
                dispatch(closeCartDrawer());
                navigate("/checkout");
              }}
            >
              Checkout • Rs.{" "}
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default CustomDrawer;

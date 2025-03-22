/* eslint-disable jsx-a11y/anchor-is-valid */
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ padding: 3, maxWidth: 1000, margin: "auto" }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          color: "#2f3e4e",
          textAlign: "center",
          mb: 4,
          mt: 2,
          fontFamily: "'cinzel', serif",
          fontWeight: "600",
        }}
      >
        CART
        <div
          className="title-border"
          style={{
            width: "80px",
            height: "3.5px",
            borderRadius: "100px",
            backgroundColor: "#2f3e4e",
            margin: "0 auto",
          }}
        />
      </Typography>

      {/* Desktop/Tablet Layout */}
      {!isMobile ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#2f3e4e",
                    fontSize: "16px",
                    fontFamily: "'cinzel', serif",
                    fontWeight: "700",
                  }}
                >
                  product
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#2f3e4e",
                    fontSize: "16px",
                    fontFamily: "'cinzel', serif",
                    fontWeight: "700",
                  }}
                >
                  quantity
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#2f3e4e",
                    fontSize: "16px",
                    fontFamily: "'cinzel', serif",
                    fontWeight: "700",
                  }}
                >
                  total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: 120,
                          height: "auto",
                          marginRight: 16,
                          borderRadius: "2px",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Roboto Serif', serif",
                            fontWeight: "400",
                            fontSize: { xs: "11px", sm: "12px", md: "16px" },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          // variant="body2"
                          color="textSecondary"
                          sx={{
                            fontFamily: "'Roboto Serif', serif",
                            fontWeight: "400",
                            fontSize: { xs: "11px", sm: "12px", md: "16px" },
                          }}
                        >
                          {`Rs. ${item.price.toLocaleString()}`}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Roboto Serif', serif",
                            fontWeight: "400",
                            fontSize: { xs: "11px", sm: "12px", md: "16px" },
                          }}
                          color="textSecondary"
                        >
                          Size: {item.size}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
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
                    <Typography variant="body1" component="span" sx={{ mx: 1 }}>
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
                    <br />
                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      color="textSecondary"
                      size="small"
                      sx={{
                        fontFamily: "'Roboto Serif', serif",
                        fontWeight: "400",
                        fontSize: { xs: "11px", sm: "12px", md: "13px" },
                        mt: 1,
                        textDecoration: "underline !important",
                      }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      sx={{
                        fontFamily: "'Roboto Serif', serif",
                        fontWeight: "400",
                        fontSize: { xs: "11px", sm: "12px", md: "16px" },
                      }}
                    >
                      {`Rs. ${(item.price * item.quantity).toLocaleString()}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Mobile Layout
        <Box>
          {cartItems.map((item) => (
            <Stack
              key={item.id}
              spacing={2}
              sx={{
                mb: 2,
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <Box display="flex">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: 80,
                    height: "auto",
                    marginRight: 16,
                    borderRadius: "2px",
                  }}
                />
                <Box>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Rs. ${item.price.toLocaleString()}`}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ mt: 1, gap: 1 }}
                  >
                    <IconButton
                      onClick={() =>
                        handleUpdateQuantity(item.productId, "decrease")
                      }
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" component="span">
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handleUpdateQuantity(item.productId, "increase")
                      }
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button
                    onClick={() => handleRemoveItem(item.id)}
                    color="error"
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Stack>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        {/* Top Row: Add Order Note and Total Price */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontFamily: "'Roboto Serif', serif", fontWeight: "400" }}
          >
            Add order note
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontFamily: "'Roboto Serif', serif", fontWeight: "400" }}
          >
            {`Total: Rs. ${totalPrice.toLocaleString()}`}
          </Typography>
        </Box>

        {/* Main Content: Input Box and Summary */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "stretch", // Ensures equal height
          }}
        >
          {/* Order Note Input */}
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="How can we help you?"
            sx={{
              fontFamily: "'Roboto Serif', serif !important",
              fontWeight: "400",
              flex: 1,
              height: { sm: "auto" }, // Ensures height matches the summary content
            }}
          />

          {/* Summary Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "flex-end" }, // Align to the right for tablets/laptops
              textAlign: { xs: "left", sm: "right" }, // Text alignment for different screen sizes
            }}
          >
            <Typography
              variant="subtitle2"
              display="block"
              sx={{ fontFamily: "'Roboto Serif', serif", fontWeight: "400" }}
            >
              Taxes and{" "}
              <a href="#" style={{ color: "#007bff" }}>
                shipping
              </a>{" "}
              calculated at checkout
            </Typography>
            <Typography
              variant="subtitle2"
              display="block"
              sx={{ fontFamily: "'Roboto Serif', serif", fontWeight: "400" }}
            >
              By checking out, you agree to terms & conditions
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{
                letterSpacing: "2px",
                fontFamily: "'cinzel', serif",
                fontWeight: "700",
                borderRadius: 0,
                padding: "8px 5px",
                width: { xs: "100%", sm: 150 }, // Responsive width
                // backgroundColor: "green",
                color: "#fff",
                boxShadow: "none",
                alignSelf: { xs: "stretch", sm: "flex-end" }, // Align button to the right for tablets/laptops
              }}
            >
              checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;

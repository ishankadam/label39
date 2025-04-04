import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  checkDiscountCode,
  createOrder,
  imageUrl,
  verifyPayment,
} from "../../api";
import { countries } from "../../common";
import SuccessModal from "../../components/modal/successModal";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import CustomTextfield from "../../components/textfield/customTextfield";
import { clearCart } from "../../store/cartSlice";

const { RAZORPAY_KEY_ID } = process.env;
export const razorpayId = RAZORPAY_KEY_ID;

const CheckoutForm = (props) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState({
    isValid: true,
  });
  const [isDifferentBilling, setIsDifferentBilling] = useState(false);
  const [discountLoading, setDiscountLoading] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const [currency, setCurrency] = useState("₹");
  const [billAmount, setBillAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [checkoutData, setCheckoutData] = useState({
    country: props.country,
    shippingAddress: {},
  });
  const [termsAndConditionChecked, setTermsAndConditionChecked] =
    useState(false);
  const [billingAddress, setBillingAddress] = useState({});
  const handleCodeChange = (value) => {
    setCode(value);
    if (value.length > 0) {
      setDiscount({
        isValid: false,
      });
    } else {
      setDiscount({
        isValid: true,
      });
    }
  };

  useEffect(() => {
    setCheckoutData((prev) => ({
      ...prev,
      country: props.country,
    }));
  }, [props.country]);

  useEffect(() => {
    const selectedCountry = countries.find(
      (row) => row.value === checkoutData.country
    );

    if (selectedCountry) {
      setCurrency(selectedCountry.currency);

      // Generate new fields for shipping and billing addresses
      const updatedFields = selectedCountry.fields.reduce(
        (acc, field) => ({ ...acc, [field]: "" }),
        {}
      );

      setCheckoutData((prevData) => {
        return {
          ...prevData,
          country: props.country,
          // Reset both shipping and billing addresses if country changes
          shippingAddress: updatedFields,
        };
      });
    }
  }, [checkoutData.country]);

  useEffect(() => {
    const selectedCountry = countries.find(
      (row) => row.value === checkoutData.country
    );

    if (selectedCountry) {
      setCurrency(selectedCountry.currency);

      // Generate new fields for shipping and billing addresses
      const updatedFields = selectedCountry.fields.reduce(
        (acc, field) => ({ ...acc, [field]: "" }),
        {}
      );
      setBillingAddress(updatedFields);
    }
  }, [checkoutData.country, isDifferentBilling]);

  useEffect(() => {
    const allFieldsFilled = (obj) =>
      Object.values(obj).every((value) =>
        typeof value === "object" ? allFieldsFilled(value) : value.trim() !== ""
      );

    setIsButtonDisabled(
      !allFieldsFilled(checkoutData) && !termsAndConditionChecked
    ); // Disable button if any field is empty
  }, [checkoutData, termsAndConditionChecked]);

  const handleEdit = (value, field, index, section) => {
    if (field === "country") {
      props.setCountry(value);
    } else {
      setCheckoutData((prev) => {
        // Preserve both shippingAddress and billingAddress while updating the correct section
        if (section) {
          return {
            ...prev,
            [section]: {
              ...prev[section], // Preserve existing fields in the current section
              [field]: value, // Update the specific field in the section
            },
          };
        } else {
          // Update top-level field if no section is specified
          return {
            ...prev,
            [field]: value,
          };
        }
      });
    }
  };

  const handleEditBillingAddress = (value, field) => {
    setBillingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = async () => {
    setDiscountLoading(true);
    checkDiscountCode({
      userId: localStorage.getItem("userId"),
      code: code,
      setLoading: setDiscountLoading,
      setDiscount,
    });
  };

  useEffect(() => {
    // Calculate the total amount before discount
    const amount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    let finalAmount = amount;
    if (discount.isValid) {
      if (discount.discountType === "Percentage") {
        finalAmount = amount - (amount * discount.value) / 100;
      } else if (discount.discountType === "Fixed") {
        finalAmount = amount - discount.value;
      } else {
        finalAmount = amount;
      }
    }
    setBillAmount(finalAmount);
  }, [discount, cartItems]);

  const handleOrderPlacement = async () => {
    const orderData = {
      ...checkoutData,
      billingAddress: billingAddress,
    };
    try {
      const { orderId } = await createOrder(billAmount);
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: billAmount,
        currency: checkoutData.country,
        name: "The Label39",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          const result = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            checkoutData: orderData,
            cartItems,
            type: "order",
            userId: localStorage.getItem("userId"),
          });

          if (result.success) {
            setModalOpen(true);
            navigate("/shop");
            dispatch(clearCart());
          } else {
            alert("Payment Failed");
          }
        },
        prefill: {
          name: checkoutData.name,
          email: checkoutData.email,
          contact: checkoutData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
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
                key={item.productId}
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2, // Spacing between elements
                  margin: "2vh 0",
                }}
              >
                <Badge
                  badgeContent={item.quantity}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#a16149",
                      color: "white",
                    },
                  }}
                >
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
                  {`${currency} ${(
                    item.price * item.quantity
                  ).toLocaleString()}`}
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
                config={{ field: "code", isRequired: true }}
                handleEdit={handleCodeChange}
                sx={{
                  flex: 1, // Allows the TextField to take remaining space
                  height: "56px", // Matches the default Button height
                }}
                value={code}
                error={!discount.isValid}
                helperText={
                  code.length > 0 && !discount.isValid && discount.message
                    ? discount.message
                    : ""
                }
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
                disabled={code.length <= 0}
                onClick={handleApply}
              >
                {discountLoading ? "Checking..." : "Apply"}
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
              >{`Subtotal: (${cartItems.length} items)`}</Typography>
              <Typography
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "500",
                  fontSize: { xs: "11px", sm: "12px", md: "14px" },
                }}
              >
                {`${currency} ${billAmount.toLocaleString()}`}
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
                {`INR. ₹ ${billAmount.toLocaleString()}`}
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
                  mb: 1,
                }}
              >
                Country
              </Typography>
              <SelectDropdown
                className="country-dropdown"
                variant="outlined"
                margin="normal"
                sx={{
                  display: { xs: "none", md: "flex" },
                  width: "100%",
                }} // Add margin to the left for spacing
                required
                select
                name="country"
                value={checkoutData.country}
                config={{ field: "country" }}
                handleEdit={handleEdit}
                optionList={countries}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "600",
                  mt: 3,
                }}
              >
                Contact
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
                Shipping Address
              </Typography>
            </Grid>

            {/* First Name and Last Name on the same row */}
            <Grid item xs={12} sm={6}>
              <CustomTextfield
                label="First Name"
                variant="outlined"
                value={checkoutData.shippingAddress.firstName}
                config={{
                  field: "firstName",
                  isRequired: true,
                  section: "shippingAddress",
                }}
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
                value={checkoutData.shippingAddress.lastName}
                config={{
                  field: "lastName",
                  isRequired: true,
                  section: "shippingAddress",
                }}
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
                value={checkoutData.shippingAddress.email}
                config={{
                  field: "email",
                  type: "email",
                  isRequired: true,
                  section: "shippingAddress",
                }}
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
                value={checkoutData.shippingAddress.address}
                config={{
                  field: "address",
                  isRequired: true,
                  section: "shippingAddress",
                }}
                handleEdit={handleEdit}
                fullWidth
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextfield
                label="Apartment, Suite, etc. (optional)"
                value={checkoutData.shippingAddress.apartment}
                config={{
                  field: "apartment",
                  isRequired: true,
                  section: "shippingAddress",
                }}
                handleEdit={handleEdit}
                fullWidth
                sx={{ width: "100%" }}
              />
            </Grid>
            {checkoutData.shippingAddress.city !== undefined && (
              <Grid item xs={12} sm={4}>
                <CustomTextfield
                  label="City"
                  value={checkoutData.shippingAddress.city}
                  config={{
                    field: "city",
                    isRequired: true,
                    section: "shippingAddress",
                  }}
                  handleEdit={handleEdit}
                  fullWidth
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {checkoutData.shippingAddress.state !== undefined && (
              <Grid item xs={12} sm={4}>
                <CustomTextfield
                  label="State"
                  value={checkoutData.shippingAddress.state}
                  config={{
                    field: "state",
                    isRequired: true,
                    section: "shippingAddress",
                  }}
                  handleEdit={handleEdit}
                  fullWidth
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {checkoutData.shippingAddress.pincode !== undefined && (
              <Grid item xs={12} sm={4}>
                <CustomTextfield
                  label="Pincode"
                  value={checkoutData.shippingAddress.pincode}
                  config={{
                    field: "pincode",
                    isRequired: true,
                    section: "shippingAddress",
                  }}
                  handleEdit={handleEdit}
                  fullWidth
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {checkoutData.shippingAddress.province !== undefined && (
              <Grid item xs={12} sm={4}>
                <CustomTextfield
                  label="Province"
                  value={checkoutData.shippingAddress.province}
                  config={{
                    field: "province",
                    isRequired: true,
                    section: "shippingAddress",
                  }}
                  handleEdit={handleEdit}
                  fullWidth
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {checkoutData.shippingAddress.zipcode !== undefined && (
              <Grid item xs={12} sm={4}>
                <CustomTextfield
                  label="Zipcode"
                  value={checkoutData.shippingAddress.zipcode}
                  config={{
                    field: "zipcode",
                    isRequired: true,
                    section: "shippingAddress",
                  }}
                  handleEdit={handleEdit}
                  fullWidth
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {checkoutData.shippingAddress.postalcode !== undefined && (
              <Grid item xs={12} sm={4}>
                <CustomTextfield
                  label="Postalcode"
                  value={checkoutData.shippingAddress.postalcode}
                  config={{
                    field: "postalcode",
                    isRequired: true,
                    section: "shippingAddress",
                  }}
                  handleEdit={handleEdit}
                  fullWidth
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {checkoutData.shippingAddress.emirate !== undefined && (
              <Grid item xs={12} sm={4}>
                <CustomTextfield
                  label="Emirate"
                  value={checkoutData.shippingAddress.emirate}
                  config={{
                    field: "emirate",
                    isRequired: true,
                    section: "shippingAddress",
                  }}
                  handleEdit={handleEdit}
                  fullWidth
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  mt: 3,
                  fontWeight: "600",
                }}
              >
                Use a different billing address
                <Switch
                  checked={isDifferentBilling}
                  onChange={(e) => setIsDifferentBilling(e.target.checked)}
                />
              </Typography>
            </Grid>
            {isDifferentBilling && (
              <>
                <Grid item xs={12} sm={6}>
                  <CustomTextfield
                    label="First Name"
                    variant="outlined"
                    value={billingAddress.firstName}
                    config={{
                      field: "firstName",
                      isRequired: true,
                      section: "billingAddress",
                    }}
                    handleEdit={handleEditBillingAddress}
                    fullWidth
                    required
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextfield
                    label="Last Name"
                    variant="outlined"
                    value={billingAddress.lastName}
                    config={{
                      field: "lastName",
                      isRequired: true,
                      section: "billingAddress",
                    }}
                    handleEdit={handleEditBillingAddress}
                    fullWidth
                    required
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextfield
                    label="Email"
                    variant="outlined"
                    value={billingAddress.email}
                    config={{
                      field: "email",
                      type: "email",
                      isRequired: true,
                      section: "billingAddress",
                    }}
                    handleEdit={handleEditBillingAddress}
                    fullWidth
                    required
                    sx={{ width: "100%" }}
                  />
                </Grid>
                {/* Address Field */}
                <Grid item xs={12}>
                  <CustomTextfield
                    label="Address"
                    value={billingAddress.address}
                    config={{
                      field: "address",
                      isRequired: true,
                      section: "billingAddress",
                    }}
                    handleEdit={handleEditBillingAddress}
                    fullWidth
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextfield
                    label="Apartment, Suite, etc. (optional)"
                    value={billingAddress.apartment}
                    config={{
                      field: "apartment",
                      isRequired: true,
                      section: "billingAddress",
                    }}
                    handleEdit={handleEditBillingAddress}
                    fullWidth
                    sx={{ width: "100%" }}
                  />
                </Grid>
                {billingAddress.city !== undefined && (
                  <Grid item xs={12} sm={4}>
                    <CustomTextfield
                      label="City"
                      value={billingAddress.city}
                      config={{
                        field: "city",
                        isRequired: true,
                        section: "billingAddress",
                      }}
                      handleEdit={handleEditBillingAddress}
                      fullWidth
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {billingAddress.state !== undefined && (
                  <Grid item xs={12} sm={4}>
                    <CustomTextfield
                      label="State"
                      value={billingAddress.state}
                      config={{
                        field: "state",
                        isRequired: true,
                        section: "billingAddress",
                      }}
                      handleEdit={handleEditBillingAddress}
                      fullWidth
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {billingAddress.pincode !== undefined && (
                  <Grid item xs={12} sm={4}>
                    <CustomTextfield
                      label="Pincode"
                      value={billingAddress.pincode}
                      config={{
                        field: "pincode",
                        isRequired: true,
                        section: "billingAddress",
                      }}
                      handleEdit={handleEditBillingAddress}
                      fullWidth
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {billingAddress.province !== undefined && (
                  <Grid item xs={12} sm={4}>
                    <CustomTextfield
                      label="Province"
                      value={billingAddress.province}
                      config={{
                        field: "province",
                        isRequired: true,
                        section: "billingAddress",
                      }}
                      handleEdit={handleEditBillingAddress}
                      fullWidth
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {billingAddress.zipcode !== undefined && (
                  <Grid item xs={12} sm={4}>
                    <CustomTextfield
                      label="Zipcode"
                      value={billingAddress.zipcode}
                      config={{
                        field: "zipcode",
                        isRequired: true,
                        section: "billingAddress",
                      }}
                      handleEdit={handleEditBillingAddress}
                      fullWidth
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {billingAddress.postalcode !== undefined && (
                  <Grid item xs={12} sm={4}>
                    <CustomTextfield
                      label="Postalcode"
                      value={billingAddress.postalcode}
                      config={{
                        field: "postalcode",
                        isRequired: true,
                        section: "billingAddress",
                      }}
                      handleEdit={handleEditBillingAddress}
                      fullWidth
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {billingAddress.emirate !== undefined && (
                  <Grid item xs={12} sm={4}>
                    <CustomTextfield
                      label="Emirate"
                      value={billingAddress.emirate}
                      config={{
                        field: "emirate",
                        isRequired: true,
                        section: "billingAddress",
                      }}
                      handleEdit={handleEditBillingAddress}
                      fullWidth
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
              </>
            )}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Roboto Serif', serif",
                  mt: 2,
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
                Terms & Conditions
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "-10px",
                }}
              >
                <Checkbox
                  checked={termsAndConditionChecked}
                  onChange={(e) =>
                    setTermsAndConditionChecked(e.target.checked)
                  }
                  sx={{
                    "&.Mui-checked": {
                      color: "#a16149", // Ensures checked state has the same color
                    },
                  }}
                />

                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "'Roboto Serif', serif",
                    fontWeight: "500",
                  }}
                >
                  I acknowledge and agree to the{" "}
                  <Link
                    to="/termsAndCondition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </Link>
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
                fontSize: { xs: "18px" },
                p: 1,
              }}
              disabled={isButtonDisabled}
              onClick={() => handleOrderPlacement()}
              // onClick={handlePayNowClick}
            >
              Pay Now
            </Button>

            <SuccessModal open={isModalOpen} onClose={handleModalClose} />
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
              key={item.productId}
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
              <Badge
                badgeContent={item.quantity}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#a16149",
                    color: "white",
                  },
                }}
              >
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
                {`${currency} ${(item.price * item.quantity).toLocaleString()}`}
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
              label="Discount code or Gift card"
              config={{ field: "code", isRequired: true }}
              handleEdit={handleCodeChange}
              sx={{
                flex: 1, // Allows the TextField to take remaining space
                height: "56px", // Matches the default Button height
              }}
              error={!discount.isValid}
              helperText={
                code.length > 0 && !discount.isValid && discount.message
                  ? discount.message
                  : ""
              }
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
              onClick={handleApply}
              disabled={code.length <= 0}
            >
              {discountLoading ? "Checking..." : "Apply"}
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
            >{`Subtotal (${cartItems.length} ${
              cartItems.length > 1 ? "items" : "item"
            })`}</Typography>
            <Typography
              sx={{
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "500",
                fontSize: { xs: "11px", sm: "12px", md: "14px" },
              }}
            >
              {`${currency} ${billAmount.toLocaleString()}`}
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
              {`${currency} ${billAmount.toLocaleString()}`}
            </Typography>
          </Box>
        </Card>
      </Card>
      <Snackbar
        variant="success"
        open={paymentSuccess}
        autoHideDuration={6000}
        onClose={() => setPaymentSuccess(false)}
      ></Snackbar>
    </>
  );
};

export default CheckoutForm;

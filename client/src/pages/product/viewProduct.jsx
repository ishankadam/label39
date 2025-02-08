import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductToCart, appUrl, imageUrl, phoneNumber } from "../../api";
import { whatsappQueryMessage } from "../../common";
import { addToCart, showSnackbar } from "../../store/cartSlice";
import Footer from "../homepage/footer";

const ViewProductModal = (props) => {
  const { isAdmin, product, open, setShowModal } = props;
  const [modalOpen, setModalOpen] = useState(open);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = product.images[selectedImageIndex];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({
    Upper: "XS",
    Bottom: "XS",
  });
  const userId = localStorage.getItem("userId");
  const [price, setPrice] = useState(product.price);
  const [cartProduct, setCartProduct] = useState(product);

  const handleClose = () => {
    setShowModal((prev) => ({
      ...prev,
      open: false,
      data: {},
    }));
  };

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

  const handleSizeChange = (category, newSize) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [category]: newSize,
    }));
  };

  const handleTalkToUs = () => {
    // Format the phone number (remove any non-digit characters)
    const formattedNumber = phoneNumber.replace(/\D/g, "");

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappQueryMessage);

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    let selectedPrice = 0;

    if (selectedSizes.Upper && !selectedSizes.Bottom) {
      // Find the price for the selected Upper size
      const upperSize = product.sizes.Upper?.find(
        (item) => item.size === selectedSizes.Upper
      );
      if (upperSize) selectedPrice = upperSize.price;
    } else if (selectedSizes.Bottom) {
      // Find the price for the selected Bottom size
      const upperSize = product.sizes.Upper?.find(
        (item) => item.size === selectedSizes.Upper
      );
      const bottomSize = product.sizes.Bottom?.find(
        (item) => item.size === selectedSizes.Bottom
      );
      if (
        bottomSize?.price &&
        upperSize?.price &&
        bottomSize?.price > upperSize?.price
      ) {
        selectedPrice = bottomSize.price;
      } else {
        selectedPrice = upperSize.price;
      }
    }
    setPrice(selectedPrice || product.price); // Default to 0 if no size is selected
    setCartProduct((prev) => ({
      ...prev,
      price: selectedPrice || prev.price,
      sizes: selectedSizes,
    }));
  }, [selectedSizes, product]);

  useEffect(() => {
    setPrice(product.price);
  }, [product.price]);

  const handleCopy = async ({ link }) => {
    try {
      await navigator.clipboard.writeText(link);
      dispatch(
        showSnackbar({
          message: `Link copied to clipboard!`,
          severity: "success",
        })
      );
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleAddToCart = () => {
    if (!userId) {
      navigate("/login");
    } else {
      const newCartProduct = {
        productId: cartProduct.productId,
        name: cartProduct.name,
        price: cartProduct.price,
        quantity: 1,
        deliveryIn: cartProduct.deliveryIn,
        images: [cartProduct.images[0]],
        sizes: {
          Upper: cartProduct.sizes.Upper,
          Bottom: cartProduct.sizes.Bottom,
        },
        sale: cartProduct.sale,
      };
      dispatch(addToCart(newCartProduct));
      handleClose();
      addProductToCart({ cartProduct: newCartProduct, userId: userId });
      dispatch(
        showSnackbar({
          message: `${cartProduct.name} ADDED TO CART`,
          severity: "success",
        })
      );
    }
  };

  const handleBuyNow = () => {
    const newCartProduct = {
      productId: cartProduct.cartProductId,
      name: cartProduct.name,
      price: cartProduct.price,
      quantity: 1,
      deliveryIn: cartProduct.deliveryIn,
      images: [cartProduct.images[0]],
      sizes: {
        Upper: "",
        Bottom: "",
      },
      sale: cartProduct.sale,
    };
    dispatch(addToCart(newCartProduct));
    navigate("/checkout");
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            padding: { xs: "20px 10px", sm: "20px 30px" },
            width: { xs: "95%", sm: "80%", md: "90%", lg: "75%" },
            maxHeight: "100%",
            maxWidth: "100%",
            overflowY: "auto",
            position: "relative",
            // borderRadius: "10px",
            border: "2px solid #d7d7d7",
          }}
        >
          {/* Close Icon Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: { xs: "5px", sm: "10px" },
              right: { xs: "5px", sm: "10px" },
              zIndex: 10, // Ensure it is above other elements
              backgroundColor: "rgba(255,255,255,0.8)", // Slight background to make it visible
              color: "#494949",
              width: { xs: "35px", sm: "auto" }, // Increase touchable area on mobile
              height: { xs: "35px", sm: "auto" }, // Increase touchable area on mobile
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />
          </IconButton>

          <Grid container spacing={2}>
            {/* Left: Image Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Main Image with Arrows */}
              <Box sx={{ position: "relative", width: "100%" }}>
                {/* <IconButton
                  onClick={handlePreviousImage}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "-6px",
                    zIndex: 1,
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton> */}
                <Box
                  component="img"
                  src={`${imageUrl}products/${selectedImage}`}
                  alt="Selected Product"
                  sx={{
                    marginTop: "20px",
                    width: "100%",
                    height: { xs: "350px", sm: "450px", md: "500px" },
                    objectFit: "contain",
                    marginBottom: "20px",
                  }}
                />
              </Box>

              {/* Thumbnails */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                {product.images.map((img, index) => (
                  <Box
                    component="img"
                    key={index}
                    src={`${imageUrl}products/${img}`}
                    alt={`Thumbnail ${index}`}
                    sx={{
                      width: { xs: "50px", sm: "70px" },
                      height: { xs: "70px", sm: "90px" },
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        selectedImageIndex === index
                          ? "2px solid #a16149"
                          : "none",
                    }}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </Box>
            </Grid>

            {/* Right: Product Info Section */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  sx={{
                    marginBottom: "10px",
                    marginRight: {
                      xs: "auto",
                      sm: "auto",
                      md: "35px",
                      lg: "50px",
                    },
                    display: "flex",
                    justifyContent: { xs: "center", sm: "center", md: "left" },
                    textAlign: { xs: "center", sm: "center", md: "left" },
                    fontWeight: "600",
                    fontSize: {
                      xs: "17px",
                      sm: "18px",
                      md: "20px",
                      lg: "22px",
                    },
                    color: "#494949",
                    fontFamily: "'Cinzel Serif', serif ",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h5"
                  // color="text.secondary"
                  sx={{
                    marginBottom: "20px",
                    fontSize: { xs: "17px", sm: "18px", md: "20px" },
                    color: "rgba(55, 65, 81, 0.85)",
                    fontFamily: "'Roboto Condensed', serif ",
                    display: "flex",
                    justifyContent: { xs: "center", sm: "center", md: "left" },
                  }}
                >
                  RS. {price ? price : product.price}
                </Typography>

                {/* Size Chart */}
                <Link
                  href="#"
                  color="text.secondary"
                  sx={{
                    marginBottom: "15px",
                    display: "block",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: "600",
                    fontFamily: "'Roboto Serif', serif ",

                    // color: "rgba(55, 65, 81, 0.85)",
                  }}
                >
                  Size Chart
                </Link>

                <Box sx={{ marginBottom: "25px" }}>
                  {Object.entries(product.sizes).map(([category, sizes]) => (
                    <Box key={category} sx={{ marginBottom: "15px" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: "8px",
                          fontSize: { xs: "14px", sm: "16px" },
                          fontWeight: "600",
                          fontFamily: "'Roboto Serif', serif ",
                          color: "rgba(55, 65, 81, 0.85)",
                        }}
                      >
                        {category}
                      </Typography>
                      <ToggleButtonGroup
                        exclusive
                        value={selectedSizes[category] || ""}
                        onChange={(_event, newSize) =>
                          handleSizeChange(category, newSize)
                        }
                        aria-label={`${category} sizes`}
                        sx={{
                          display: "flex",
                          gap: 0,
                          flexWrap: "wrap",
                        }}
                      >
                        {sizes.map(({ size, quantity }) => (
                          <ToggleButton
                            size="small"
                            key={size}
                            variant="outlined"
                            color="custom"
                            value={size}
                            title={`Quantity: ${quantity}`}
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "#a16149",
                                color: "white",
                              },
                              border: "1px solid #ccc",
                              fontSize: "12px !important",
                              textAlign: "center",
                              width: "50px !important",
                            }}
                          >
                            {size}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </Box>
                  ))}
                </Box>

                {!isAdmin && (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        marginBottom: "25px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="custom"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        color="custom"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, marginBottom: "25px" }}>
                      <Button
                        startIcon={<ChatIcon />}
                        variant="outlined"
                        color="custom"
                        sx={{
                          width: "50%",
                        }}
                        onClick={handleTalkToUs}
                      >
                        Talk to Us
                      </Button>
                      <Button
                        startIcon={<ShareIcon />}
                        variant="outlined"
                        color="custom"
                        sx={{
                          width: "50%",
                        }}
                        onClick={() =>
                          handleCopy({
                            link: `${appUrl}/products/${product.productId}`,
                          })
                        }
                      >
                        Share
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Description */}
                <Box sx={{ marginBottom: "25px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "'Roboto Serif', serif ",
                      color: "rgba(55, 65, 81, 0.85)",
                    }}
                  >
                    Description
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "'Roboto Serif', serif ",
                      color: "rgba(55, 65, 81, 0.85)",
                    }}
                  >
                    {product.description.replace(/<br\/>/g, "")}
                  </Typography>
                </Box>

                <div
                  className="garment-delivery-details"
                  style={{ display: "flex" }}
                >
                  <div>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        fontFamily: "'Roboto Serif', serif ",
                        color: "rgba(55, 65, 81, 0.85)",
                      }}
                    >
                      Garment Details
                    </Typography>
                    {product["garmentDetails"].map((detail, index) => (
                      <Typography
                        key={index}
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          fontFamily: "'Roboto Serif', serif ",
                          color: "rgba(55, 65, 81, 0.85)",
                        }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </div>
                  <div style={{ margin: "0 25px" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        fontFamily: "'Roboto Serif', serif ",
                        color: "rgba(55, 65, 81, 0.85)",
                      }}
                    >
                      Delivery:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "'Roboto Serif', serif ",
                        color: "rgba(55, 65, 81, 0.85)",
                      }}
                    >
                      Made to order <br></br> {product["deliveryIn"]}
                    </Typography>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>

          {/* TODO => handle edit from modal */}

          {/* <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "right",
              marginTop: "20px",
              borderTop: "1px solid #ddd",
              paddingTop: "20px",
            }}
          >
            {isAdmin && (
              <>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </Button>
              </>
            )}
          </Box> */}
        </Box>
      </Modal>

      {/* Footer Section */}
      <Footer topSection={false} />
    </>
  );
};

export default ViewProductModal;

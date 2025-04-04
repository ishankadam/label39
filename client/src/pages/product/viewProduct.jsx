import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChatIcon from "@mui/icons-material/Chat";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductToCart,
  appUrl,
  imageUrl,
  messageUrl,
  phoneNumber,
} from "../../api";
import {
  addCommaToPrice,
  calculatePriceAfterDiscount,
  getCurrencySymbol,
  getSizeChart,
  whatsappQueryMessage,
} from "../../common";
import { addToCart, showSnackbar } from "../../store/cartSlice";
import Footer from "../homepage/footer";
import ShareViaWhatsApp from "../share-via-whatsapp/shareViaWhatsapp";

const ViewProductModal = (props) => {
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const sizeChart = useSelector((state) => state.cart.sizeChart);
  const [startIndex, setStartIndex] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { isAdmin, product, open, setShowModal } = props;
  const [selectedColor, setSelectedColor] = useState(
    product.allColors && product.allColors[0]
  );
  const [displayedProduct, setDisplayedProduct] = useState(product);
  const [modalOpen, setModalOpen] = useState(open);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = displayedProduct?.images[selectedImageIndex];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({
    Upper: "XS",
    Bottom: "XS",
  });
  const userId = localStorage.getItem("userId");
  const [price, setPrice] = useState(product?.price);
  const [cartProduct, setCartProduct] = useState(product);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Checks for mobile screens

  // Sample Size Chart Images (Replace with actual URLs)

  const sizeChartImages = getSizeChart(product?.category, sizeChart);

  // Slick Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleNext = () => {
    if (currentImageIndex < sizeChartImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

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

    // Get product details
    const { name, productId } = product;

    // Assuming the first image is the primary product image hosted on AWS S3
    const productUrl = `${messageUrl}/products/${productId}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(
      whatsappQueryMessage(name, productUrl)
    );

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  const handleShare = () => {
    const message = `Check out this product: ${product.name} - ${product.description}.\nBuy here: ${window.location.origin}/product/${product.productId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    let selectedPrice = 0;

    if (selectedSizes.Upper && !selectedSizes.Bottom) {
      // Find the price for the selected Upper size
      const upperSize =
        product &&
        product?.sizes.Upper?.find((item) => item.size === selectedSizes.Upper);
      if (upperSize) selectedPrice = upperSize.price;
    } else if (selectedSizes.Bottom) {
      // Find the price for the selected Bottom size
      const upperSize =
        (product &&
          product?.sizes.Upper?.find(
            (item) => item.size === selectedSizes.Upper
          )) ||
        product?.price;
      const bottomSize =
        (product &&
          product?.sizes.Bottom?.find(
            (item) => item.size === selectedSizes.Bottom
          )) ||
        product?.price;
      if (
        bottomSize?.price &&
        upperSize?.price &&
        bottomSize?.price > upperSize?.price
      ) {
        selectedPrice = bottomSize?.price;
      } else {
        selectedPrice = upperSize?.price;
      }
    }

    setCartProduct((prev) => ({
      ...prev,
      price: selectedPrice,
      sizes: selectedSizes,
    }));
  }, [selectedSizes, product]);

  useEffect(() => {
    setPrice(product?.price);
  }, [product?.price]);

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
    if (!userId) {
      dispatch(
        showSnackbar({
          message: `${cartProduct.name} ADDED TO CART, LOGIN TO SAVE CART FOR FURTHER USE`,
          severity: "success",
        })
      );
    } else {
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

  const [anchorEl, setAnchorEl] = useState(null);
  const openShareMenu = Boolean(anchorEl);

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseShareMenu = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (color === product.color) {
      setDisplayedProduct(product);
    } else {
      const relatedProduct = product.relatedProducts.find(
        (item) => item.color === color
      );
      setDisplayedProduct(relatedProduct);
    }
  };

  const handleProductImageClick = (image) => {
    if (product.images.includes(image)) {
      setSelectedColor(product.color);
      setDisplayedProduct(product);
    } else {
      const relatedProduct = product.relatedProducts.find((item) =>
        item.images.includes(image)
      );
      setDisplayedProduct(relatedProduct);
      setSelectedColor(relatedProduct.color);
    }
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
                  alignItems: "center",
                  gap: { xs: 0.5, sm: 1 },
                  mb: 1,
                  position: "relative",
                  width: "100%",
                }}
              >
                {/* Previous Arrow */}
                <IconButton
                  onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))}
                  sx={{
                    visibility:
                      product?.images.length > 5 && startIndex > 0
                        ? "visible"
                        : "hidden",
                    flexShrink: 0,
                    p: { xs: 0.5, sm: 1 },
                  }}
                >
                  <ChevronLeft
                    fontSize={window.innerWidth < 600 ? "small" : "medium"}
                  />
                </IconButton>

                {/* Thumbnails Container */}
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 0.5, sm: 1 },
                    overflow: "hidden",
                    width: "100%",
                    justifyContent: { xs: "space-between", sm: "center" },
                  }}
                >
                  {displayedProduct?.images
                    .slice(startIndex, startIndex + 5)
                    .map((img, index) => {
                      const originalIndex = startIndex + index;
                      return (
                        <Box
                          component="img"
                          key={originalIndex}
                          src={`${imageUrl}products/${img}`}
                          alt={`Thumbnail ${originalIndex}`}
                          sx={{
                            width: { xs: "50px", sm: "70px" },
                            height: { xs: "70px", sm: "90px" },
                            minWidth: { xs: "50px", sm: "70px" },
                            objectFit: "cover",
                            cursor: "pointer",
                            border:
                              selectedImageIndex === originalIndex
                                ? "2px solid #a16149"
                                : "1px solid #e0e0e0",
                            borderRadius: "4px",
                            flexShrink: 0,
                          }}
                          onClick={() => setSelectedImageIndex(originalIndex)}
                        />
                      );
                    })}
                </Box>

                {/* Next Arrow */}
                <IconButton
                  onClick={() =>
                    setStartIndex((prev) =>
                      Math.min(prev + 1, displayedProduct.images.length - 5)
                    )
                  }
                  sx={{
                    visibility:
                      displayedProduct?.images.length > 5 &&
                      startIndex + 5 < displayedProduct?.images.length
                        ? "visible"
                        : "hidden",
                    flexShrink: 0,
                    p: { xs: 0.5, sm: 1 },
                  }}
                >
                  <ChevronRight
                    fontSize={window.innerWidth < 600 ? "small" : "medium"}
                  />
                </IconButton>
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
                  {displayedProduct?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: "10px",
                    fontSize: { xs: "17px", sm: "18px", md: "20px" },
                    color: "rgba(55, 65, 81, 0.85)",
                    fontFamily: "'Roboto Condensed', serif ",
                    display: "flex",
                    justifyContent: { xs: "center", sm: "center", md: "left" },
                  }}
                >
                  <span style={{ fontWeight: "600" }}>
                    {getCurrencySymbol(props.country)}{" "}
                    {displayedProduct?.sale && displayedProduct?.sale.isActive
                      ? calculatePriceAfterDiscount(
                          displayedProduct?.price,
                          displayedProduct?.sale.discountType,
                          displayedProduct?.sale.discountValue
                        )
                      : addCommaToPrice(displayedProduct?.price)}
                  </span>
                  {displayedProduct?.sale &&
                    displayedProduct?.sale.isActive && (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            marginLeft: "8px",
                            color: "#989898",
                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                            fontFamily: "'Roboto Serif', serif",
                          }}
                        >
                          {getCurrencySymbol(props.country)}{" "}
                          {addCommaToPrice(displayedProduct?.price)}
                        </span>
                        <span
                          style={{
                            marginLeft: "8px",
                            color: "#989898",
                            fontSize: { xs: "12px", sm: "13px", md: "15px" },
                            fontFamily: "'Roboto Serif', serif",
                            fontWeight: "500",
                          }}
                        >
                          {`(${displayedProduct?.sale.discountValue}${
                            displayedProduct?.sale.discountType === "Percentage"
                              ? "%"
                              : getCurrencySymbol(props.country)
                          } off)`}
                        </span>
                      </>
                    )}
                </Typography>

                {/* Size Chart */}
                <Link
                  // to="/sizeChart"
                  onClick={() => setSizeChartOpen(true)}
                  color="text.secondary"
                  style={{
                    color: "rgba(55, 65, 81, 0.85)",
                    cursor: "pointer",
                    marginBottom: "15px",
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    fontFamily: "'Roboto Serif', serif",
                  }}
                >
                  Size Chart
                </Link>

                <Box sx={{ marginBottom: "25px" }}>
                  {displayedProduct &&
                    Object.entries(displayedProduct?.sizes).map(
                      ([category, sizes]) =>
                        sizes.length > 0 && (
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
                        )
                    )}
                </Box>

                <Box gap={2} alignItems="center" sx={{ marginBottom: "25px" }}>
                  <Box
                    display="flex"
                    gap={1}
                    alignItems="flex-end"
                    sx={{ marginBottom: "8px" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        fontFamily: "'Roboto Serif', serif ",
                        color: "rgba(55, 65, 81, 0.85)",
                      }}
                    >
                      Color:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "15px",
                        fontWeight: "400",
                        fontFamily: "'Roboto Serif', serif ",
                        color: "rgba(55, 65, 81, 0.85)",
                        textTransform: "capitalize",
                      }}
                    >
                      {displayedProduct?.color?.toLowerCase()}
                    </Typography>
                  </Box>
                  <Box display="flex" gap={2} alignItems="center">
                    {product?.relatedProductImages?.map((image, index) => (
                      <Box
                        component="img"
                        key={index}
                        src={`${imageUrl}products/${image}`}
                        alt={`Thumbnail ${index}`}
                        sx={{
                          width: { xs: "50px", sm: "70px" },
                          height: { xs: "70px", sm: "90px" },
                          minWidth: { xs: "50px", sm: "70px" },
                          objectFit: "cover",
                          cursor: "pointer",

                          borderRadius: "4px",
                          flexShrink: 0,
                          "&:hover": {
                            border: "2px solid #a16149",
                          },
                        }}
                        onClick={() => handleProductImageClick(image)}
                      />
                    ))}
                  </Box>
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
                        onClick={handleShareClick}
                      >
                        Share
                      </Button>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      open={openShareMenu}
                      onClose={handleCloseShareMenu}
                      PaperProps={{
                        style: {
                          width: anchorEl?.clientWidth, // Match button width
                        },
                      }}
                      sx={{
                        "& .MuiMenuItem-root": {
                          fontFamily: "'Roboto Serif', serif",
                          color: "#374151d9",
                          fontSize: {
                            xs: "0.7rem",
                            sm: "0.8rem",
                            md: "0.9rem",
                          },
                          padding: "8px auto",
                          minHeight: "unset",
                          "@media (max-width:600px)": {
                            padding: "6px auto",
                          },
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleCloseShareMenu();
                          handleCopy({
                            link: `${appUrl}/products/${product.productId}`,
                          });
                        }}
                        sx={{
                          fontFamily: "'Roboto Serif', serif",
                          color: "#374151d9",
                        }}
                      >
                        Copy URL
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCloseShareMenu();
                          // This will use your existing ShareViaWhatsApp component's functionality
                          handleShare();
                        }}
                        sx={{
                          fontFamily: "'Roboto Serif', serif",
                          color: "#374151d9",
                        }}
                      >
                        Share via WhatsApp
                      </MenuItem>
                    </Menu>
                    {/* <Menu
                      anchorEl={anchorEl}
                      open={openShareMenu}
                      onClose={handleCloseShareMenu}
                      PaperProps={{
                        sx: {
                          boxShadow: 2,
                          border: "1px solid #ccc",
                          backgroundColor: "white",
                          borderRadius: "0px 0px 5px 5px",
                          letterSpacing: "1px",
                          padding: "8px 4px",
                          width: anchorEl ? anchorEl.offsetWidth : "50%", // Dynamically match button width
                          minWidth: "50%", // Prevent collapsing on small screens
                          fontFamily: "'Roboto Serif', serif", // Ensuring menu inherits font-family
                          "@media (max-width:768px)": {
                            padding: "8px 2px",
                          },
                          "@media (max-width:600px)": {
                            padding: "8px 2px",
                          },
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleCloseShareMenu();
                          handleCopy({
                            link: `${appUrl}/products/${product.productId}`,
                          });
                        }}
                        sx={{
                          fontFamily: "'Roboto Serif', serif",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "0.9rem",
                          },
                          //                           // fontWeight: "600",
                          color: "#374151d9",
                          "@media (max-width:768px)": {
                            fontSize: "0.875rem",
                          },
                          "@media (max-width:600px)": {
                            fontSize: "0.75rem",
                          },
                        }}
                      >
                        Copy URL
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCloseShareMenu();
                          handleTalkToUs();
                        }}
                        sx={{
                          fontFamily: "'Roboto Serif', serif",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "0.9rem",
                          },
                          // fontWeight: "600",
                          color: "#374151d9",
                          "@media (max-width:768px)": {
                            fontSize: "0.875rem",
                          },
                          "@media (max-width:600px)": {
                            fontSize: "0.75rem",
                          },
                        }}
                      >
                        Share via WhatsApp
                      </MenuItem>
                    </Menu> */}
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
                    {displayedProduct?.description.replace(/<br\/>/g, "")}
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
                    {displayedProduct?.garmentDetails.map((detail, index) => (
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
                      Made to order <br></br> {displayedProduct?.deliveryIn}
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

      {/* Size Chart Dialog */}
      <Dialog
        open={sizeChartOpen}
        onClose={() => setSizeChartOpen(false)}
        fullWidth
        maxWidth={isMobile ? false : "md"}
        scroll="body"
        fullScreen={isMobile} // Optional: makes dialog fullscreen on mobile
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="span">
              Size Chart
            </Typography>
            <IconButton onClick={() => setSizeChartOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: isMobile ? 0 : 1 }}>
          {isMobile ? (
            // Mobile view - show all images stacked vertically
            <Box display="flex" flexDirection="column" alignItems="center">
              {sizeChartImages.map((image, index) => (
                <img
                  key={index}
                  src={`${imageUrl}categories/${image}`}
                  alt={`Size-chart-${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              ))}
            </Box>
          ) : (
            // Desktop view - show carousel with arrows
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={0}
              position="relative"
              minHeight="400px"
            >
              <IconButton
                onClick={handlePrev}
                disabled={currentImageIndex === 0}
                sx={{ mr: 1 }}
              >
                <ArrowBackIosIcon fontSize="large" />
              </IconButton>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
              >
                <img
                  src={`${imageUrl}categories/${sizeChartImages[currentImageIndex]}`}
                  alt={`Size-chart-view-${currentImageIndex + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <IconButton
                onClick={handleNext}
                disabled={currentImageIndex === sizeChartImages.length - 1}
                sx={{ ml: 1 }}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer Section */}
      <Footer topSection={false} />

      {/* Add this hidden component */}
      <div style={{ display: "none" }}>
        <ShareViaWhatsApp product={displayedProduct} />
      </div>
    </>
  );
};

export default ViewProductModal;

import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProductToCart,
  appUrl,
  getProductDetails,
  imageUrl,
} from "../../api";
import { addToCart, showSnackbar } from "../../store/cartSlice";

const ViewProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({
    Upper: "XS",
    Bottom: "XS",
  });
  const [price, setPrice] = useState(0);
  const userId = localStorage.getItem("userId");
  const [cartProduct, setCartProduct] = useState(product);
  const navigate = useNavigate();

  useEffect(() => {
    productId && getProductDetails({ productId, setProduct });
  }, [productId]);

  useEffect(() => {
    let selectedPrice = product?.price || 0;

    if (product?.sizes) {
      const upperSize = product?.sizes?.Upper?.find(
        (item) => item?.size === selectedSizes.Upper
      );
      const bottomSize = product?.sizes?.Bottom?.find(
        (item) => item?.size === selectedSizes.Bottom
      );

      if (
        bottomSize?.price &&
        upperSize?.price &&
        bottomSize.price > upperSize.price
      ) {
        selectedPrice = bottomSize.price;
      } else if (upperSize?.price) {
        selectedPrice = upperSize.price;
      }
    }

    setPrice(selectedPrice);
    setCartProduct((prev) => ({
      ...prev,
      price: selectedPrice,
      sizes: selectedSizes,
    }));
  }, [selectedSizes, product]);

  const handleSizeChange = (category, newSize) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [category]: newSize,
    }));
  };

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

  const selectedImage = product?.images?.[selectedImageIndex];

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
    <Box
      sx={{
        bgcolor: "background.paper",
        padding: { xs: "20px 10px", sm: "20px 30px" },
        width: { xs: "95%", sm: "80%", md: "90%", lg: "75%" },
        maxHeight: "100%",
        maxWidth: "100%",
        overflowY: "auto",
        position: "relative",
        border: "2px solid #d7d7d7",
        display: "flex", // Centering
        justifyContent: "center", // Horizontally center
        alignItems: "center", // Vertically center
        minHeight: "100vh", // Full screen height
        margin: "auto", // Ensures centering in case of flex issues
      }}
    >
      {/* Close Icon Button */}
      {product ? (
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
              {product?.images?.map((img, index) => (
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
                  display: "flex",
                  justifyContent: { xs: "center", sm: "center", md: "left" },
                  textAlign: { xs: "center", sm: "center", md: "left" },
                  fontWeight: "600",
                  fontSize: {
                    xs: "18px",
                    sm: "18px",
                    md: "20px",
                    lg: "24px",
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
                  fontSize: { xs: "18px", sm: "18px", md: "20px" },
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
                  fontSize: "16px",
                  fontWeight: "600",
                  fontFamily: "'Roboto Serif', serif ",

                  // color: "rgba(55, 65, 81, 0.85)",
                }}
              >
                Size Chart
              </Link>

              <Box sx={{ marginBottom: "25px" }}>
                {Object.entries(product?.sizes)?.map(([category, sizes]) => (
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
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default ViewProductPage;

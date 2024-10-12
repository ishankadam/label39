import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  Link,
  Grid,
  Modal,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Footer from "../homepage/footer";

const ViewProductModal = (props) => {
  const [open, setOpen] = useState(props.open);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const selectedImage = props.product.imgSrc[selectedImageIndex];

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : props.product.imgSrc.length - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < props.product.imgSrc.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleClose = () => {
    props.setShowModal((prev) => ({
      ...prev,
      open: false,
      data: {},
    }));
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            padding: "20px",
            width: "80%",
            maxHeight: "100%",
            maxWidth: "100%",
            overflowY: "auto",
          }}
        >
          <Grid container spacing={4}>
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
                <IconButton
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
                    right: 0,
                    zIndex: 1,
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
                <img
                  src={selectedImage}
                  alt="Selected Product"
                  style={{
                    width: "100%",
                    height: "600px",
                    objectFit: "contain",
                    marginBottom: "20px",
                  }}
                />
              </Box>

              {/* Thumbnails */}
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                {props.product.imgSrc.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        selectedImageIndex === index
                          ? "2px solid black"
                          : "none",
                    }}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </Box>
            </Grid>

            {/* Right: Product Info Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ paddingLeft: { xs: 0, md: 3 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  {props.product.label}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ marginBottom: "20px" }}
                >
                  RS. {props.product.price}
                </Typography>

                {/* Size Chart */}
                <Link href="#" sx={{ marginBottom: "10px", display: "block" }}>
                  Size Chart
                </Link>
                <Box sx={{ display: "flex", gap: 2, marginBottom: "20px" }}>
                  {props.product.sizes.map((size) => (
                    <Button key={size} variant="outlined" color="success">
                      {size}
                    </Button>
                  ))}
                </Box>

                {/* Quantity */}
                <Box sx={{ marginBottom: "20px" }}>
                  <Typography>Quantity</Typography>
                  <Box sx={{ display: "flex", gap: 1, marginTop: "10px" }}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </Button>
                    <Button variant="outlined" color="success">
                      {quantity}
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() =>
                        setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
                      }
                    >
                      -
                    </Button>
                  </Box>
                </Box>

                {/* Add to Cart and Buy Now */}
                <Box sx={{ display: "flex", gap: 2, marginBottom: "20px" }}>
                  <Button variant="contained" color="success">
                    Add to Cart
                  </Button>
                  <Button variant="contained" color="success">
                    Buy Now
                  </Button>
                </Box>

                {/* Talk to Us and Share */}
                <Box sx={{ display: "flex", gap: 2, marginBottom: "20px" }}>
                  <Button
                    startIcon={<ChatIcon />}
                    variant="outlined"
                    color="success"
                  >
                    Talk to Us
                  </Button>
                  <Button
                    startIcon={<ShareIcon />}
                    variant="outlined"
                    color="success"
                  >
                    Share
                  </Button>
                </Box>

                {/* Description */}
                <Box sx={{ marginBottom: "20px" }}>
                  <Typography variant="h6">Description</Typography>
                  <Typography>{props.product.description}</Typography>
                </Box>

                <div
                  className="garment-delivery-details"
                  style={{ display: "flex" }}
                >
                  <div>
                    <Typography variant="h6">Garment Details</Typography>
                    {props.product.garmentDetails.map((detail, index) => (
                      <Typography key={index}>{detail}</Typography>
                    ))}
                  </div>
                  <div style={{ margin: "0 20px" }}>
                    <Typography variant="h6">Delivery in:</Typography>
                    <Typography>{props.product.deliveryInfo}</Typography>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Footer Section */}
      <Footer topSection={false} />
    </>
  );
};

export default ViewProductModal;

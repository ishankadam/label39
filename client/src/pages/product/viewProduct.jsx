import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  Modal,
  Link,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Footer from "../homepage/footer";
import { imageUrl } from "../../api";

const ViewProductModal = (props) => {
  const { isAdmin, product, open, setShowModal, setShowEditModal } = props;
  const [modalOpen, setModalOpen] = useState(open);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = product.images[selectedImageIndex];

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.images.length - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < product.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleClose = () => {
    setShowModal((prev) => ({
      ...prev,
      open: false,
      data: {},
    }));
  };

  const handleEditProduct = () => {
    setShowModal((prev) => ({
      ...prev,
      open: false,
      data: {},
    }));
    setShowEditModal({
      open: true,
      data: product,
    });
  };

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

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
            padding: "20px 50px",
            width: "70%",
            maxHeight: "100%",
            maxWidth: "100%",
            overflowY: "auto",
            position: "relative",
            // borderRadius: "10px",
            border: "2px solid #d7d7d7",
          }}
        >
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
                    right: "-6px",
                    zIndex: 1,
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
                <img
                  src={`${imageUrl}${selectedImage}`}
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
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={`${imageUrl}${img}`}
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
                    fontWeight: "600",
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
                    fontSize: "20px",
                    color: "rgba(55, 65, 81, 0.85)",
                    fontFamily: "'Roboto Condensed', serif ",
                  }}
                >
                  RS. {product.price}
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

                <Box>
                  {Object.entries(product.sizes).map(([category, sizes]) => (
                    <Box key={category} sx={{ marginBottom: "20px" }}>
                      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        {category}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        {sizes.map(({ size, quantity }) => (
                          <Button
                            key={size}
                            variant="outlined"
                            color="success"
                            title={`Quantity: ${quantity}`}
                          >
                            {size}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Description */}
                <Box sx={{ marginBottom: "20px" }}>
                  <Typography variant="h6">Description</Typography>
                  <Typography>
                    {product.description.replace(/<br\/>/g, "")}
                  </Typography>
                </Box>

                <div
                  className="garment-delivery-details"
                  style={{ display: "flex" }}
                >
                  <div>
                    <Typography variant="h6">Garment Details</Typography>
                    {product["garmentDetails"].map((detail, index) => (
                      <Typography key={index}>{detail}</Typography>
                    ))}
                  </div>
                  <div style={{ margin: "0 20px" }}>
                    <Typography variant="h6">Delivery in:</Typography>
                    <Typography>{product["deliveryIn"]}</Typography>
                  </div>
                </div>
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
            </Grid>
          </Grid>

          {/* Buttons Section at the Bottom */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "right",
              marginTop: "20px",
              borderTop: "1px solid #ddd",
              paddingTop: "20px",
            }}
          >
            {isAdmin ? (
              <>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleEditProduct}
                >
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" color="success">
                  Add to Cart
                </Button>
                <Button variant="contained" color="success">
                  Buy Now
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Modal>

      {/* Footer Section */}
      <Footer topSection={false} />
    </>
  );
};

export default ViewProductModal;

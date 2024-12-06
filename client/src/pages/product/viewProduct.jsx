import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  Modal,
  Card,
  Link,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Footer from "../homepage/footer";
import { imageUrl } from "../../api";
import { products } from "../../common";

const ViewProductModal = (props) => {
  const { isAdmin, product, open, setShowModal, setShowEditModal } = props;
  const [modalOpen, setModalOpen] = useState(open);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = product.images[selectedImageIndex];
  const [selectedSizes, setSelectedSizes] = useState({});
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

  const handleSizeChange = (category, newSize) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [category]: newSize, // Only one size per category
    }));
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
            width: { xs: "100%", sm: "80%", md: "90%", lg: "70%" },
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
                  src={`${imageUrl}${selectedImage}`}
                  alt="Selected Product"
                  sx={{
                    width: "100%",
                    height: { xs: "370px", sm: "450px", md: "500px" },
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
                    src={`${imageUrl}${img}`}
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
                        onChange={(event, newSize) =>
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
                      <Button variant="outlined" color="custom" sx={{}}>
                        Add to Cart
                      </Button>
                      <Button variant="contained" color="custom">
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
                      Delivery in:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "'Roboto Serif', serif ",
                        color: "rgba(55, 65, 81, 0.85)",
                      }}
                    >
                      {product["deliveryIn"]}
                    </Typography>
                  </div>
                </div>
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
            {isAdmin && (
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

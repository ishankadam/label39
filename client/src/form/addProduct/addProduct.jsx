import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import CustomTextfield from "../../components/textfield/customTextfield";
import {
  availableSizes,
  categories,
  deliveryIn,
  garmentDetails,
} from "../../common";
import ChipTextfield from "../../components/textfield/chipTextfield";
import RemoveIcon from "@mui/icons-material/Remove";
import { createProduct, updateProduct } from "../../api";
import UploadFiles from "../../components/upload/uploadFiles";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import "./addProduct.css";

const AddEditProductModal = (props) => {
  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    sizes: [{ category: "Upper", sizes: [] }], // Default category
    garmentDetails: [],
    deliveryIn: [],
    images: [],
  });
  const [bottomCategoryVisible, setBottomCategoryVisible] = useState(false);

  useEffect(() => {
    if (props.product) {
      setProductDetails({
        ...props.product,
        sizes: Object.entries(props.product.sizes || {}).map(
          ([key, values]) => ({
            category: key,
            sizes: values,
          })
        ),
      });
    }
  }, [props.product]);

  const handleAddSize = (categoryIndex) => {
    const updatedSizes = [...productDetails.sizes];
    updatedSizes[categoryIndex].sizes.push({ size: "", quantity: 0, price: 0 });
    setProductDetails((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleRemoveSize = (categoryIndex, sizeIndex) => {
    const updatedSizes = [...productDetails.sizes];
    updatedSizes[categoryIndex].sizes = updatedSizes[
      categoryIndex
    ].sizes.filter((_, i) => i !== sizeIndex);
    setProductDetails((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleCategory = (visibility) => {
    setBottomCategoryVisible(visibility);

    setProductDetails((prev) => {
      // If visibility is false, remove the "Bottom" category
      if (!visibility) {
        return {
          ...prev,
          sizes: prev.sizes.filter(
            (category) => category.category !== "Bottom"
          ),
        };
      }

      // If visibility is true, add the "Bottom" category
      return {
        ...prev,
        sizes: [...prev.sizes, { category: "Bottom", sizes: [] }],
      };
    });
  };

  const handleEdit = (value, field) => {
    setProductDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (files) => {
    setProductDetails((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = () => {
    // Save logic for create or update product
    handleClose();
  };

  const handleClose = () => {
    props.setShowModal((prev) => ({
      ...prev,
      show: false,
      data: {},
    }));
  };

  useEffect(() => {
    console.log(productDetails);
  }, [productDetails]);

  return (
    <Dialog
      className="add-product-modal"
      open={props.open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Roboto Serif', serif",
            color: "#a16149",
            fontWeight: "600",
            textAlign: { xs: "center", md: "left" },
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
              md: "1.3rem",
              lg: "1.5rem",
            },
          }}
        >
          {props.product ? "Edit Product" : "Add Product"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={12} sm={6}>
            <CustomTextfield
              label="Product Name"
              value={productDetails.name}
              config={{ field: "name", isRequired: true }}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextfield
              label="Price"
              value={productDetails.price}
              config={{ field: "price", isRequired: true }}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextfield
              label="Description"
              value={productDetails.description}
              config={{ field: "description", isRequired: true }}
              handleEdit={handleEdit}
              multiline={true}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <SelectDropdown
              label="Category"
              optionList={categories}
              config={{ field: "category", isRequired: true }}
              handleEdit={handleEdit}
              value={productDetails.category}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            {productDetails.sizes.map((category, categoryIndex) => (
              <div
                key={`category-${categoryIndex}`}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Typography variant="h6">{category.category}</Typography>
                  <Button
                    color="custom"
                    style={{ width: "120px" }}
                    variant="outlined"
                    onClick={() => handleAddSize(categoryIndex)}
                  >
                    Add Size
                  </Button>
                </div>

                <div>
                  {category.sizes.map((size, sizeIndex) => (
                    <div
                      key={`size-${categoryIndex}-${sizeIndex}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <SelectDropdown
                        config={{
                          field: `sizes[${categoryIndex}].sizes[${sizeIndex}].size`,
                          isRequired: true,
                        }}
                        optionList={availableSizes}
                        label="Size"
                        value={size.size}
                        handleEdit={(value) => {
                          const updatedSizes = [...productDetails.sizes];
                          updatedSizes[categoryIndex].sizes[sizeIndex].size =
                            value;
                          setProductDetails((prev) => ({
                            ...prev,
                            sizes: updatedSizes,
                          }));
                        }}
                      />
                      <CustomTextfield
                        style={{ marginLeft: "15px" }}
                        label="Quantity"
                        config={{
                          field: `sizes[${categoryIndex}].sizes[${sizeIndex}].quantity`,
                          isRequired: true,
                        }}
                        type="number"
                        value={size.quantity}
                        handleEdit={(value) => {
                          const updatedSizes = [...productDetails.sizes];
                          updatedSizes[categoryIndex].sizes[
                            sizeIndex
                          ].quantity = value;
                          setProductDetails((prev) => ({
                            ...prev,
                            sizes: updatedSizes,
                          }));
                        }}
                      />
                      <CustomTextfield
                        style={{ marginLeft: "15px" }}
                        label="Price"
                        config={{
                          field: `sizes[${categoryIndex}].sizes[${sizeIndex}].price`,
                          isRequired: true,
                        }}
                        value={size.price}
                        handleEdit={(value) => {
                          const updatedSizes = [...productDetails.sizes];
                          updatedSizes[categoryIndex].sizes[sizeIndex].price =
                            value;
                          setProductDetails((prev) => ({
                            ...prev,
                            sizes: updatedSizes,
                          }));
                        }}
                      />
                      <RemoveIcon
                        style={{
                          marginLeft: "12px",
                          cursor: "pointer",
                          color: "#f00",
                        }}
                        onClick={() =>
                          handleRemoveSize(categoryIndex, sizeIndex)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Grid>

          <Button onClick={(e) => handleCategory(!bottomCategoryVisible)}>
            {bottomCategoryVisible ? "Remove Bottom" : "Add Bottom"}
          </Button>

          {/* Conditionally Render Bottom Category */}

          <Grid item xs={12} sm={12}>
            <ChipTextfield
              label="Garment Details"
              predefinedOptions={garmentDetails}
              handleEdit={handleEdit}
              config={{ field: "garmentDetails", isRequired: true }}
              value={productDetails.garmentDetails}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextfield
              label="Delivery In"
              predefinedOptions={deliveryIn}
              config={{ field: "deliveryIn", isRequired: true }}
              value={productDetails.deliveryIn}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <UploadFiles
              updateData={handleFileUpload}
              // isEdit={true}
              images={images}
              file={productDetails.images}
              acceptedFiles="image/png, image/jpeg"
              singleFile={false}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {props.product ? "Save Changes" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditProductModal;

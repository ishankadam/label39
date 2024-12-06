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
  Grid2,
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
import "./addProduct.css";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";

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
    updatedSizes[categoryIndex].sizes.push({ size: "", quantity: "" });
    setProductDetails((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleRemoveSize = (categoryIndex, sizeIndex) => {
    const updatedSizes = [...productDetails.sizes];
    updatedSizes[categoryIndex].sizes = updatedSizes[
      categoryIndex
    ].sizes.filter((_, i) => i !== sizeIndex);
    setProductDetails((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleAddCategory = () => {
    setProductDetails((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { category: "Bottom", sizes: [] }],
    }));
  };

  const handleRemoveCategory = (categoryIndex) => {
    setProductDetails((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== categoryIndex),
    }));
  };

  const handleEdit = (value, field) => {
    setProductDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (files) => {
    setImages(files);
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
            {" "}
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
                className="category-container"
              >
                <div
                  className="size-header"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="h6">{category.category}</Typography>
                  {categoryIndex > 0 && (
                    <Button
                      variant="outlined"
                      onClick={() => handleRemoveCategory(categoryIndex)}
                    >
                      Remove Category
                    </Button>
                  )}
                  <Button
                    color="custom"
                    sx={{ width: "120px" }}
                    variant="outlined"
                    className="add-size-button"
                    onClick={() => handleAddSize(categoryIndex)}
                  >
                    Add Size
                  </Button>
                </div>
                <div className="size-container">
                  {category.sizes.map((size, sizeIndex) => (
                    <div
                      className="size-wrapper"
                      key={`size-${categoryIndex}-${sizeIndex}`}
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
                        sx={{ marginLeft: "15px" }}
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
                      <Grid item xs={12} sm={6}>
                        <CustomTextfield
                          label="Price"
                          value={productDetails.price}
                          config={{ field: "price", isRequired: true }}
                          handleEdit={handleEdit}
                          sx={{ width: "100%", marginLeft: "10px" }}
                        />
                      </Grid>
                      <RemoveIcon
                        className="remove-icon"
                        onClick={() =>
                          handleRemoveSize(categoryIndex, sizeIndex)
                        }
                      />
                    </div>
                  ))}
                  {/* <Button
                    variant="outlined"
                    className="add-size-button"
                    onClick={() => handleAddSize(categoryIndex)}
                  >
                    Add Size
                  </Button> */}
                </div>
              </div>
            ))}
          </Grid>
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
              isEdit={true}
              images={images}
              file={productDetails.images}
              acceptedFiles="image/png, image/jpeg"
              // parentClass="product-form-container"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    e.target.checked
                      ? handleAddCategory()
                      : handleRemoveCategory(1)
                  }
                />
              }
              label="Add Bottom Category"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 2,
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          color="custom"
          sx={{ width: "160px", fontSize: "15px" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="custom"
          sx={{ width: "160px", fontSize: "15px" }}
          onClick={handleSubmit}
        >
          {props.product ? "Update Product" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditProductModal;

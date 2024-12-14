import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  Grid,
} from "@mui/material";
import CustomTextfield from "../../components/textfield/customTextfield";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import UploadFiles from "../../components/upload/uploadFiles";
import {
  availableSizes,
  deliveryIn,
  garmentDetails,
  sizeOptions,
} from "../../common";
import ChipTextfield from "../../components/textfield/chipTextfield";
import { createProduct, editProduct } from "../../api";
import "./addProduct.css";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

const AddEditProductModal = (props) => {
  const [images, setImages] = useState([]);
  const [showBottomSection, setShowBottomSection] = useState(false); // Toggle for bottom section
  const [categoryList, setCategoryList] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    sizes: {
      Upper: [{ size: "", quantity: "", price: "" }],
      Bottom: [],
    },
    garmentDetails: [],
    deliveryIn: [],
    images: [],
    bestseller: false,
  });

  // Handle input changes
  const handleEdit = (value, field, index, section) => {
    if (section) {
      setProductDetails((prev) => {
        const updatedSizes = [...prev.sizes[section]];
        updatedSizes[index] = { ...updatedSizes[index], [field]: value };
        return { ...prev, sizes: { ...prev.sizes, [section]: updatedSizes } };
      });
    } else {
      setProductDetails((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Handle file uploads
  const handleFileUpload = (files) => {
    console.log(files);
    setProductDetails((prev) => ({
      ...prev,
      images: files,
    }));
  };

  // Add a new row in sizes
  const addSizeRow = (section) => {
    setProductDetails((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [section]: [
          ...prev.sizes[section],
          { size: "", quantity: "", price: "" },
        ],
      },
    }));
  };

  // Remove a row from sizes
  const removeSizeRow = (section, index) => {
    setProductDetails((prev) => {
      const updatedSizes = prev.sizes[section].filter((_, i) => i !== index);
      return { ...prev, sizes: { ...prev.sizes, [section]: updatedSizes } };
    });
  };

  // Submit product details
  const handleSubmit = () => {
    try {
      if (props.isEdit) {
        editProduct({
          products: productDetails,
          setProducts: props.setProducts,
          setLoading: props.setLoading,
        });
      } else {
        createProduct({
          products: productDetails,
          setLoading: props.setLoading,
          setAllProduct: props.setProducts,
        });
      }
      props.handleModalClose();
    } catch (error) {
      console.error("Error processing product:", error);
    }
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
    const newCategoriesList = props.categories?.map((category) => ({
      label: category.name,
      value: category.name.toLowerCase().replace(/\s+/g, ""),
    }));
    setCategoryList(newCategoriesList);
  }, [props.categories]);

  useEffect(() => {
    if (props.isEdit && props.data) {
      setProductDetails({ ...props.data });
      setImages(
        Array.isArray(props.data.images)
          ? props.data.images
          : [props.data.images]
      );
    }
  }, [props.isEdit, props.data]);

  const handleAddBottomSection = (section) => {
    setShowBottomSection((prev) => !prev);
    if (productDetails.sizes.Bottom.length < 1) {
      setProductDetails((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [section]: [
            ...prev.sizes[section],
            { size: "", quantity: "", price: "" },
          ],
        },
      }));
    }
  };

  return (
    <Dialog
      className="add-product-modal"
      open={props.open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Typography variant="h6">
          {props.product ? "Edit Product" : "Add Product"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Product Fields */}
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
          <Grid item xs={12}>
            <CustomTextfield
              label="Description"
              value={productDetails.description}
              config={{ field: "description", isRequired: true }}
              handleEdit={handleEdit}
              multiline={true}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid xs={12} sm={12}>
            <SelectDropdown
              label="Category"
              optionList={categoryList}
              config={{ field: "category", isRequired: true }}
              handleEdit={handleEdit}
              value={productDetails.category}
              sx={{ width: "100%" }}
            />
          </Grid>
          {/* Sizes Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Sizes (Upper Section)</Typography>
            {productDetails.sizes.Upper.length > 0 &&
              productDetails.sizes.Upper?.map((row, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={4}>
                    <SelectDropdown
                      label="Size"
                      optionList={availableSizes}
                      config={{ field: "size", index: index, section: "Upper" }}
                      value={row.size}
                      handleEdit={handleEdit}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextfield
                      label="Quantity"
                      value={row.quantity}
                      config={{
                        field: "quantity",
                        index: index,
                        section: "Upper",
                      }}
                      handleEdit={handleEdit}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextfield
                      label="Price"
                      type="number"
                      value={row.price}
                      config={{
                        field: "price",
                        index: index,
                        section: "Upper",
                      }}
                      handleEdit={handleEdit}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ClearIcon
                      color="error"
                      onClick={() => removeSizeRow("Upper", index)}
                    />
                  </Grid>
                </Grid>
              ))}

            <AddIcon color="primary" onClick={() => addSizeRow("Upper")} />
          </Grid>
          {/* Bottom Section Toggle */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Add Bottom Section{" "}
              <Switch
                checked={showBottomSection}
                onChange={() => handleAddBottomSection("Bottom")}
              />
            </Typography>
            {showBottomSection && (
              <>
                <Typography variant="subtitle1">
                  Sizes (Bottom Section)
                </Typography>
                {productDetails.sizes.Bottom.map((row, index) => (
                  <Grid container spacing={2} key={index} alignItems="center">
                    <Grid item xs={4}>
                      <SelectDropdown
                        label="Size"
                        optionList={availableSizes}
                        value={row.size}
                        config={{
                          field: "size",
                          index: index,
                          section: "Bottom",
                        }}
                        handleEdit={handleEdit}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextfield
                        label="Quantity"
                        value={row.quantity}
                        config={{
                          field: "quantity",
                          index: index,
                          section: "Bottom",
                        }}
                        handleEdit={handleEdit}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextfield
                        label="Price"
                        value={row.price}
                        type="number"
                        config={{
                          field: "price",
                          index: index,

                          section: "Bottom",
                        }}
                        handleEdit={handleEdit}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ClearIcon
                        color="error"
                        onClick={() => removeSizeRow("Bottom", index)}
                      />
                    </Grid>
                  </Grid>
                ))}
                <AddIcon color="primary" onClick={() => addSizeRow("Bottom")} />
              </>
            )}
          </Grid>
          {/* Other Fields */}
          <Grid item xs={12}>
            <ChipTextfield
              label="Garment Details"
              predefinedOptions={garmentDetails}
              handleEdit={handleEdit}
              config={{ field: "garmentDetails", isRequired: true }}
              value={productDetails.garmentDetails}
            />
          </Grid>
          <div xs={12} sm={12}>
            <CustomTextfield
              label="Delivery In"
              predefinedOptions={deliveryIn}
              config={{ field: "deliveryIn", isRequired: true }}
              value={productDetails.deliveryIn}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Checkbox
              checked={productDetails.bestseller}
              config={{ field: "bestseller", isRequired: true }}
              onChange={(e) => handleEdit(e.target.checked, "bestseller")}
            />
            <Typography>Is this a bestseller?</Typography>
          </div>
          <Grid item xs={12}>
            <UploadFiles
              updateData={handleFileUpload}
              images={images}
              isEdit={props.isEdit}
              file={productDetails.images}
              acceptedFiles="image/png, image/jpeg"
              singleFile={false}
              category="products"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {props.isEdit ? "Save Changes" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditProductModal;

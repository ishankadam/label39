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
import ColorInputComponent from "../../components/color-picker/colorPicker";

const AddEditProductModal = (props) => {
  const [images, setImages] = useState([]);
  const [showBottomSection, setShowBottomSection] = useState(false); // Toggle for bottom section
  const [categoryList, setCategoryList] = useState([]);
  const [price, setPrice] = useState();
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    sizes: {
      Upper: [{ size: "", quantity: "", price: price }],
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
    setProductDetails((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleAllSizes = (event, category) => {
    // Check if checkbox is checked
    const allSizes = event.target.checked
      ? availableSizes.map((row) => ({
          size: row.value,
          quantity: 10,
          price: price,
        }))
      : []; // Reset sizes if unchecked

    setProductDetails((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes, // Preserve existing categories
        [category]: allSizes, // Update the specified category
      },
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

  const handlePriceChange = (value, field) => {
    setPrice(value);
    setProductDetails((prev) => {
      const updatedSizes = {};

      // Iterate through categories in sizes and update their price
      for (const category in prev.sizes) {
        updatedSizes[category] = prev.sizes[category].map((size) => ({
          ...size,
          price: value, // Update price for each size
        }));
      }

      return {
        ...prev,
        [field]: value, // Update the main price field
        sizes: updatedSizes, // Update sizes with new price
      };
    });
  };

  return (
    <Dialog
      // className="add-product-modal"
      open={props.open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Typography
          variant="h6"
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
            borderBottom: "1px solid #ccc",
          }}
        >
          {props.product ? "Edit Product" : "Add Product"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          {/* Product Fields */}
          <Grid xs={12} sm={6} mb={1}>
            <CustomTextfield
              label="Product Name"
              value={productDetails.name}
              config={{ field: "name", isRequired: true }}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid xs={12} sm={6} mb={1}>
            <CustomTextfield
              label="Price"
              value={productDetails.price}
              config={{ field: "price", isRequired: true }}
              handleEdit={handlePriceChange}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid xs={12} mb={2}>
            <CustomTextfield
              label="Description"
              value={productDetails.description}
              config={{ field: "description", isRequired: true }}
              handleEdit={handleEdit}
              multiline={true}
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} mb={1}>
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
        <Grid xs={12}>
          <Typography variant="subtitle1">Sizes (Upper Section)</Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox onChange={(event) => handleAllSizes(event, "Upper")} />
            <Typography>Add all sizes for upper?</Typography>
          </div>
          {productDetails.sizes.Upper.length > 0 &&
            productDetails.sizes.Upper?.map((row, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid xs={4}>
                  <SelectDropdown
                    label="Size"
                    optionList={availableSizes}
                    config={{ field: "size", index: index, section: "Upper" }}
                    value={row.size}
                    handleEdit={handleEdit}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid xs={4}>
                  <CustomTextfield
                    label="Quantity"
                    value={row.quantity}
                    config={{
                      field: "quantity",
                      index: index,
                      section: "Upper",
                    }}
                    handleEdit={handleEdit}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid xs={3}>
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
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid xs={1}>
                  <Button
                    color="custom"
                    sx={{ width: "50px" }}
                    className="add-size-button"
                    onClick={() => removeSizeRow("Upper", index)}
                  >
                    <ClearIcon color="black" />
                  </Button>
                </Grid>
              </Grid>
            ))}
          <Button
            variant="outlined"
            color="custom"
            sx={{ width: "50px" }}
            className="add-size-button"
            onClick={() => addSizeRow("Upper")}
          >
            <AddIcon variant="contained" className="add-size-button" />
          </Button>
        </Grid>
        {/* Bottom Section Toggle */}
        <Grid xs={12} mt={2} mb={2}>
          <Typography variant="subtitle1">
            Add Bottom Section{" "}
            <Switch
              checked={showBottomSection}
              onChange={() => handleAddBottomSection("Bottom")}
            />
          </Typography>
          {showBottomSection && (
            <>
              <Typography variant="subtitle1" mt={1}>
                Sizes (Bottom Section)
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  onChange={(event) => handleAllSizes(event, "Bottom")}
                />
                <Typography>Add all sizes for bottom?</Typography>
              </div>
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
                      sx={{ width: "100%" }}
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
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={3}>
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
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      color="custom"
                      sx={{ width: "50px" }}
                      className="add-size-button"
                      onClick={() => removeSizeRow("Bottom", index)}
                    >
                      <ClearIcon color="black" />
                    </Button>
                  </Grid>
                </Grid>
              ))}

              <Button
                variant="outlined"
                color="custom"
                sx={{ width: "50px" }}
                className="add-size-button"
                onClick={() => addSizeRow("Bottom")}
              >
                <AddIcon variant="contained" className="add-size-button" />
              </Button>
            </>
          )}
        </Grid>
        {/* Other Fields */}
        <Grid item xs={12} mb={2}>
          <ChipTextfield
            label="Garment Details"
            predefinedOptions={garmentDetails}
            handleEdit={handleEdit}
            config={{ field: "garmentDetails", isRequired: true }}
            value={productDetails.garmentDetails}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid xs={12} sm={12} mb={2}>
          <CustomTextfield
            label="Delivery In"
            predefinedOptions={deliveryIn}
            config={{ field: "deliveryIn", isRequired: true }}
            value={productDetails.deliveryIn}
            handleEdit={handleEdit}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Checkbox
            sx={{ marginLeft: "-10px" }}
            checked={productDetails.bestseller}
            config={{ field: "bestseller", isRequired: true }}
            onChange={(e) => handleEdit(e.target.checked, "bestseller")}
          />
          <Typography>Is this a bestseller product ?</Typography>
        </Grid>
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
        <Grid item xs={12} sm={12}>
          {/* <ColorInputComponent></ColorInputComponent> */}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="custom"
          sx={{ width: "200px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="custom"
          sx={{ width: "200px" }}
        >
          {props.isEdit ? "Save Changes" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditProductModal;

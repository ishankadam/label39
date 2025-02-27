import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createProduct, editProduct } from "../../api";
import {
  availableColorsForSelection,
  availableSizes,
  deliveryIn,
  garmentDetails,
} from "../../common";
import MultiSelectAutocomplete from "../../components/autocomplete/multiAutocomplete";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import ChipTextfield from "../../components/textfield/chipTextfield";
import CustomTextfield from "../../components/textfield/customTextfield";
import UploadFiles from "../../components/upload/uploadFiles";
import "./addProduct.css";

const AddEditProductModal = (props) => {
  const [images, setImages] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [products, setProducts] = useState(props.products);
  const [showBottomSection, setShowBottomSection] = useState(false); // Toggle for bottom section
  const [categoryList, setCategoryList] = useState([]);
  const [price, setPrice] = useState();
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    sizes: {
      Upper: [{ size: "", quantity: "", price: price, isCustom: false }],
      Bottom: [],
    },
    garmentDetails: [],
    deliveryIn: [],
    images: [],
    bestseller: false,
    color: "",
    priority: 0,
    relatedProducts: [],
  });

  // const colorList = availableColors.map((color) => ({
  //   label: color,
  //   value: color.toLowerCase().replace(/\s+/g, "-"), // Convert to lowercase and replace spaces with hyphens
  // }));

  // Handle input changes
  const handleEdit = (value, field, index, section) => {
    if (section) {
      setProductDetails((prev) => {
        const updatedSizes = [...prev.sizes[section]];
        updatedSizes[index] = { ...updatedSizes[index], [field]: value };
        return { ...prev, sizes: { ...prev.sizes, [section]: updatedSizes } };
      });
    } else if (field === "relatedProducts") {
      //dont push if the value is already in the array
      if (
        productDetails.relatedProducts.includes(value[value.length - 1].value)
      ) {
        return;
      }
      setProductDetails((prev) => ({
        ...prev,
        relatedProducts: [
          ...prev.relatedProducts,
          value && value[value.length - 1].value,
        ],
      }));
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
  const addSizeRow = (section, IsCustom) => {
    setProductDetails((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [section]: [
          ...prev.sizes[section],
          { size: "", quantity: "", price: "", isCustom: IsCustom },
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
    const newCategoriesList = props.categories
      ?.filter((row) => row.dropdownOption)
      .map((category) => ({
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
    } else {
      setProductDetails((prev) => ({
        ...prev,
        priority: props.data.priority,
      }));
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

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    // give me a array of object of product name and id
    const newProductsArray =
      products?.length > 0 &&
      products?.map((product) => ({
        label: product.name,
        value: product.productId,
      }));
    setProductsArray(newProductsArray);
  }, [products]);

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
            paddingBottom: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          {props.product ? "Edit Product" : "Add Product"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          {/* Product Fields */}

          <Grid item xs={12} sm={6} mb={1}>
            <CustomTextfield
              label="Product Name"
              value={productDetails.name}
              config={{ field: "name", isRequired: true }}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} mb={1}>
            <CustomTextfield
              label="Price"
              value={productDetails.price}
              config={{ field: "price", isRequired: true }}
              handleEdit={handlePriceChange}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} mb={0}>
            <CustomTextfield
              label="Description"
              value={productDetails.description}
              config={{ field: "description", isRequired: true }}
              handleEdit={handleEdit}
              multiline={true}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} mb={0}>
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
          <Grid item xs={12} mb={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Sizes (Upper Section)
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                onChange={(event) => handleAllSizes(event, "Upper")}
                sx={{ marginLeft: "-10px" }}
              />
              <Typography>Add all sizes for upper?</Typography>
            </div>
            {productDetails.sizes.Upper.length > 0 &&
              productDetails.sizes.Upper?.map((row, index) => (
                <Grid
                  container
                  spacing={{ xs: 1, sm: 2 }}
                  key={index}
                  alignItems="center"
                  // sx={{ borderBottom: "1px solid #ccc" }}
                >
                  <Grid item xs={6} sm={4}>
                    {!row.isCustom ? (
                      <SelectDropdown
                        label="Size"
                        optionList={availableSizes}
                        config={{
                          field: "size",
                          index: index,
                          section: "Upper",
                        }}
                        value={row.size}
                        handleEdit={handleEdit}
                        sx={{ width: "100%" }}
                      />
                    ) : (
                      <CustomTextfield
                        label="Size"
                        value={row.size}
                        config={{
                          field: "size",
                          index: index,
                          section: "Upper",
                        }}
                        handleEdit={handleEdit}
                        sx={{ width: "100%" }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
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
                  <Grid item xs={6} sm={3}>
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
                  <Grid item xs={6} sm={1}>
                    <Button
                      color="custom"
                      sx={{ width: "50px" }}
                      className="add-size-button"
                      onClick={() => removeSizeRow("Upper", index)}
                    >
                      <ClearIcon color="black" />
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        borderBottom: "0.5px solid #ccc",
                        margin: "4px auto 12px auto",
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            <Button
              variant="outlined"
              color="custom"
              sx={{ width: "50px", marginTop: "10px" }}
              className="add-size-button"
              onClick={() => addSizeRow("Upper")}
            >
              <AddIcon variant="contained" className="add-size-button" />
            </Button>
            <Button
              variant="outlined"
              color="custom"
              sx={{ width: "150px", marginTop: "10px", marginLeft: "10px" }}
              className="add-size-button"
              onClick={() => addSizeRow("Upper", true)}
            >
              Add custom size
            </Button>
          </Grid>
          {/* Bottom Section Toggle */}
          <Grid item xs={12} mb={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Sizes (Bottom Section)
              <Switch
                checked={showBottomSection}
                onChange={() => handleAddBottomSection("Bottom")}
              />
            </Typography>
            {showBottomSection && (
              <>
                {/* <Typography variant="subtitle1" mt={1}>
                  Sizes (Bottom Section)
                </Typography> */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    sx={{ marginLeft: "-10px" }}
                    onChange={(event) => handleAllSizes(event, "Bottom")}
                  />
                  <Typography>Add all sizes for bottom?</Typography>
                </div>
                {productDetails.sizes.Bottom.map((row, index) => (
                  <Grid container spacing={2} key={index} alignItems="center">
                    <Grid item xs={6} sm={4}>
                      {!row.isCustom ? (
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
                      ) : (
                        <CustomTextfield
                          label="Size"
                          value={row.size}
                          config={{
                            field: "size",
                            index: index,
                            section: "Bottom",
                          }}
                          handleEdit={handleEdit}
                          sx={{ width: "100%" }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={6} sm={4}>
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
                    <Grid item xs={6} sm={3}>
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
                    <Grid item xs={6} sm={1}>
                      <Button
                        color="custom"
                        sx={{ width: "50px" }}
                        className="add-size-button"
                        onClick={() => removeSizeRow("Bottom", index)}
                      >
                        <ClearIcon color="black" />
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          borderBottom: "0.5px solid #ccc",
                          margin: "4px auto 12px auto",
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}

                <Button
                  variant="outlined"
                  color="custom"
                  sx={{ width: "50px", marginTop: "10px" }}
                  className="add-size-button"
                  onClick={() => addSizeRow("Bottom")}
                >
                  <AddIcon variant="contained" className="add-size-button" />
                </Button>
                <Button
                  variant="outlined"
                  color="custom"
                  sx={{ width: "150px", marginTop: "10px", marginLeft: "10px" }}
                  className="add-size-button"
                  onClick={() => addSizeRow("Bottom", true)}
                >
                  Add custom size
                </Button>
              </>
            )}
          </Grid>
          {/* Other Fields */}
          <Grid item xs={12} mb={1}>
            <ChipTextfield
              label="Garment Details"
              predefinedOptions={garmentDetails}
              handleEdit={handleEdit}
              config={{ field: "garmentDetails", isRequired: true }}
              value={productDetails.garmentDetails}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} mb={1}>
            <ChipTextfield
              label="Delivery In"
              predefinedOptions={deliveryIn}
              config={{ field: "deliveryIn", isRequired: true }}
              value={productDetails.deliveryIn}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} mb={1}>
            <CustomTextfield
              label="priority"
              value={productDetails.priority}
              config={{ field: "priority", isRequired: true }}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center", mb: 0 }}>
            <Checkbox
              sx={{ marginLeft: "-10px" }}
              checked={productDetails.bestseller}
              config={{ field: "bestseller", isRequired: true }}
              onChange={(e) => handleEdit(e.target.checked, "bestseller")}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Is this a bestseller product ?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SelectDropdown
              label="Color"
              optionList={availableColorsForSelection}
              config={{ field: "color", isRequired: true }}
              value={productDetails.color}
              handleEdit={handleEdit}
              sx={{ width: "100%" }}
            />
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
          <Grid item xs={12}>
            <MultiSelectAutocomplete
              label="Related Products"
              options={productsArray}
              handleEdit={handleEdit}
              config={{ field: "relatedProducts" }}
              value={productDetails.relatedProducts}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* <ColorInputComponent></ColorInputComponent> */}
          </Grid>
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

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Dialog,
} from "@mui/material";
import CustomTextfield from "../../components/textfield/customTextfield";
import AutocompleteWithImage from "../../components/autocomplete/autocompleteWithImage";
import { createSale } from "../../api";

const SaleForm = (props) => {
  const [products, setProducts] = useState(props.products || []);
  const [productsArray, setProductsArray] = useState([]);
  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const [open, setOpen] = useState(false);
  const [saleData, setSaleData] = useState({
    name: "",
    discountType: "Percentage",
    discountValue: 0,
    products: null,
    isActive: true,
  });

  useEffect(() => {
    // give me a array of object of product name and id
    const newProductsArray =
      products?.length > 0 &&
      products?.map((product) => ({
        label: product.name,
        value: product.productId,
        image: product.images[0],
      }));
    setProductsArray(newProductsArray);
  }, [products]);

  const handleEdit = (value, field) => {
    setSaleData({
      ...saleData,
      [field]: value,
    });
  };

  useEffect(() => {
    console.log(props.open);
    setOpen(props.open);
  }, [props.open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSaleData({
      ...saleData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSale({
      saleData,
      setLoading: props.setLoading,
      setSaleData: props.setSaleData,
    });
    props.handleModalClose();
  };

  return (
    <Dialog
      open={open}
      onClose={props.handleModalClose}
      PaperProps={{
        style: {
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "auto",
          width: "900px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
          margin: "0 auto",
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create a Sale
        </Typography>

        <CustomTextfield
          label="Sale Name"
          name="name"
          config={{ field: "name", isRequired: true }}
          value={saleData.name}
          handleEdit={handleEdit}
          required
        />

        <TextField
          label="Discount Type"
          name="discountType"
          select
          value={saleData.discountType}
          onChange={handleChange}
          required
        >
          <MenuItem value="Percentage">Percentage</MenuItem>
          <MenuItem value="Amount">Amount</MenuItem>
        </TextField>

        <CustomTextfield
          label="Discount Value"
          name="discountValue"
          type="number"
          config={{ field: "discountValue", isRequired: true }}
          value={saleData.discountValue}
          handleEdit={handleEdit}
          required
          inputProps={{ min: 0 }}
        />

        <AutocompleteWithImage
          label="Products"
          name="products"
          options={productsArray}
          config={{ field: "products", isRequired: true }}
          value={saleData.products}
          handleEdit={handleEdit}
          inputProps={{ min: 0 }}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

export default SaleForm;

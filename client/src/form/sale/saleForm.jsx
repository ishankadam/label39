import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Dialog,
  IconButton,
  Stack,
} from "@mui/material";
import CustomTextfield from "../../components/textfield/customTextfield";
import AutocompleteWithImage from "../../components/autocomplete/autocompleteWithImage";
import { createSale } from "../../api";
import CloseIcon from "@mui/icons-material/Close";
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
    <Dialog open={open} onClose={props.handleModalClose} fullWidth>
      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingBottom: 3 }}
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
            Add Sale
          </Typography>
          <IconButton onClick={props.handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
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

          <Button variant="contained" color="custom" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default SaleForm;

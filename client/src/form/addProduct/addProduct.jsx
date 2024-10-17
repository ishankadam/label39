import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import CustomTextfield from "../../components/textfield/customTextfield";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import { availableSizes, deliveryIn, garmentDetails } from "../../common";
import ChipTextfield from "../../components/textfield/chipTextfield";
import RemoveIcon from "@mui/icons-material/Remove";
import "./addProduct.css";
import { Margin } from "@mui/icons-material";
import { createProduct } from "../../api";
import UploadFiles from "../../components/upload/uploadFiles";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    sizes: [],
    garmentDetails: [],
    deliveryIn: [],
    image: "",
  });

  const handleAddSize = () => {
    const newSize = { size: "", quantity: "" }; // Create a new size object
    setProductDetails((prev) => ({
      ...prev,
      sizes: [...prev.sizes, newSize],
    }));
  };

  const handleAllSizes = (event) => {
    let allSizes = [];

    if (event.target.checked) {
      allSizes = availableSizes.map((row) => {
        return { size: row.value, quantity: 0 };
      });
    }
    setProductDetails((prev) => ({
      ...prev,
      sizes: event.target.checked ? allSizes : [],
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...productDetails.sizes];
    updatedSizes[index][field] = value;
    setProductDetails((prev) => ({
      ...prev,
      sizes: updatedSizes,
    }));
  };

  const handleRemoveSize = (index) => {
    setProductDetails((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index), // Exclude the size at the specified index
    }));
  };

  const handleEdit = (value, field) => {
    const keys = field.split(".");
    setProductDetails((prev) => {
      let updatedProductDetails = { ...prev };

      if (field.startsWith("sizes[")) {
        const match = field.match(/sizes\[(\d+)\]\.(\w+)/);
        if (match) {
          const index = parseInt(match[1]);
          const key = match[2];
          const updatedSizes = [...updatedProductDetails.sizes];
          updatedSizes[index][key] = value;
          updatedProductDetails.sizes = updatedSizes;
        }
      } else {
        keys.reduce((acc, key, idx) => {
          if (idx === keys.length - 1) {
            acc[key] = value;
          } else {
            acc[key] = { ...acc[key] };
          }
          return acc[key];
        }, updatedProductDetails);
      }

      return updatedProductDetails;
    });
  };

  const handleSubmit = () => {
    createProduct(productDetails);
  };

  // useEffect(() => {
  //   console.log(productDetails);
  // }, [productDetails]);

  return (
    <div className="add-product-container">
      <Card className="add-product-card">
        <Typography variant="h3" className="add-product-title">
          Add Product
        </Typography>

        <CustomTextfield
          label="Product Name"
          config={{ field: "name", isRequired: true }}
          handleEdit={handleEdit}
          sx={{ margin: "10px" }}
        />

        <CustomTextfield
          label="Price"
          config={{ field: "price", isRequired: true }}
          handleEdit={handleEdit}
          sx={{ margin: "10px" }}
        />

        <CustomTextfield
          label="Description"
          config={{ field: "description", isRequired: true }}
          handleEdit={handleEdit}
          multiline={true}
          sx={{ margin: "10px" }}
        />
        <div className="size-header" style={{ display: "flex" }}>
          <FormControlLabel
            control={<Checkbox onChange={handleAllSizes} />}
            label="Available in All Sizes"
          />

          <Button
            variant="outlined"
            className="add-size-button"
            onClick={handleAddSize}
          >
            Add Size
          </Button>
        </div>

        <div className="size-container">
          {productDetails.sizes.map((element, index) => (
            <div className="size-wrapper" key={`sizes-${index}`}>
              <SelectDropdown
                config={{
                  field: `sizes[${index}].size`, // Unique field for each size
                  isRequired: true,
                }}
                optionList={availableSizes}
                label="Available Sizes"
                value={element.size}
                handleEdit={handleEdit}
              />
              <CustomTextfield
                label="Quantity"
                config={{
                  field: `sizes[${index}].quantity`, // Unique field for each quantity
                  isRequired: true,
                }}
                type={"number"}
                handleEdit={handleEdit}
              />
              <RemoveIcon
                className="remove-icon"
                onClick={() => handleRemoveSize(index)}
              />
            </div>
          ))}
        </div>

        <ChipTextfield
          label="Garment Details"
          predefinedOptions={garmentDetails}
          handleEdit={handleEdit}
          config={{
            field: `garmentDetails`, // Unique field for each quantity
            isRequired: true,
          }}
          sx={{ margin: "10px" }}
        />
        <CustomTextfield
          label="Delivery In"
          predefinedOptions={deliveryIn}
          config={{
            field: `deliveryIn`, // Unique field for each quantity
            isRequired: true,
          }}
          handleEdit={handleEdit}
          sx={{ margin: "10px" }}
        />
        <UploadFiles
          updateData={(file) => handleEdit(file, "image")} // Update the image state
          isEdit={true}
          file={productDetails.image} // Pass current image for editing
          acceptedFiles="image/png, image/jpeg, application/pdf" // Ensure these types are accepted
        />
        <Button variant="contained" onClick={() => handleSubmit()}>
          Add product
        </Button>
      </Card>
    </div>
  );
};

export default AddProduct;

import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import CustomTextfield from "../../components/textfield/customTextfield";

const SizeCategory = ({
  category,
  categoryIndex,
  handleAddSize,
  handleRemoveSize,
  updateProductDetails,
  availableSizes,
}) => {
  return (
    <div
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
          color="primary"
          style={{ width: "120px" }}
          variant="outlined"
          onClick={() => handleAddSize(categoryIndex)}
        >
          Add Size
        </Button>
      </div>
      <Grid container spacing={2}>
        {category.sizes.map((size, sizeIndex) => (
          <Grid item xs={12} key={`size-${categoryIndex}-${sizeIndex}`}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <SelectDropdown
                  config={{
                    field: `sizes[${categoryIndex}].sizes[${sizeIndex}].size`,
                    isRequired: true,
                  }}
                  optionList={availableSizes}
                  label="Size"
                  value={size.size}
                  handleEdit={(value) =>
                    updateProductDetails(
                      `sizes[${categoryIndex}].sizes[${sizeIndex}].size`,
                      value
                    )
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <CustomTextfield
                  label="Quantity"
                  config={{
                    field: `sizes[${categoryIndex}].sizes[${sizeIndex}].quantity`,
                    isRequired: true,
                  }}
                  type="number"
                  value={size.quantity}
                  handleEdit={(value) =>
                    updateProductDetails(
                      `sizes[${categoryIndex}].sizes[${sizeIndex}].quantity`,
                      value
                    )
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <CustomTextfield
                  label="Price"
                  config={{
                    field: `sizes[${categoryIndex}].sizes[${sizeIndex}].price`,
                    isRequired: true,
                  }}
                  value={size.price}
                  handleEdit={(value) =>
                    updateProductDetails(
                      `sizes[${categoryIndex}].sizes[${sizeIndex}].price`,
                      value
                    )
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <RemoveIcon
                  style={{
                    cursor: "pointer",
                    color: "#f00",
                  }}
                  onClick={() => handleRemoveSize(categoryIndex, sizeIndex)}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SizeCategory;

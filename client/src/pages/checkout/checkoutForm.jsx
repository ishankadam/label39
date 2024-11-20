import React from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import CustomTextfield from "../../components/textfield/customTextfield";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import { countries } from "../../common";

const CheckoutForm = () => {
  const handleEdit = () => {};
  return (
    <Card>
      <Typography variant="h4">Contact</Typography>
      <CustomTextfield
        label="Phone number"
        config={{ field: "phone", isRequired: true }}
        handleEdit={handleEdit}
        sx={{ margin: "10px" }}
      ></CustomTextfield>
      <Typography variant="h4">Delivery</Typography>
      <SelectDropdown
        label="Country"
        className="country-dropdown"
        variant="outlined"
        margin="normal"
        sx={{
          display: { xs: "none", md: "flex" },
          width: "120px",
          height: "40px",
          padding: "6px 4px",
          margin: "0px 10px !important",
          fontSize: "14px",
        }} // Add margin to the left for spacing
        required
        select
        name="country"
        // value={country}
        config={{ field: "country" }}
        handleEdit={handleEdit}
        optionList={countries}
      />
      <CustomTextfield
        label="First Name"
        config={{ field: "firstName", isRequired: true }}
        handleEdit={handleEdit}
        sx={{ margin: "10px" }}
      ></CustomTextfield>
      <CustomTextfield
        label="Last Name"
        config={{ field: "lastName", isRequired: true }}
        handleEdit={handleEdit}
        sx={{ margin: "10px" }}
      ></CustomTextfield>
      <CustomTextfield
        label="Location"
        config={{ field: "location", isRequired: true }}
        handleEdit={handleEdit}
        sx={{ margin: "10px" }}
        multiline={true}
      ></CustomTextfield>
      <CustomTextfield
        label="Appartment suit etc."
        config={{ field: "address" }}
        handleEdit={handleEdit}
        sx={{ margin: "10px" }}
        multiline={true}
      ></CustomTextfield>
      <CustomTextfield
        label="City"
        config={{ field: "city", isRequired: true }}
        handleEdit={handleEdit}
        sx={{ margin: "10px" }}
      ></CustomTextfield>
      <SelectDropdown
        label="State"
        className="country-dropdown"
        variant="outlined"
        margin="normal"
        sx={{
          display: { xs: "none", md: "flex" },
          width: "120px",
          height: "40px",
          padding: "6px 4px",
          margin: "0px 10px !important",
          fontSize: "14px",
        }} // Add margin to the left for spacing
        required
        select
        name="state"
        // value={country}
        config={{ field: "country" }}
        handleEdit={handleEdit}
        optionList={countries}
      />
      <CustomTextfield
        label="Pincode"
        config={{ field: "pincode", isRequired: true }}
        handleEdit={handleEdit}
        sx={{ margin: "10px" }}
      ></CustomTextfield>
    </Card>
  );
};

export default CheckoutForm;

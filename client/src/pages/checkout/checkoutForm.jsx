import React from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid2,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import CustomTextfield from "../../components/textfield/customTextfield";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import { countries } from "../../common";

const CheckoutForm = () => {
  const handleEdit = () => {};
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "none !important",
        boxShadow: "none",
        width: "100%",
        // maxWidth: 600,
        margin: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Roboto Serif', serif",
              fontWeight: "600",
              mb: 2,
            }}
          >
            Contact
          </Typography>
          <CustomTextfield
            label="Phone number"
            config={{ field: "phone", isRequired: true }}
            handleEdit={handleEdit}
            sx={{ width: "100%" }}
          ></CustomTextfield>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Roboto Serif', serif",
              mt: 2,
              fontWeight: "600",
            }}
          >
            Delivery
          </Typography>
        </Grid>

        {/* First Name and Last Name on the same row */}
        <Grid item xs={12} sm={6}>
          <CustomTextfield
            label="First Name"
            variant="outlined"
            config={{ field: "firstName", isRequired: true }}
            handleEdit={handleEdit}
            fullWidth
            required
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextfield
            label="Last Name"
            variant="outlined"
            config={{ field: "firstName", isRequired: true }}
            handleEdit={handleEdit}
            fullWidth
            required
            sx={{ width: "100%" }}
          />
        </Grid>

        {/* Address Field */}
        <Grid item xs={12}>
          <CustomTextfield
            label="Address"
            config={{ field: "address", isRequired: true }}
            handleEdit={handleEdit}
            fullWidth
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextfield
            label="Apartment, Suite, etc. (optional)"
            config={{ field: "apartment" }}
            handleEdit={handleEdit}
            fullWidth
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextfield
            label="City"
            config={{ field: "city", isRequired: true }}
            handleEdit={handleEdit}
            fullWidth
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextfield
            label="State"
            config={{ field: "state", isRequired: true }}
            handleEdit={handleEdit}
            fullWidth
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextfield
            label="Pincode"
            config={{ field: "pincode", isRequired: true }}
            handleEdit={handleEdit}
            fullWidth
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default CheckoutForm;

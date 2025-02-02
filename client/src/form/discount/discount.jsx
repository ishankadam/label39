import {
  Box,
  Button,
  Dialog,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createDiscount } from "../../api";
import CustomTextfield from "../../components/textfield/customTextfield";
import { showSnackbar } from "../../store/cartSlice";

const CreateDiscountForm = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(props.open);
  const [discount, setDiscount] = useState({
    code: "",
    discountType: "Percentage",
    value: "",
    expiresAt: "",
    usageLimit: "",
    onlyForNewUsers: false,
    description: "",
  });

  const handleChange = (value, field) => {
    setDiscount((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleSubmit = () => {
    createDiscount({
      discountData: discount,
      setLoading: props.setLoading,
      setDiscountData: props.setDiscountData,
    });
    props.handleModalClose();
    dispatch(
      showSnackbar({
        message: "Discount created successfully",
        severity: "success",
      })
    );
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
        <CustomTextfield
          label="Discount Code"
          name="code"
          config={{ field: "code", isRequired: true }}
          value={discount.code}
          handleEdit={handleChange}
          required
          fullWidth
        />
        <CustomTextfield
          label="Description"
          name="description"
          type="text"
          config={{ field: "description" }}
          value={discount.description}
          handleEdit={handleChange}
          fullWidth
        />

        <TextField
          label="Discount Type"
          name="discountType"
          select
          value={discount.discountType}
          onChange={(e) => handleChange(e.target.value, "discountType")}
          required
        >
          <MenuItem value="Percentage">Percentage</MenuItem>
          <MenuItem value="Amount">Amount</MenuItem>
        </TextField>

        <CustomTextfield
          label="Value"
          name="value"
          type="number"
          config={{ field: "value", isRequired: true }}
          value={discount.value}
          handleEdit={handleChange}
          required
          fullWidth
        />
        <Typography>Expiration Date</Typography>
        <CustomTextfield
          name="expiresAt"
          type="date"
          config={{ field: "expiresAt", isRequired: true }}
          value={discount.expiresAt}
          handleEdit={handleChange}
          InputLabelProps={{ shrink: true }} // This ensures the label does not overlap
          fullWidth
        />

        <CustomTextfield
          label="Usage Limit (Optional)"
          name="usageLimit"
          type="number"
          config={{ field: "usageLimit" }}
          value={discount.usageLimit}
          handleEdit={handleChange}
          fullWidth
        />

        <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
          Only for new users
          <Switch
            checked={discount.onlyForNewUsers}
            onChange={(e) => handleChange(e.target.checked, "onlyForNewUsers")}
          />
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Create Discount
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateDiscountForm;

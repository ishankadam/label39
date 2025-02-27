import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { changeOrderStatus } from "../../api";
import { orderStatus } from "../../common";
import SelectDropdown from "../select-dropdown/selectDropdown";

const StatusChangeModal = ({ open, handleClose, data, setAllOrders }) => {
  const [newStatus, setNewStatus] = useState(data.status);

  const handleChange = (value) => {
    setNewStatus(value);
  };

  const handleConfirm = () => {
    changeOrderStatus({
      orderId: data.orderId,
      orderStatus: newStatus,
      setOrders: setAllOrders,
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Change Order Status
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Changing the status will be reflected immediately, and an email will
          be sent for the corresponding status.
        </Typography>
        <SelectDropdown
          label="Order status"
          optionList={orderStatus}
          config={{ field: "orderStatus", isRequired: true }}
          handleEdit={handleChange}
          value={newStatus}
          sx={{ width: "100%" }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="custom"
            variant="contained"
            sx={{ ml: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StatusChangeModal;

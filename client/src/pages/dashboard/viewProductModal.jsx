import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import ViewOrders from "./viewOrders"; // Assuming ViewOrders is in the same directory

function ViewOrdersModal({ open, setShowModal, data }) {
  const handleClose = () => {
    setShowModal({ open: false, data: null }); // Close the modal
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ borderBottom: "1px solid rgba(93, 93, 93, 0.2)" }}>
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
            // paddingBottom: "10px",
            // borderBottom: "1px solid #ccc",
          }}
        >
          Order Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <ViewOrders data={data} setShowModal={setShowModal} />
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid rgba(93, 93, 93, 0.2)" }}>
        <Button
          onClick={handleClose}
          color="custom"
          variant="contained"
          sx={{ width: "120px" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewOrdersModal;

import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../store/cartSlice";

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const snackbars = useSelector((state) => state.cart.snackbars);

  return (
    <>
      {snackbars.map(({ id, message, severity = "info", duration = 4000 }) => (
        <Snackbar
          key={id}
          open={true}
          autoHideDuration={duration}
          onClose={() => dispatch(hideSnackbar(id))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => dispatch(hideSnackbar(id))}
            severity={severity}
            variant="filled"
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default CustomSnackbar;

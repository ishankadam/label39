import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SuccessModal = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "5px",

          p: { xs: 2, sm: 2 },
          textAlign: "center",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Checkmark circle */}
        <Box
          sx={{
            width: { xs: "60px", sm: "80px" },
            height: { xs: "60px", sm: "80px" },
            margin: "0 auto 16px",
            animation: "scaleIn 0.5s ease-out",
            "@keyframes scaleIn": {
              "0%": { transform: "scale(0)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        >
          {/* Background circle */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              bgcolor: "#A16149",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon
              sx={{ color: "white", fontSize: { xs: "30px", sm: "40px" } }}
            />
          </Box>
        </Box>

        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "600",
            fontSize: {
              xs: "20px",
              sm: "20px",
              md: "22px",
              lg: "25px",
            },
            color: "#2F3E4E",
            fontFamily: "'Cinzel', serif ",
          }}
        >
          Thank you for your gift card purchase!
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            fontWeight: "400",
            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "14px",
              lg: "14px",
            },
            fontFamily: "'Roboto Serif', serif ",
          }}
        >
          Your gift card will be sent via email address provided in the form.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          color="custom"
          variant="contained"
          onClick={props.onClose}
          sx={{
            px: { xs: 3, sm: 4 },
            py: 1,
            bgcolor: "#A16149",
            "&:hover": {
              bgcolor: "#8B4D3A",
            },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          CONTINUE SHOPPING
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SuccessModal;

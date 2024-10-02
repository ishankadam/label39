import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import shopImage from "../../assets/SHIRTS.png";
import "./shopDialog.css";
import { useShopContext } from "../../context/shopContext";
const ShopDialog = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { openShopMenu, closeDialog } = useShopContext();
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={false}
        onClose={closeDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent className="shop-menu-container">
          <div className="category-list">
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              CATEGORIES
            </Typography>
            <Button className="shop-button">SHIRTS</Button>
            <Button className="shop-button">CO-ORD SETS</Button>
            <Button className="shop-button">SUITS</Button>
            <Button className="shop-button">FESTIVE</Button>
          </div>
          <div className="category-list">
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              FEATURED
            </Typography>
            <Button className="shop-button">NEW ARRIVAL</Button>
            <Button className="shop-button">
              AS SEEN ON - CELEBRITY STYLE
            </Button>
            <Button className="shop-button">CLIENTS DAIRY</Button>
            <Button className="shop-button">KURTA SETS</Button>
            <Button className="shop-button">BEST SELLERS</Button>
          </div>
          <div className="shop-image">
            <img src={shopImage} alt="Example" className="centered-image" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ShopDialog;

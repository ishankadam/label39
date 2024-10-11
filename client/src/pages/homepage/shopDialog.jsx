import * as React from "react";
import { Typography } from "@mui/material";
import shopImage from "../../assets/SHIRTS.png";
import "./shopDialog.css";
import { useShopContext } from "../../context/shopContext";

const ShopDialog = () => {
  const { openShopMenu } = useShopContext();
  return openShopMenu ? (
    <div className="shop-menu-container">
      <div className="shop-menu-wrapper">
        <div className="category-list">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            CATEGORIES
          </Typography>
          <button className="shop-button">SHIRTS</button>
          <button className="shop-button">CO-ORD SETS</button>
          <button className="shop-button">SUITS</button>
          <button className="shop-button">FESTIVE</button>
        </div>
        <div className="category-list">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            FEATURED
          </Typography>
          <button className="shop-button">NEW ARRIVAL</button>
          <button className="shop-button">AS SEEN ON - CELEBRITY STYLE</button>
          <button className="shop-button">CLIENTS DAIRY</button>
          <button className="shop-button">KURTA SETS</button>
          <button className="shop-button">BEST SELLERS</button>
        </div>
        <div className="shop-image">
          <img src={shopImage} alt="Example" className="centered-image" />
        </div>
      </div>
    </div>
  ) : null;
};

export default ShopDialog;

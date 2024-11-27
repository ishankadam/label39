import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CustomAppbar from "./components/appbar/appbar";
import Home from "./pages/homepage/home";
import Shop from "./pages/shop/shop";
import AboutUs from "./pages/about-us/aboutUs";
import ContactUs from "./pages/contact-us/contactUs";
import { ShopProvider } from "./context/shopContext";
import ViewProduct from "./pages/product/viewProduct";
import OurStory from "./pages/our-story/ourStory";
import Login from "./form/login/login";
import Signup from "./form/signup/signup";
import AddProduct from "./form/addProduct/addProduct";
import CustomDrawer from "./components/drawer/drawer";
import { useState } from "react";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";
import FindUs from "./pages/homepage/findUs";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Fab, Tooltip } from "@mui/material";

const App = () => {
  const [cartDetails, setCartDetails] = useState({
    open: false,
    data: [],
  });
  return (
    <ShopProvider>
      <div>
        <CustomAppbar
          cartDetails={cartDetails}
          setCartDetails={setCartDetails}
        />
        <Tooltip
          title="Contact us on WhatsApp"
          arrow
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                bgcolor: "white",
                color: "#000",
                fontFamily: "'Roboto Serif', serif",
                padding: "12px 16px",
                margin: "5px", // Add margin
                fontSize: "14px", // Set font size
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Nice box shadow
              },
              "& .MuiTooltip-arrow": {
                color: "white", // Match arrow color to tooltip background
              },
            },
          }}
        >
          <Fab
            color="success"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 1000,
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#4caf50",
              },
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 30 }} />
          </Fab>
        </Tooltip>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/contactus" element={<FindUs />} />
          <Route exact path="/product" element={<ViewProduct />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/ourstory" element={<OurStory />} />
          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
        <CustomDrawer
          cartDetails={cartDetails}
          setCartDetails={setCartDetails}
        ></CustomDrawer>
      </div>
    </ShopProvider>
  );
};

export default App;

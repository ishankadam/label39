import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CustomAppbar from "./components/appbar/appbar";
import Home from "./pages/homepage/home";
import Shop from "./pages/shop/shop";
import AboutUs from "./pages/about-us/aboutUs";
import ContactUs from "./pages/contact-us/contactUs";
import ShopDialog from "./pages/homepage/shopDialog";
import { ShopProvider } from "./context/shopContext";

const App = () => {
  return (
    <ShopProvider>
      <div>
        <CustomAppbar />
        <ShopDialog />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </ShopProvider>
  );
};

export default App;

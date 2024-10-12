import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CustomAppbar from "./components/appbar/appbar";
import Home from "./pages/homepage/home";
import Shop from "./pages/shop/shop";
import AboutUs from "./pages/about-us/aboutUs";
import ContactUs from "./pages/contact-us/contactUs";
import ShopDialog from "./pages/homepage/shopDialog";
import { ShopProvider } from "./context/shopContext";
import ViewProduct from "./pages/product/viewProduct";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup";
import OurStory from "./pages/our-story/ourStory";

const App = () => {
  return (
    <ShopProvider>
      <div>
        <CustomAppbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/contactus" element={<ContactUs />} />
          <Route exact path="/product" element={<ViewProduct />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/ourstory" element={<OurStory />} />
        </Routes>
      </div>
    </ShopProvider>
  );
};

export default App;

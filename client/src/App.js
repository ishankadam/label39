import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CustomAppbar from "./components/appbar/appbar";
import Home from "./pages/homepage/home";
import Shop from "./pages/shop/shop";
import AboutUs from "./pages/about-us/aboutUs";
import ViewProduct from "./pages/product/viewProduct";
import OurStory from "./pages/our-story/ourStory";
import Login from "./form/login/login";
import Signup from "./form/signup/signup";
import CustomDrawer from "./components/drawer/drawer";
import { useEffect, useState } from "react";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";
import PaymentPage from "./pages/payment/paymentPage";
import DeliveryForm from "./pages/product/deliveryForm";
import Dashboard from "./pages/dashboard/dashboard";
import FindUs from "./pages/homepage/findUs";
import { Box, Fab, Tooltip } from "@mui/material";
import { getAllCategories, getAllProducts } from "./api";
import TermsAndConditions from "./pages/termsAndCondition/termsAndCondition";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GiftCardModal from "./form/giftCard/giftCard";
import PageNotFound from "./pages/not-found/pageNotFound";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import WhatsAppButton from "./components/actionButton/whatsappActionButton";
import { whatsappQueryMessage } from "./common";
import ProfilePage from "./pages/profile/profile";

const App = () => {
  const [cartDetails, setCartDetails] = useState({
    open: false,
    data: [],
  });
  const [allCategories, setAllCategories] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [country, setCountry] = useState("INR");
  const [isGiftCardModalOpen, setIsGiftCardModalOpen] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [showProductModal, setShowProductModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });

  const handleOpenGiftModal = () => setIsGiftCardModalOpen(true);
  const handleCloseGiftModal = () => setIsGiftCardModalOpen(false);

  useEffect(() => {
    getAllProducts({
      setProductsData: setAllProduct,
      setLoading,
      country,
      isActive: true,
    });
  }, [country]);

  useEffect(() => {
    getAllCategories({
      setCategories: setAllCategories,
    });
  }, [country]);

  const handleOpenAddProductModal = () => {
    setShowProductModal({
      show: true,
      isEdit: false,
      data: {
        priority: allProduct.length + 1,
      },
    });
  };

  const pathname = useLocation().pathname;

  // if (loading) {
  //   return (
  //     <Box
  //       className="loader-container"
  //       sx={{ display: "flex", flexDirection: "column" }}
  //     >
  //       <img src={LoaderGif} alt="Loading..." className="loader-gif" />
  //       <Typography
  //         sx={{
  //           textAlign: "center",
  //           mt: 2,
  //           fontFamily: "'cinzel', serif",
  //           fontWeight: "700",
  //           color: "#a16149",
  //         }}
  //       >
  //         loading . . .
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Provider store={store}>
      <div>
        <CustomAppbar
          cartDetails={cartDetails}
          setCartDetails={setCartDetails}
          country={country}
          setCountry={setCountry}
          userUpdated={userUpdated}
          setUserUpdated={setUserUpdated}
          setIsGiftCardModalOpen={setIsGiftCardModalOpen}
        />
        {pathname === "/dashboard" ? (
          <Fab
            color="#A16149"
            aria-label="add"
            sx={{
              width: "50px",
              height: "50px",
              background: "#A16149",
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 1000,
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#b77961",
              },
            }}
          >
            <AddOutlinedIcon
              sx={{ fontSize: 25, color: "white" }}
              onClick={handleOpenAddProductModal}
            />
          </Fab>
        ) : (
          <>
            <WhatsAppButton
              phoneNumber="+918652241163"
              message={whatsappQueryMessage}
            />

            <Tooltip
              title="Purchase Giftcard"
              arrow
              placement="left"
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
                color="#A16149"
                aria-label="add"
                sx={{
                  background: "#A16149",
                  position: "fixed",
                  bottom: 90,
                  right: 20,
                  zIndex: 1000,
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#b77961",
                  },
                }}
              >
                <CardGiftcardIcon
                  sx={{ fontSize: 30, color: "white" }}
                  onClick={handleOpenGiftModal}
                />
              </Fab>
            </Tooltip>
          </>
        )}

        {/* <SubscribeModal></SubscribeModal> */}
        <GiftCardModal
          open={isGiftCardModalOpen}
          onClose={handleCloseGiftModal}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                allProduct={allProduct}
                allCategories={allCategories}
                country={country}
              />
            }
          />
          <Route
            exact
            path="/shop"
            element={
              <Shop
                allProduct={allProduct}
                allCategories={allCategories}
                loading={loading}
                country={country}
              />
            }
          />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route
            exact
            path="/contactus"
            element={
              <Box sx={{ marginBottom: "180px" }}>
                <FindUs />
              </Box>
            }
          />
          <Route exact path="/product" element={<ViewProduct />} />
          <Route exact path="/giftCard" element={<GiftCardModal />} />
          <Route
            exact
            path="/login"
            element={<Login setUserUpdated={setUserUpdated} />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/ourstory" element={<OurStory />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/delivery" element={<DeliveryForm />} />
          <Route exact path="/payment" element={<PaymentPage />} />
          <Route
            exact
            path="/dashboard"
            element={
              <Dashboard
                country={country}
                showProductModal={showProductModal}
                setShowProductModal={setShowProductModal}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route
            exact
            path="/termsAndCondition"
            element={<TermsAndConditions />}
          />
          <Route exact path="/profile" element={<ProfilePage />} />
        </Routes>
        <CustomDrawer
          cartDetails={cartDetails}
          setCartDetails={setCartDetails}
        ></CustomDrawer>
        {/* <Box sx={{ height: 100 }} /> */}
      </div>
    </Provider>
  );
};

export default App;

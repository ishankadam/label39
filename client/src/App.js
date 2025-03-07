import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Box, Fab, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  getAllCategories,
  getAllCelebrityStyles,
  getAllClientDiaries,
  getProductsForHomepage,
} from "./api";
import "./App.css";
import { whatsappQueryMessage } from "./common";
import WhatsAppButton from "./components/actionButton/whatsappActionButton";
import CustomAppbar from "./components/appbar/appbar";
import CustomDrawer from "./components/drawer/drawer";
import LoaderTestPage from "./components/loaderTestPage";
import GiftCardModal from "./form/giftCard/giftCard";
import Login from "./form/login/login";
import ResetPassword from "./form/login/resetPassword";
import ForgotPassword from "./form/login/sendResetPasswordLimk";
import Signup from "./form/signup/signup";
import AboutUs from "./pages/about-us/aboutUs";
import Cart from "./pages/cart/cart";
import CelebrityStylePage from "./pages/celebrity-style/celebrityStylePage";
import Checkout from "./pages/checkout/checkout";
import ClientDiaryPage from "./pages/client-diary/clientDiaryPage";
import Dashboard from "./pages/dashboard/dashboard";
import FindUs from "./pages/homepage/findUs";
import Home from "./pages/homepage/home";
import SubscribeModal from "./pages/homepage/subscribeModal";
import PageNotFound from "./pages/not-found/pageNotFound";
import OurStory from "./pages/our-story/ourStory";
import PaymentPage from "./pages/payment/paymentPage";
import PrivacyPolicy from "./pages/privacy-policy/privacyPolicy";
import DeliveryForm from "./pages/product/deliveryForm";
import SizeChart from "./pages/product/sizeChart";
import ViewProduct from "./pages/product/viewProduct";
import ViewProductPage from "./pages/product/viewProductPage";
import ProfilePage from "./pages/profile/profile";
import ReturnsAndCancellations from "./pages/returnsAndCancellations/returnsAndCancellations";
import Shop from "./pages/shop/shop";
import TermsAndConditions from "./pages/termsAndCondition/termsAndCondition";
import UserOrders from "./pages/user-orders/userOrders";
import CustomSnackbar from "./snackbar/customSnackbar";
import { store } from "./store/store";
const App = () => {
  const [cartDetails, setCartDetails] = useState({
    open: false,
    data: [],
  });
  const [clientDiaries, setClientDiaries] = useState([]);
  const [celebrityStyles, setCelebrityStyles] = useState([]);
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
    // getAllProducts({
    //   setProductsData: setAllProduct,
    //   setLoading,
    //   country,
    //   isActive: true,
    //   page: 1,
    // });
    getProductsForHomepage({
      setProductsData: setAllProduct,
      country,
      setLoading,
    });
  }, [country]);

  useEffect(() => {
    getAllClientDiaries({
      setClientDiaries,
    });
    getAllCelebrityStyles({
      setCelebrityStyles,
    });
  }, []);

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
        priority: allProduct.totalProducts,
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
          allCategories={allCategories}
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
              phoneNumber="+9191378 45071"
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

        <SubscribeModal></SubscribeModal>
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
                celebrityStyles={celebrityStyles}
              />
            }
          />
          <Route
            exact
            path="/shop"
            element={<Shop allCategories={allCategories} country={country} />}
          />
          <Route exact path="/loaderTest" element={<LoaderTestPage />} />
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
          <Route exact path="/sizeChart" element={<SizeChart />} />
          <Route exact path="/giftCard" element={<GiftCardModal />} />
          <Route
            exact
            path="/login"
            element={<Login setUserUpdated={setUserUpdated} />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/ourstory" element={<OurStory />} />
          <Route
            exact
            path="/checkout"
            element={<Checkout country={country} setCountry={setCountry} />}
          />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/delivery" element={<DeliveryForm />} />
          <Route exact path="/payment" element={<PaymentPage />} />
          <Route exact path="/orders" element={<UserOrders />} />
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
          <Route exact path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route
            exact
            path="/returnsAndCancellations"
            element={<ReturnsAndCancellations />}
          />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route
            exact
            path="/clientsDiaries"
            element={<ClientDiaryPage clientDiaries={clientDiaries} />}
          />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/products/:productId" element={<ViewProductPage />} />
          <Route
            exact
            path="/celebrityStylePage"
            element={<CelebrityStylePage celebrityStyles={celebrityStyles} />}
          />

          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
        <CustomDrawer
          cartDetails={cartDetails}
          setCartDetails={setCartDetails}
        ></CustomDrawer>

        <CustomSnackbar />
        {/* <Box sx={{ height: 100 }} /> */}
      </div>
    </Provider>
  );
};

export default App;

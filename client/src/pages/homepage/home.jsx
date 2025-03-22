import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTestimonials } from "../../api";
import { setSubscribeModal } from "../../store/cartSlice";
import ViewProductModal from "../product/viewProduct";
import AsSeenOn from "./asSeenOn";
import BestSellerSection from "./bestSellerSection";
import CategorySection from "./categorySection";
import FeaturedSection from "./featuredSection";
import FindUs from "./findUs";
import Footer from "./footer";
import InstagramSection from "./instagramSection";
import MainCorousel from "./mainCorousel";
import Testimonials from "./testimonials";

const Home = (props) => {
  const [allProduct, setAllProduct] = useState(props.allProduct || []);
  const [celebrityStyles, setCelebrityStyles] = useState(
    props.celebrityStyles || []
  );
  const dispatch = useDispatch();
  const [allCategories, setAllCategories] = useState(props.allCategories);
  const [bestsellers, setBestsellers] = useState([]);
  const [shopByVideos, setshopByVideos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });

  useEffect(() => {
    setCelebrityStyles(props.celebrityStyles);
  }, [props.celebrityStyles]);

  useEffect(() => {
    const filteredCategories = props.allCategories.filter(
      (category) => category.show
    );
    setAllCategories(filteredCategories);
  }, [props.allCategories]);

  useEffect(() => {
    if (props.allProduct) {
      setAllProduct(props.allProduct);
      setBestsellers(props.allProduct.bestsellers);
      setshopByVideos(props.allProduct.shopByVideos);
    }
  }, [props.allProduct]);

  useEffect(() => {
    getAllTestimonials({ setTestimonials });
    const timer = setTimeout(() => {
      dispatch(setSubscribeModal(true));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleViewProduct = (product) => {
    setShowModal({
      open: true,
      data: product,
    });
  };

  return (
    <div>
      <MainCorousel></MainCorousel>
      <CategorySection allCategories={allCategories}></CategorySection>
      <FeaturedSection
        celebrityStyles={celebrityStyles}
        handleViewProduct={handleViewProduct}
        country={props.country}
      ></FeaturedSection>
      <BestSellerSection
        bestsellers={bestsellers}
        handleViewProduct={handleViewProduct}
        country={props.country}
      ></BestSellerSection>
      {shopByVideos && shopByVideos?.length > 0 && (
        <AsSeenOn
          handleViewProduct={handleViewProduct}
          shopByVideos={shopByVideos}
          country={props.country}
        ></AsSeenOn>
      )}
      <Testimonials testimonials={testimonials}></Testimonials>
      <InstagramSection></InstagramSection>
      <FindUs></FindUs>
      {showModal.open ? (
        <ViewProductModal
          open={showModal.open}
          product={showModal.data}
          setShowModal={setShowModal}
        ></ViewProductModal>
      ) : null}
      <Footer topSection={true}></Footer>
      {/* <Button
        onClick={() =>
          sendWhatsAppMessage({
            phone: "+918652241163",
            message: whatsappQueryMessage,
          })
        }
      >
        Send Whatsapp message
      </Button> */}
    </div>
  );
};

export default Home;

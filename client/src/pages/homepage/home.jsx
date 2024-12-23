import React, { useEffect, useState } from "react";
import MainCorousel from "./mainCorousel";
import CategorySection from "./categorySection";
import FeaturedSection from "./featuredSection";
import BestSellerSection from "./bestSellerSection";
import AsSeenOn from "./asSeenOn";
import Testimonials from "./testimonials";
import Footer from "./footer";
import FindUs from "./findUs";
import InstagramSection from "./instagramSection";
import ViewProductModal from "../product/viewProduct";
import { getAllTestimonials } from "../../api";

const Home = (props) => {
  const [allProduct, setAllProduct] = useState(props.allProduct || []);
  const [bestsellers, setBestsellers] = useState([]);
  const [asSeenOn, setAsSeenOn] = useState([]);
  const [shopByVideos, setshopByVideos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });

  useEffect(() => {
    setAllProduct(props.allProduct);
  }, [props.allProduct]);

  useEffect(() => {
    if (allProduct.length > 0) {
      const bestSellers = allProduct.filter((product) => product.bestseller);
      setBestsellers(bestSellers);
      const asSeenOnData = allProduct.filter((product) => product.asSeenOn);
      setAsSeenOn(asSeenOnData);
      const videosData = allProduct.filter((product) => product.videoSrc);
      setshopByVideos(videosData);
    }
  }, [allProduct]);

  useEffect(() => {
    getAllTestimonials({ setTestimonials });
  }, []);

  const handleViewProduct = (product) => {
    console.log(product);
    setShowModal({
      open: true,
      data: product,
    });
  };

  return (
    <div>
      <MainCorousel></MainCorousel>
      <CategorySection></CategorySection>
      <FeaturedSection
        shopByVideos={shopByVideos}
        handleViewProduct={handleViewProduct}
        country={props.country}
      ></FeaturedSection>
      <BestSellerSection
        bestsellers={bestsellers}
        handleViewProduct={handleViewProduct}
        country={props.country}
      ></BestSellerSection>
      <AsSeenOn
        handleViewProduct={handleViewProduct}
        asSeenOn={asSeenOn}
        country={props.country}
      ></AsSeenOn>
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
    </div>
  );
};

export default Home;

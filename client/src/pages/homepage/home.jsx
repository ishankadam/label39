import React, { useState } from "react";
import MainCorousel from "./mainCorousel";
import CategorySection from "./categorySection";
import FeaturedSection from "./featuredSection";
import BestSellerSection from "./bestSellerSection";
import AsSeenOn from "./asSeenOn";
import Testimonials from "./testimonials";
import Footer from "./footer";
import FindUs from "./findUs";
import ShopDialog from "./shopDialog";
import InstagramSection from "./instagramSection";

const Home = (props) => {
  return (
    <div>
      <MainCorousel></MainCorousel>
      <CategorySection></CategorySection>
      <FeaturedSection></FeaturedSection>
      <BestSellerSection></BestSellerSection>
      <AsSeenOn></AsSeenOn>
      <Testimonials></Testimonials>
      <InstagramSection></InstagramSection>
      <FindUs></FindUs>
      <Footer topSection={true}></Footer>
    </div>
  );
};

export default Home;

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

const Home = (props) => {
  return (
    <div>
      <MainCorousel></MainCorousel>
      <CategorySection></CategorySection>
      <FeaturedSection></FeaturedSection>
      <BestSellerSection></BestSellerSection>
      <AsSeenOn></AsSeenOn>
      <Testimonials></Testimonials>
      <FindUs></FindUs>
      <Footer topSection={true}></Footer>
    </div>
  );
};

export default Home;

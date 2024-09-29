import React from "react";
import bestSeller1 from "../../assets/bestseller1.jpeg";
import bestSeller2 from "../../assets/bestseller2.jpeg";
import bestSeller3 from "../../assets/bestseller3.jpeg";
import bestSeller4 from "../../assets/bestseller4.jpeg";
import { Typography } from "@mui/material";
import ProductCard from "../../components/card/productCard";

const BestSellerSection = () => {
  const bestSellers = [
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller1,
      price: 9999,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller2,
      price: 9999,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller3,
      price: 9999,
    },
    {
      label: "Sapphire Applique Kurta Set",
      imgSrc: bestSeller4,
      price: 9999,
    },
  ];

  return (
    <>
      <Typography variant="h4" sx={{ justifyContent: "center" }}>
        BEST SELLERS
      </Typography>
      <div className="categories-container">
        {bestSellers.map((product) => {
          return <ProductCard product={product}></ProductCard>;
        })}
      </div>
    </>
  );
};

export default BestSellerSection;

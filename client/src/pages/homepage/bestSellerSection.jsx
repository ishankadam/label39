import React from "react";

import { Typography } from "@mui/material";
import ProductCard from "../../components/card/productCard";
import { bestSellers } from "../../common";

const BestSellerSection = () => {
  return (
    <>
      <Typography variant="h4" sx={{ justifyContent: "center" }}>
        BEST SELLERS
      </Typography>
      <div className="categories-container">
        {bestSellers.map((product, index) => {
          return (
            <ProductCard
              product={product}
              key={`product=${index}`}
            ></ProductCard>
          );
        })}
      </div>
    </>
  );
};

export default BestSellerSection;

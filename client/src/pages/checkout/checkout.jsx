import React from "react";
import CheckoutForm from "./checkoutForm";
import CheckoutProducts from "./checkoutProducts";

const Checkout = () => {
  return (
    <div style={{ display: "flex" }}>
      <CheckoutForm></CheckoutForm>
      <CheckoutProducts></CheckoutProducts>
    </div>
  );
};

export default Checkout;

import React, { useState } from "react";
import { createOrder } from "../../api";
import { Button } from "@mui/material";
const { RAZORPAY_KEY_ID } = process.env;

export const razorpayId = RAZORPAY_KEY_ID;
const PaymentPage = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    try {
      // Call createOrder to get the Razorpay order ID
      const { orderId } = await createOrder(amount);

      const options = {
        key: razorpayId, // Replace with your key_id
        amount: amount * 100, // Amount in the smallest currency unit
        currency: "INR",
        name: "The Label 39",
        description: "Payment Description",
        order_id: orderId,
        handler: function (response) {
          alert("Payment Successful!");
          console.log(response);
        },
        prefill: {
          name: "TheLabel39",
          email: "thelabel39@gmail.com",
          contact: "96749 49842",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div>
      <h1 style={{ display: "flex", alignItems: "center" }}>Payment Page</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
        style={{
          width: "200px",
          height: "30px",
          marginRight: "20px",
          marginLeft: "10px",
        }}
      />
      <Button variant="contained" color="success" onClick={handlePayment}>
        Pay Now
      </Button>
    </div>
  );
};

export default PaymentPage;

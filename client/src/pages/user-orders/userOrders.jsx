import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../api";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    setLoading(true);
    getAllOrders({ userId, role, setAllOrders: setOrders, setLoading });
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div>
      <Typography>User Orders</Typography>
      {orders.map((order, index) => (
        <div key={index}>
          <Typography>{order.orderId}</Typography>
          <Typography>{order.paymentInfo.status}</Typography>
          <Typography>{order.paymentInfo.method}</Typography>
          <Typography>
            {order.cartItems.map((item) => item.name).join(", ")}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;

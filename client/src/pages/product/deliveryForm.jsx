import React, { useState } from "react";
import { createDeliveryOrder, trackDeliveryOrder } from "../../api";

const DeliveryForm = () => {
  // const [deliveryData, setDeliveryData] = useState({});
  const [trackingId, setTrackingId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);

  const deliveryData = {
    order_id: "ORD12345612",
    order_date: "2024-11-22T00:00:00Z",
    pickup_location: "Warehouse A",
    channel_id: "WEB123",
    comment: "Handle with care",

    billing_customer_name: "John",
    billing_last_name: "Doe",
    billing_address: "123 Main St",
    billing_address_2: "Apt 4B",
    billing_city: "Mumbai",
    billing_pincode: "400001",
    billing_state: "Maharashtra",
    billing_country: "India",
    billing_email: "john.doe@example.com",
    billing_phone: "9876543210",

    shipping_is_billing: false,
    shipping_customer_name: "Jane",
    shipping_last_name: "Doe",
    shipping_address: "456 Park Ave",
    shipping_address_2: "",
    shipping_city: "Mumbai",
    shipping_pincode: "400002",
    shipping_state: "Maharashtra",
    shipping_country: "India",
    shipping_email: "jane.doe@example.com",
    shipping_phone: "9988776655",

    order_items: [
      {
        name: "Product A",
        sku: "PROD001",
        units: 2,
        selling_price: 199.99,
        discount: 10.0,
        tax: 18.0,
        hsn: "123456",
      },
      {
        name: "Product B",
        sku: "PROD002",
        units: 1,
        selling_price: 499.99,
        discount: 20.0,
        tax: 45.0,
        hsn: "654321",
      },
    ],

    payment_method: "Prepaid",
    sub_total: 899.97,
    length: 20,
    breadth: 15,
    height: 10,
    weight: 5.5,
    courier_partner_id: null,
    cod_charges: 0,
    shipping_charges: 50.0,
  };

  const handleCreateOrder = async () => {
    const result = await createDeliveryOrder(deliveryData);
    console.log("Delivery Order Created:", result);
  };

  const handleTrackOrder = async () => {
    const result = await trackDeliveryOrder(trackingId);
    setTrackingInfo(result);
    console.log("Tracking Info:", result);
  };

  return (
    <div>
      <h1>Delivery Management</h1>

      {/* Create Delivery Order */}
      <button onClick={handleCreateOrder}>Create Delivery Order</button>

      {/* Track Delivery Order */}
      <input
        type="text"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <button onClick={handleTrackOrder}>Track Delivery Order</button>

      {trackingInfo && <pre>{JSON.stringify(trackingInfo, null, 2)}</pre>}
    </div>
  );
};

export default DeliveryForm;

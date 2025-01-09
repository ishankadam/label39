import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";

function ManageOrders(props) {
  const [allOrders, setAllOrders] = useState(props.allOrders || []);

  const colDef = [
    {
      id: "OrderId",
      label: "Order Id",
      key: "orderId",
      type: "text",
      align: "left",
    },
    {
      id: "Customer Name",
      label: "Customer Name",
      key: "checkoutData",
      nestedKey: "firstName",
      type: "nestedText",
      align: "left",
    },
    {
      id: "Phone",
      label: "Phone",
      key: "checkoutData",
      nestedKey: "phone",
      type: "nestedText",
      align: "left",
    },
    {
      id: "Payment Status",
      label: "Payment Status",
      key: "paymentInfo",
      nestedKey: "status",
      type: "nestedText",
      align: "left",
    },
    // {
    //   id: "notification-icon",
    //   label: "",
    //   key: "editAction",
    //   type: "action",
    //   align: "center",
    //   editId: "edit-icon",
    //   deleteId: "delete-icon",
    //   commentId: "comment-icon",
    //   //   editFunc: (row, index) => handleOnClickView(row, true, index),
    //   //   deleteFunc: (row, index) => handleDeleteTestimonial(row, index),
    //   isDisable: true,
    //   isEdit: true,
    //   page: "JobListing",
    // },
  ];

  useEffect(() => {
    setAllOrders(props.allOrders);
  }, [props.allOrders]);

  return (
    <div>
      <CustomTable
        colDef={colDef}
        rowData={allOrders}
        deleteContent={{
          title: "Delete Confirmation",
          message: "Are you sure you want to delete this record?",
        }}
        loading={props.loading}
        pagination={true}
        page="Orders"
      ></CustomTable>
    </div>
  );
}

export default ManageOrders;

import React, { useEffect, useState } from "react";
import { orderStatus } from "../../common";
import CustomTable from "../../components/custom-table/customTable";
import StatusChangeModal from "../../components/modal/orderStatusModal";

function ManageOrders(props) {
  const [allOrders, setAllOrders] = useState(props.allOrders || []);
  const [orderStatusValue, setOrderStatusValue] = useState("");
  const [orderStatusModal, setOrderStatusModal] = useState({
    open: false,
    data: {},
  });

  const handleDropdownChange = (value) => {
    setOrderStatusValue(value);
  };

  const handleOnClickView = (row) => {
    setOrderStatusModal({
      open: true,
      data: row,
    });
  };

  const handleCloseModal = () => {
    setOrderStatusModal({ open: false, data: {} });
  };

  useEffect(() => {
    setAllOrders(props.allOrders);
  }, [props.allOrders]);

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
    {
      id: "orderStatus",
      label: "Order Status",
      key: "status",
      type: "dropdown",
      align: "left",
      optionList: orderStatus,
    },
    {
      id: "notification-icon",
      label: "Change order status",
      key: "editAction",
      type: "action",
      align: "center",
      editId: "edit-icon",
      deleteId: "delete-icon",
      commentId: "comment-icon",
      editFunc: (row, index) => handleOnClickView(row, true, index),
      //   deleteFunc: (row, index) => handleDeleteTestimonial(row, index),
      // isDisable: true,
      isEdit: true,
      page: "JobListing",
    },
  ];

  useEffect(() => {
    console.log(props.allOrders);
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
        allowView={true}
        handleDropdownChange={handleDropdownChange}
        dropdownValue={orderStatusValue}
      ></CustomTable>
      {orderStatusModal.open && (
        <StatusChangeModal
          open={orderStatusModal.open}
          handleClose={handleCloseModal}
          data={orderStatusModal.data}
          setAllOrders={props.setAllOrders}
        />
      )}
    </div>
  );
}

export default ManageOrders;

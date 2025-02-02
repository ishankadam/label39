import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import CreateDiscountForm from "../../form/discount/discount";

const ManageDiscount = (props) => {
  const [showDiscountModal, setShowDiscountModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });

  const [discountData, setDiscountData] = useState([]);

  const handleModalClose = () => {
    setShowDiscountModal({
      show: false,
      isEdit: false,
      data: {},
    });
  };

  useEffect(() => {
    setDiscountData(props.discountData);
  }, [props.discountData]);

  const handleOpenForm = () => {
    setShowDiscountModal({
      show: true,
      isEdit: false,
      data: {},
    });
  };

  const colDef = [
    {
      id: "code",
      label: "Code",
      key: "code",
      type: "text",
      align: "left",
    },
    {
      id: "description",
      label: "Description",
      key: "description",
      type: "text",
      align: "left",
    },
    {
      id: "type",
      label: "Type",
      key: "discountType",
      type: "text",
      align: "left",
    },
    {
      id: "value",
      label: "Value",
      key: "value",
      type: "text",
      align: "left",
    },
    {
      id: "expiryDate",
      label: "Expiry Date",
      key: "expiresAt",
      type: "date",
      align: "left",
    },
    {
      id: "onlyForNewUsers",
      label: "Only For NewUsers",
      key: "onlyForNewUsers",
      type: "boolean",
      align: "left",
    },
    {
      id: "usageLimit",
      label: "Usage Limit",
      key: "usageLimit",
      type: "text",
      align: "left",
    },
    {
      id: "notification-icon",
      label: "",
      key: "editAction",
      type: "action",
      align: "center",
      editId: "edit-icon",
      deleteId: "delete-icon",
      commentId: "comment-icon",
      disableKey: "isActive",
      //   editFunc: (row, index) => handleOnClickView(row, true, index),
      // disableFunc: (row, index) => handleDisableProduct(row, index),
      isDisable: true,
      isEdit: true,
      page: "JobListing",
    },
  ];

  return (
    <div>
      <Button
        color="custom"
        variant="contained"
        sx={{ width: "200px", marginBottom: "20px" }}
        onClick={handleOpenForm}
      >
        Create Discount
      </Button>
      <CustomTable
        colDef={colDef}
        rowData={discountData}
        loading={props.loading}
        pagination={true}
        setShowModal={setShowDiscountModal}
        handleModalClose={handleModalClose}
        page="Discount"
      ></CustomTable>
      {showDiscountModal.show && (
        <CreateDiscountForm
          open={showDiscountModal.show}
          isEdit={showDiscountModal.isEdit}
          data={showDiscountModal.data}
          handleModalClose={handleModalClose}
          setShowModal={setShowDiscountModal}
          setLoading={props.setLoading}
          setDiscountData={props.setDiscountData}
          products={props.products}
        ></CreateDiscountForm>
      )}
    </div>
  );
};

export default ManageDiscount;

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import SaleForm from "../../form/sale/saleForm";

const Sale = (props) => {
  const [showSaleModal, setShowSaleModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });

  const [saleData, setSaleData] = useState([]);
  const [, setLoading] = useState(false);

  const handleModalClose = () => {
    setShowSaleModal({
      show: false,
      isEdit: false,
      data: {},
    });
  };

  useEffect(() => {
    setSaleData(props.saleData);
  }, [props.saleData]);

  const handleOnClickView = (row) => {
    setShowSaleModal({
      show: true,
      isEdit: true,
      data: row,
    });
  };

  const handleOpenForm = () => {
    setShowSaleModal({
      show: true,
      isEdit: false,
      data: {},
    });
  };

  const colDef = [
    {
      id: "image",
      label: "Image",
      key: "image",
      type: "image",
      align: "center",
      folderName: "saleData",
    },
    {
      id: "name",
      label: "Name",
      key: "name",
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
      editFunc: (row, index) => handleOnClickView(row, true, index),
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
        sx={{ width: "300px" }}
        onClick={handleOpenForm}
      >
        Create sale
      </Button>
      <CustomTable
        colDef={colDef}
        rowData={saleData}
        loading={props.loading}
        pagination={true}
        setShowModal={setShowSaleModal}
        handleModalClose={handleModalClose}
        page="Products"
      ></CustomTable>
      {showSaleModal.show && (
        <SaleForm
          open={showSaleModal.show}
          isEdit={showSaleModal.isEdit}
          data={showSaleModal.data}
          handleModalClose={handleModalClose}
          setShowModal={setShowSaleModal}
          setLoading={setLoading}
          setSaleData={props.setSaleData}
          products={props.products}
        ></SaleForm>
      )}
    </div>
  );
};

export default Sale;

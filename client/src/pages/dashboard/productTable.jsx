import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import {
  categories,
  transformInputData,
  transformProductData,
} from "../../common";
import AddEditProductModal from "../../form/addProduct/addProduct";

const ProductTable = (props) => {
  const [products, setProducts] = useState(props.products || []);
  const [showModal, setShowModal] = useState(
    props.showModal || {
      show: false,
      isEdit: false,
      data: {},
    }
  );

  useEffect(() => {
    setShowModal(props.showModal);
  }, [props.showModal]);

  const handleModalClose = () => {
    props.setShowModal({
      show: false,
      data: {},
    });
  };
  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const colDef = [
    {
      id: "image",
      label: "Product",
      key: "images",
      type: "image",
      align: "center",
    },
    {
      id: "name",
      label: "Name",
      key: "name",
      type: "text",
      align: "left",
    },
    {
      id: "description",
      label: "Description",
      key: "description",
      type: "largeText",
      align: "left",
    },
    {
      id: "deliveryIn",
      label: "Delivery In",
      key: "deliveryIn",
      type: "text",
      align: "left",
    },
    {
      id: "price",
      label: "Price",
      key: "price",
      type: "textWithStartIcon",
      align: "left",
      icon: "₹",
    },
    {
      id: "garmentDetails",
      label: "Garment Details",
      key: "garmentDetails",
      type: "chipsArray",
      align: "left",
    },
    {
      id: "sizes",
      label: "Sizes",
      key: "sizes",
      type: "dataOnHover",
      align: "left",
    },
    {
      id: "category",
      label: "Category",
      key: "category",
      type: "dropdown",
      align: "left",
      optionList: categories,
    },

    // {
    //   id: "category",
    //   label: "Category",
    //   key: "category",
    //   type: "text",
    //   align: "center",
    //   optionList: props.categories,
    //   capitalize: true,
    // },
    // {
    //   id: "subcategory",
    //   label: "Sub Category",
    //   key: "subcategory",
    //   type: "text",
    //   align: "center",
    //   optionList: productType,
    //   capitalize: true,
    // },

    {
      id: "notification-icon",
      label: "",
      key: "editAction",
      type: "action",
      align: "center",
      editId: "edit-icon",
      deleteId: "delete-icon",
      commentId: "comment-icon",
      // editFunc: (row, index) => handleOnClickView(row, true, index),
      // deleteFunc: (row, index) => handleDeleteProduct(row, index),
      isDelete: true,
      isEdit: true,
      page: "JobListing",
    },
  ];
  return (
    <>
      <CustomTable
        colDef={colDef}
        rowData={products}
        deleteContent={{
          title: "Delete Confirmation",
          message: "Are you sure you want to delete this record?",
        }}
        loading={props.loading}
        pagination={true}
      ></CustomTable>
      {showModal.show && (
        <AddEditProductModal
          open={showModal.show}
          isEdit={showModal.isEdit}
          data={showModal.data}
          handleModalClose={handleModalClose}
          setShowModal={props.setShowModal}
          setLoading={props.setLoading}
          setProducts={setProducts}
        />
      )}
    </>
  );
};

export default ProductTable;

import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import AddEditCategory from "../../form/addCategory/addCategory";
import { toggleCategoryStatus } from "../../api";
// import CreateCategory from "../../components/modal/createCategory";
// import { deleteCategory } from "../../api";
const ManageCategories = (props) => {
  const [categories, setCategories] = useState(props.categories || []);
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

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  const handleModalClose = () => {
    props.setShowModal({
      show: false,
      data: {},
    });
  };

  const handleOnClickView = (row) => {
    setShowModal({
      show: true,
      isEdit: true,
      data: row,
    });
  };

  const handleDisableProduct = (row, index) => {
    toggleCategoryStatus({
      category: row,
      setLoading: props.setLoading,
      setCategories: props.setCategories,
    });
  };

  const colDef = [
    {
      id: "image",
      label: "Image",
      key: "image",
      align: "center",
      type: "image",
      folderName: "categories",
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
      disableFunc: (row, index) => handleDisableProduct(row, index),
      isDisable: true,
      isEdit: true,
      page: "JobListing",
    },
  ];
  return (
    <div>
      <CustomTable
        colDef={colDef}
        rowData={categories}
        disableContent={{
          title: "Disable Confirmation",
          message: "Are you sure you want to disable this category?",
        }}
        loading={props.loading}
        pagination={true}
      ></CustomTable>
      {showModal.show && (
        <AddEditCategory
          open={showModal.show}
          isEdit={showModal.isEdit}
          data={showModal.data}
          handleModalClose={handleModalClose}
          setShowModal={setShowModal}
          setLoading={props.setLoading}
          setCategories={setCategories}
        />
      )}
    </div>
  );
};

export default ManageCategories;

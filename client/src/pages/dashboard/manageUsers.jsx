import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import TestimonialModal from "../../form/addTestimonails/addTestimonials";
const ManageUsers = (props) => {
  const [users, setUsers] = useState(props.users || []);
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

  const handleOpenModal = () => {
    props.setShowModal({
      show: true,
      isEdit: false,
      data: {},
    });
  };

  const handleDeleteTestimonial = (row, index) => {
    props.setLoading(true);
    // deleteTestimonial({
    //   testimonial: row,
    //   setLoading: props.setLoading,
    //   setTestimonials: props.setTestimonials,
    // });
  };

  const handleOnClickView = (row) => {
    props.setShowModal({
      show: true,
      isEdit: true,
      data: row,
    });
  };
  const colDef = [
    {
      id: "name",
      label: "Name",
      key: "name",
      type: "text",
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      key: "email",
      type: "text",
      align: "left",
    },
    {
      id: "phone",
      label: "Phone Number",
      key: "phone",
      type: "text",
      align: "left",
    },
    {
      id: "role",
      label: "Role",
      key: "role",
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
      //   editFunc: (row, index) => handleOnClickView(row, true, index),
      //   deleteFunc: (row, index) => handleDeleteTestimonial(row, index),
      isDisable: true,
      isEdit: true,
      page: "JobListing",
    },
  ];

  const [isEditing, setIsEditing] = useState(false);

  const handleModalClose = () => {
    setShowModal({
      show: false,
      data: {},
    });
  };

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  return (
    <div>
      <CustomTable
        colDef={colDef}
        rowData={users}
        deleteContent={{
          title: "Delete Confirmation",
          message: "Are you sure you want to delete this record?",
        }}
        loading={props.loading}
        pagination={true}
      ></CustomTable>
      {showModal.show && (
        <TestimonialModal
          open={showModal.show}
          isEdit={showModal.isEdit}
          data={showModal.data}
          handleModalClose={handleModalClose}
          setShowModal={setShowModal}
          setLoading={props.setLoading}
          setTestimonials={props.setTestimonials}
        ></TestimonialModal>
      )}
    </div>
  );
};

export default ManageUsers;

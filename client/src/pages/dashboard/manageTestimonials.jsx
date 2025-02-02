/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import TestimonialModal from "../../form/addTestimonails/addTestimonials";
const ManageTestimonials = (props) => {
  const [testimonials, setTestimonials] = useState(props.testimonials || []);
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

  const colDef = [
    {
      id: "image",
      label: "Avatar",
      key: "image",
      type: "image",
      align: "center",
      category: "testimonial",
      folderName: "testimonials",
    },
    {
      id: "name",
      label: "Name",
      key: "name",
      type: "text",
      align: "left",
    },
    {
      id: "comments",
      label: "Comments",
      key: "comments",
      type: "text",
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
    //   editFunc: (row, index) => handleOnClickView(row, true, index),
    //   deleteFunc: (row, index) => handleDeleteTestimonial(row, index),
    //   isDisable: true,
    //   isEdit: true,
    //   page: "JobListing",
    // },
  ];

  const [isEditing, setIsEditing] = useState(false);

  const handleModalClose = () => {
    setShowModal({
      show: false,
      data: {},
    });
  };

  useEffect(() => {
    setTestimonials(props.testimonials);
  }, [props.testimonials]);

  return (
    <div>
      <CustomTable
        colDef={colDef}
        rowData={testimonials}
        deleteContent={{
          title: "Delete Confirmation",
          message: "Are you sure you want to delete this record?",
        }}
        loading={props.loading}
        pagination={true}
        page="Testimonials"
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

export default ManageTestimonials;

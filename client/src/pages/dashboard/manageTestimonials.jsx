/* eslint-disable no-unused-vars */
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import TestimonialModal from "../../form/addTestimonails/addTestimonials";
const ManageTestimonials = (props) => {
  const [testimonials, setTestimonials] = useState(props.testimonials || []);
  const [showModal, setShowModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });

  const handleOpenModal = () => {
    setShowModal({
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
    setShowModal({
      show: true,
      isEdit: true,
      data: row,
    });
  };
  const colDef = [
    {
      id: "image",
      label: "Avatar",
      key: "image",
      type: "image",
      align: "center",
      category: "testimonial",
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
    {
      id: "notification-icon",
      label: "",
      key: "editAction",
      type: "action",
      align: "center",
      editId: "edit-icon",
      deleteId: "delete-icon",
      commentId: "comment-icon",
      editFunc: (row, index) => handleOnClickView(row, true, index),
      deleteFunc: (row, index) => handleDeleteTestimonial(row, index),
      isDelete: true,
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
    setTestimonials(props.testimonials);
  }, [props.testimonials]);

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          px: 3,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="warning"
          sx={{
            fontSize: { xs: "13px", sm: "14px", md: "16px" },
            position: "sticky", // Keeps the button on the right
            right: 0,
            textTransform: "capitalize",
            marginLeft: "10px",
            height: "44px",
          }}
          onClick={handleOpenModal}
        >
          Add Testimonials
        </Button>
      </Box>
      <CustomTable
        colDef={colDef}
        rowData={testimonials}
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

export default ManageTestimonials;

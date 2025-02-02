import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import CelebrityStyleForm from "../../form/celebrityStyle/celebrityStyleForm";

const CelebrityStyle = (props) => {
  const [showCelebrityStyleModal, setShowCelebrityStyleModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });

  const [celebrityStyles, setCelebrityStyles] = useState([]);
  const [, setLoading] = useState(false);

  const handleModalClose = () => {
    setShowCelebrityStyleModal({
      show: false,
      isEdit: false,
      data: {},
    });
  };

  useEffect(() => {
    setCelebrityStyles(props.celebrityStyles);
  }, [props.celebrityStyles]);

  const handleOnClickView = (row) => {
    setShowCelebrityStyleModal({
      show: true,
      isEdit: true,
      data: row,
    });
  };

  const handleOpenForm = () => {
    setShowCelebrityStyleModal({
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
      folderName: "celebrityStyles",
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
      // isDisable: true,
      isEdit: true,
      page: "JobListing",
    },
  ];

  return (
    <div>
      <Button
        color="custom"
        variant="contained"
        sx={{ width: "260px", marginBottom: "20px" }}
        onClick={handleOpenForm}
      >
        Create celebrity style
      </Button>
      <CustomTable
        colDef={colDef}
        rowData={celebrityStyles}
        loading={props.loading}
        pagination={true}
        setShowModal={setShowCelebrityStyleModal}
        handleModalClose={handleModalClose}
        page="Products"
      ></CustomTable>
      {showCelebrityStyleModal.show && (
        <CelebrityStyleForm
          open={showCelebrityStyleModal.show}
          isEdit={showCelebrityStyleModal.isEdit}
          data={showCelebrityStyleModal.data}
          handleModalClose={handleModalClose}
          setShowModal={setShowCelebrityStyleModal}
          setLoading={setLoading}
          setCelebrityStyles={props.setCelebrityStyles}
          products={props.products}
        ></CelebrityStyleForm>
      )}
    </div>
  );
};

export default CelebrityStyle;

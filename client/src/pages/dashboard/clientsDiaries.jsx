import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClientDiariesForm from "../../form/clientDiaries/clientDiariesForm";
import CustomTable from "../../components/custom-table/customTable";

function ClientsDiaries(props) {
  const [showClientDiariesModal, setShowClienDiariesModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });

  const [clientDiaries, setClientDiaries] = useState([]);
  const [, setLoading] = useState(false);

  const handleModalClose = () => {
    setShowClienDiariesModal({
      show: false,
      isEdit: false,
      data: {},
    });
  };

  useEffect(() => {
    setClientDiaries(props.clientDiaries);
  }, [props.clientDiaries]);

  const handleOnClickView = (row) => {
    setShowClienDiariesModal({
      show: true,
      isEdit: true,
      data: row,
    });
  };

  const handleOpenForm = () => {
    setShowClienDiariesModal({
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
      folderName: "clientDiaries",
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
        Create celebrity style
      </Button>
      <CustomTable
        colDef={colDef}
        rowData={clientDiaries}
        loading={props.loading}
        pagination={true}
        setShowModal={setShowClienDiariesModal}
        handleModalClose={handleModalClose}
        page="Products"
        allowView={false}
      ></CustomTable>
      {showClientDiariesModal.show && (
        <ClientDiariesForm
          open={showClientDiariesModal.show}
          isEdit={showClientDiariesModal.isEdit}
          data={showClientDiariesModal.data}
          handleModalClose={handleModalClose}
          setShowModal={setShowClienDiariesModal}
          setLoading={setLoading}
          setClientDiaries={setClientDiaries}
        ></ClientDiariesForm>
      )}
    </div>
  );
}

export default ClientsDiaries;

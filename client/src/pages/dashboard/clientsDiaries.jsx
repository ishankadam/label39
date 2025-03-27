import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import ClientDiariesForm from "../../form/clientDiaries/clientDiariesForm";
import { PriorityModal } from "./updatePriority";

const fields = [
  { key: "name", label: "Name", type: "text" },
  {
    key: "productId",
    label: "Product name",
    type: "nestedText",
    nestedKey: "label",
  },
];

const ClientsDiaries = (props) => {
  const [showClientDiariesModal, setShowClienDiariesModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log(props.products);
  }, [props.products]);

  const renderField = (item, field) => {
    switch (field.type) {
      case "image":
        return (
          <img
            src={`/path/to/images/${item[field.key][0]}`}
            alt={item.name}
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        );
      case "boolean":
        return item[field.key] ? "Yes" : "No";
      case "number":
      case "text":
      default:
        return item[field.key];
    }
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        sx={{ width: "240px", marginBottom: "20px" }}
        onClick={handleOpenForm}
      >
        Create client diaries
      </Button>
      <Button
        color="custom"
        variant="contained"
        sx={{
          width: "410px",
          marginBottom: "20px",
          marginLeft: "20px",
          textWrap: "nowrap",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Update client diaries priority
      </Button>
      <CustomTable
        colDef={colDef}
        rowData={clientDiaries}
        loading={props.loading}
        pagination={true}
        setShowModal={setShowClienDiariesModal}
        handleModalClose={handleModalClose}
        page="Products"
      ></CustomTable>
      {showClientDiariesModal.show && (
        <ClientDiariesForm
          open={showClientDiariesModal.show}
          isEdit={showClientDiariesModal.isEdit}
          data={showClientDiariesModal.data}
          handleModalClose={handleModalClose}
          setShowModal={setShowClienDiariesModal}
          setLoading={setLoading}
          setClientDiaries={props.setClientDiaries}
          products={props.allProducts}
        ></ClientDiariesForm>
      )}
      {isModalOpen && (
        <PriorityModal
          open={isModalOpen}
          onClose={handleCloseModal}
          items={clientDiaries}
          fields={fields}
          renderField={renderField}
          setData={props.setClientDiaries}
          folder="clientDiaries"
          idKey="clientDiariesId"
          collection="clientDiaries"
        />
      )}
    </div>
  );
};

export default ClientsDiaries;

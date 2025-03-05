import { Box, Button, Grid2, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllProducts, toggleProductStatus } from "../../api";
import { categories } from "../../common";
import CustomTable from "../../components/custom-table/customTable";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import AddEditProductModal from "../../form/addProduct/addProduct";
import { PriorityModal } from "./updatePriority";

const fields = [
  { key: "images", label: "Image", type: "image" },
  { key: "name", label: "Name", type: "text" },
];

const statusList = [
  { label: "All", value: "all" },
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

const ProductTable = (props) => {
  const [products, setProducts] = useState(props.products || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [filterDataProducts, setFilterDataProducts] = useState([]);
  const [productsloading, setProductsLoading] = useState(false);
  const [productsPage, setProductsPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [filterOptions, setFilterOptions] = useState({
    category: "all",
    status: "all",
  });
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
    setProducts(props.products);
  }, [props.products]);

  const handleModalClose = () => {
    props.setShowModal({
      show: false,
      data: {},
    });
  };

  const handleDisableProduct = (row) => {
    toggleProductStatus({
      product: row,
      setLoading: props.setLoading,
      setProductsData: props.setProducts,
    });
  };

  const handleOnClickView = (row) => {
    setShowModal({
      show: true,
      isEdit: true,
      data: row,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSnackbarOpen(true);
  };

  const handleChange = (value, field) => {
    // set filter options based on vale and field
    setFilterOptions((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setProductsLoading(true);
    getAllProducts({
      setProductsData: setProducts,
      setLoading: setProductsLoading,
      country: props.country,
      page: productsPage === 0 ? 1 : productsPage,
      limit: productsPerPage || 10,
    });
  }, [productsPage, props.country, productsPerPage]);

  useEffect(() => {
    //filter products based on filterOptions
    if (!products) {
      return;
    }
    const productsData = products.products || [];
    const productFilteredByCategory =
      filterOptions.category !== "all"
        ? productsData.filter((product) =>
            product.category
              .toLowerCase()
              .includes(filterOptions.category.toLowerCase())
          )
        : productsData;

    const productFilteredByStatus =
      filterOptions.status !== "all"
        ? productFilteredByCategory.filter(
            (product) => product.isActive === filterOptions.status
          )
        : productFilteredByCategory;

    setFilterDataProducts(productFilteredByStatus);
  }, [filterOptions, products]);

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

  const colDef = [
    {
      id: "image",
      label: "Product",
      key: "images",
      type: "image",
      align: "center",
      folderName: "products",
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
      key: "delivery In",
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
      id: "category",
      label: "Category",
      key: "category",
      type: "dropdown",
      align: "left",
      optionList: categories,
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
      disableKey: "isActive",
      editFunc: (row, index) => handleOnClickView(row, true, index),
      disableFunc: (row, index) => handleDisableProduct(row, index),
      isDisable: true,
      isEdit: true,
      page: "JobListing",
    },
  ];
  return (
    <>
      <Button
        variant="contained"
        sx={{
          width: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
        color="custom"
        onClick={() => setIsModalOpen(true)}
      >
        Update Product Priorities
      </Button>
      <Box
        sx={{
          justifyContent: "flex-end",
          flexDirection: "row",
          display: "flex",
        }}
      >
        {" "}
        <Grid2 item>
          <SelectDropdown
            label="status"
            optionList={statusList}
            config={{ field: "status" }}
            handleEdit={handleChange}
            value={filterOptions.status}
            sx={{
              width: { xs: "160px", sm: "200px", md: "200px" },
              marginRight: "10px",
              height: "50px",
            }}
          />
        </Grid2>
        <Grid2 item>
          <SelectDropdown
            label="Category"
            optionList={props.categoryList}
            config={{ field: "category" }}
            handleEdit={handleChange}
            value={filterOptions.category}
            sx={{
              width: { xs: "160px", sm: "200px", md: "200px" },
              height: "50px",
            }}
          />
        </Grid2>
      </Box>
      <CustomTable
        colDef={colDef}
        rowData={filterDataProducts}
        loading={productsloading}
        pagination={true}
        setShowModal={setShowModal}
        categories={props.categories}
        setProducts={props.setProducts}
        handleModalClose={handleModalClose}
        page="Products"
        allowView={true}
        totalItems={products?.totalProducts}
        setProductsPage={setProductsPage}
        setProductsPerPage={setProductsPerPage}
      ></CustomTable>
      {showModal.show && (
        <AddEditProductModal
          products={props.products}
          open={showModal.show}
          isEdit={showModal.isEdit}
          data={showModal.data}
          handleModalClose={handleModalClose}
          setShowModal={props.setShowModal}
          setLoading={props.setLoading}
          setProducts={props.setProducts}
          categories={props.categories}
        />
      )}
      {isModalOpen && (
        <PriorityModal
          open={isModalOpen}
          onClose={handleCloseModal}
          items={products}
          fields={fields}
          renderField={renderField}
          setData={props.setProducts}
          folder="products"
          idKey="productId"
          collection="products"
        />
      )}
      {isSnackbarOpen && (
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => setIsSnackbarOpen(false)}
          message="Product priorities saved successfully"
        />
      )}
    </>
  );
};

export default ProductTable;

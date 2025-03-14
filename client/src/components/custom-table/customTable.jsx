/* eslint-disable no-unused-vars */
import EditIcon from "@mui/icons-material/Edit";
import {
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { findLabelByValue } from "../../common";
// import { imageUrl } from "../../api";
// import ConfirmationModal from "../modal/confirmation-modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { imageUrl } from "../../api";
import AddEditProductModal from "../../form/addProduct/addProduct";
import ViewOrdersModal from "../../pages/dashboard/viewProductModal";
import ViewProductModal from "../../pages/product/viewProduct";
import ConfirmationModal from "../modal/confirmationModal";
import SelectDropdown from "../select-dropdown/selectDropdown";
const CustomTable = (props) => {
  const [rowData, setRowData] = useState(props.rowData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [disableInfo, setDisableInfo] = useState({
    row: 0,
    index: 0,
    show: false,
    disableFunc: undefined,
    disableTitle: "",
    disableMessage: "",
    buttonLabel: "",
  });
  const [showViewProductModal, setShowViewProductModal] = useState({
    open: false,
    data: {},
  });
  const [showViewOrders, setShowViewOrders] = useState({
    open: false,
    data: {},
  });
  const [showEditModal, setShowEditModal] = useState({
    open: false,
    isEdit: false,
    data: {},
  });
  const [loading, setLoading] = useState(props.loading);
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
    props.setProductsPage && props.setProductsPage(newPage);
  };
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    props.setProductsPerPage(rowsPerPage);
    setPage(0);
  };

  useEffect(() => {
    setRowData(props.rowData);
  }, [props.rowData]);

  let paginatedData;
  if (props.page !== "Products") {
    paginatedData = rowData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    paginatedData = rowData;
  }
  const handleView = (data) => {
    switch (props.page) {
      case "Products":
        setShowViewProductModal({
          open: true,
          data: data,
        });
        break;
      case "Orders":
        setShowViewOrders({
          open: true,
          data: data,
        });
        break;
      default:
        break;
    } // Add more cases as needed
  };

  const handleModalClose = () => {
    setShowEditModal({
      show: false,
      isEdit: false,
      data: {},
    });
  };

  const renderTooltipContent = (items) => (
    <Grid container spacing={1}>
      {items &&
        items.map((item) => (
          <Grid xs={12} key={item.size}>
            <Typography variant="body2">
              {item.size}: {item.quantity}
            </Typography>
          </Grid>
        ))}
    </Grid>
  );

  const getCell = (colDef, row, rowIndex, _colIndex) => {
    let children;
    switch (colDef.type) {
      case "text":
        children = colDef.capitalize ? (
          <Typography>{_.capitalize(row[colDef.key])}</Typography>
        ) : (
          <Typography>{row[colDef.key]}</Typography>
        );
        break;
      case "nestedText":
        children = colDef.capitalize ? (
          <Typography>{_.capitalize(row[colDef.key])}</Typography>
        ) : (
          <Typography>{row[colDef.key][colDef.nestedKey]}</Typography>
        );
        break;
      case "doubleNestedText":
        children = colDef.capitalize ? (
          <Typography>{_.capitalize(row[colDef.key])}</Typography>
        ) : (
          <Typography>
            {row[colDef.key][colDef.nestedKey][colDef.doubleNestedKey]}
          </Typography>
        );
        break;
      case "textWithStartIcon":
        children = (
          <Typography>
            {colDef.icon +
              row[colDef.key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        );
        break;
      case "largeText":
        children = (
          <Typography>{row[colDef.key].replace(/<br\/>/g, "")}</Typography>
        );
        break;
      case "dataOnHover":
        children = (
          <>
            <Tooltip title={renderTooltipContent(row[colDef.key].Upper)} arrow>
              <Typography
                variant="h6"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginBottom: 1,
                }}
              >
                Upper
                <IconButton size="small" sx={{ marginLeft: 0.5 }}>
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Typography>
            </Tooltip>
            <br />
            {/* Bottom Section */}
            <Tooltip title={renderTooltipContent(row[colDef.key].Bottom)} arrow>
              <Typography
                variant="h6"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginTop: 1,
                }}
              >
                Bottom
                <IconButton size="small" sx={{ marginLeft: 0.5 }}>
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Typography>
            </Tooltip>
          </>
        );
        break;
      case "dropdown":
        const label = findLabelByValue(colDef.optionList, row[colDef.key]);
        children = <Typography>{label}</Typography>;
        break;
      case "actionDropdown":
        children = (
          <SelectDropdown
            label="Category"
            optionList={colDef.optionList}
            config={{ field: "category", isRequired: true }}
            handleEdit={props.handleDropdownChange}
            value={props.orderStatusValue}
            sx={{ width: "100%" }}
          />
        );
        break;
      case "image":
        children = (
          <img
            className="attachment-file"
            src={`${imageUrl}${colDef.folderName}/${row[colDef.key][0]}`}
            alt="attachment"
            style={{ height: "150px", width: "120px" }}
          />
        );
        break;

      case "orderStatus":
        const statusStyles = {
          placed: { bgcolor: "#1976d2", color: "white" },
          shipped: { bgcolor: "#ed6c02", color: "white" },
          delivered: { bgcolor: "#2e7d32", color: "white" },
          rejected: { bgcolor: "#d32f2f", color: "white" },
        };

        const status = row[colDef.key];
        children = (
          <Chip
            label={status}
            sx={{
              minWidth: 80,
              fontWeight: "500",
              textTransform: "capitalize",
              bgcolor: statusStyles[status]?.bgcolor || "grey.300",
              color: statusStyles[status]?.color || "black",
            }}
          />
        );
        break;

      case "chipsArray":
        children = row[colDef.key].map((label) => (
          <Chip
            key={label}
            label={label}
            color="primary"
            variant="outlined"
            sx={{ marginBottom: 1, m: 1 }}
          />
        ));
        break;
      case "boolean":
        children = row[colDef.key] ? "Yes" : "No";
        break;
      case "date":
        children = new Date(row[colDef.key]).toLocaleDateString();
        break;
      //   case "categoryImage":
      //     children = (
      //       <img
      //         className="attachment-file"
      //         src={${imageUrl}${colDef.category}/${row[colDef.key]}}
      //         alt="attachment"
      //         style={{ height: "80px", width: "80px" }}
      //       />
      //     );
      //     break;
      case "action":
        children = (
          <Stack justifyContent="center" spacing={2} direction="row">
            {colDef.isEdit ? (
              <EditIcon
                onClick={(e) => {
                  e.stopPropagation();
                  colDef.editFunc(row, rowIndex);
                }}
                sx={{ cursor: "pointer" }}
                id={`${colDef.editId}-${rowIndex}`}
              ></EditIcon>
            ) : (
              ""
            )}
            {colDef.isDisable ? (
              row[colDef.disableKey] ? (
                <Tooltip title="Disable Product" arrow>
                  <VisibilityOffIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setDisableInfo({
                        row: row,
                        index: rowIndex,
                        show: true,
                        disableFunc: colDef.disableFunc,
                        disableTitle: "Disable Confirmation",
                        disableMessage:
                          "Are you sure you want to disable this product?",
                        buttonLabel: "Disable",
                      });
                    }}
                    sx={{ cursor: "pointer", color: "warning.main" }}
                    id={`${colDef.deleteId}-${rowIndex}`}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Enable Product" arrow>
                  <VisibilityIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setDisableInfo({
                        row: row,
                        index: rowIndex,
                        show: true,
                        disableFunc: colDef.disableFunc,
                        disableTitle: "Enable Confirmation",
                        disableMessage:
                          "Are you sure you want to enable this product?",
                        buttonLabel: "Enable",
                      });
                    }}
                    sx={{ cursor: "pointer", color: "success.main" }}
                    id={`${colDef.deleteId}-${rowIndex}`}
                  ></VisibilityIcon>
                </Tooltip>
              )
            ) : (
              ""
            )}
          </Stack>
        );
        break;
      default:
        children = <Typography>{row[colDef.key]}</Typography>;
    }
    return (
      <TableCell
        align={colDef.align}
        key={`header-${colDef.id}`}
        id={`${colDef.id}-column-header`}
      >
        {children}
      </TableCell>
    );
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid #ccc",
          // mx: 1,
          // mt: 1,
          width: "auto",
          // margin: "5px 20px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead className="job-table-header">
            <TableRow sx={{ position: "sticky", zIndex: 900, top: 0 }}>
              {props.colDef.map((column, index) => (
                <TableCell
                  align={column.align}
                  key={`header-${column.id}-${index}`}
                  id={`${column.id}-column-header`}
                  sx={{
                    fontWeight: "bold", // Makes the header bold
                    fontSize: "15px", // Sets the font size to 16px
                    textTransform: "capitalize",
                    fontFamily: "'Roboto Serif', serif",
                    width: "22%",
                  }}
                >
                  {_.upperCase(column.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <CircularProgress></CircularProgress>
            ) : paginatedData?.length > 0 ? (
              paginatedData.map(
                (row, rowIndex) =>
                  row && (
                    <TableRow
                      key={`row-${rowIndex}`}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: props.allowView ? "pointer" : "default",
                      }}
                      onClick={() => props.allowView && handleView(row)}
                    >
                      {props.colDef.map((column, colIndex) => {
                        return getCell(column, row, rowIndex, colIndex);
                      })}
                    </TableRow>
                  )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={props.colDef.length}>
                  <Typography align="center">No records found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          mx: 3,
          // margin: "5px 20px",
        }}
        component="div"
        count={props.totalItems ? props.totalItems : rowData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
      {disableInfo.show ? (
        <ConfirmationModal
          open={disableInfo.show}
          title={disableInfo.disableTitle}
          message={disableInfo.disableMessage}
          handleConfirm={() => {
            disableInfo.disableFunc(disableInfo.row, disableInfo.index);
            setDisableInfo({ show: false });
          }}
          handleCancel={() => setDisableInfo({ show: false })}
          buttonLabel={disableInfo.buttonLabel}
        />
      ) : null}
      {showViewProductModal.open ? (
        <ViewProductModal
          open={showViewProductModal.open}
          product={showViewProductModal.data}
          setShowModal={setShowViewProductModal}
          setShowEditModal={setShowEditModal}
          isAdmin={true}
        ></ViewProductModal>
      ) : null}
      {showEditModal.open ? (
        <AddEditProductModal
          open={showEditModal.open}
          isEdit={showEditModal.isEdit}
          data={showEditModal.data}
          handleModalClose={handleModalClose}
          setShowModal={setShowEditModal}
          setLoading={props.setLoading}
          setProducts={props.setProducts}
          categories={props.categories}
        ></AddEditProductModal>
      ) : null}
      {showViewOrders.open ? (
        <ViewOrdersModal
          open={showViewOrders.open}
          data={showViewOrders.data}
          setShowModal={setShowViewOrders}
        ></ViewOrdersModal>
      ) : null}
    </Paper>
  );
};

export default CustomTable;

/* eslint-disable no-unused-vars */
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { findLabelByValue } from "../../common";
// import { imageUrl } from "../../api";
// import ConfirmationModal from "../modal/confirmation-modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewProductModal from "../../pages/product/viewProduct";
import { imageUrl } from "../../api";
import AddProduct from "../../form/addProduct/addProduct";
import AddEditProductModal from "../../form/addProduct/addProduct";
const CustomTable = (props) => {
  const [rowData, setRowData] = useState(props.rowData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteInfo, setDeleteInfo] = useState({
    row: 0,
    index: 0,
    show: false,
    deleteFunc: undefined,
  });
  const [showViewModal, setShowViewModal] = useState({
    open: false,
    data: {},
  });
  const [showEditModal, setShowEditModal] = useState({
    open: false,
    data: {},
  });
  const [loading, setLoading] = useState(props.loading);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setRowData(props.rowData);
  }, [props.rowData]);

  const handleViewProduct = (product) => {
    setShowViewModal({
      open: true,
      data: product,
    });
  };

  const renderTooltipContent = (items) => (
    <Grid container spacing={1}>
      {items.map((item) => (
        <Grid xs={12} key={item.size}>
          <Typography variant="body2">
            {item.size}: {item.quantity}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );

  const getCell = (colDef, row, rowIndex, colIndex) => {
    let children;
    switch (colDef.type) {
      case "text":
        children = colDef.capitalize ? (
          <Typography>{_.capitalize(row[colDef.key])}</Typography>
        ) : (
          <Typography>{row[colDef.key]}</Typography>
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
      case "image":
        children = (
          <img
            className="attachment-file"
            src={`${imageUrl}${row[colDef.key][0]}`}
            alt="attachment"
            style={{ height: "150px", width: "120px" }}
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
            {colDef.isDelete ? (
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteInfo({
                    row: row,
                    index: rowIndex,
                    show: true,
                    deleteFunc: colDef.deleteFunc,
                  });
                }}
                sx={{ cursor: "pointer" }}
                id={`${colDef.deleteId}-${rowIndex}`}
              ></DeleteIcon>
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
          mt: 1,
          width: "auto",
          // margin: "5px 20px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead className="job-table-header">
            <TableRow sx={{ position: "sticky", zIndex: 900, top: 0 }}>
              {props.colDef.map((column) => (
                <TableCell
                  align={column.align}
                  key={`header-${column.id}`}
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
            ) : rowData?.length > 0 ? (
              rowData.map(
                (row, rowIndex) =>
                  row && (
                    <TableRow
                      key={`row-${rowIndex}`}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={() => handleViewProduct(row)}
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
        count={rowData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
      {/* {deleteInfo.show ? (
        <ConfirmationModal
          open={deleteInfo.show}
          title={props.deleteContent.title}
          message={props.deleteContent.message}
          handleConfirm={() => {
            deleteInfo.deleteFunc(deleteInfo.row, deleteInfo.index);
            setDeleteInfo({ show: false });
          }}
          handleCancel={() => setDeleteInfo({ show: false })}
        />
      ) : null} */}
      {showViewModal.open ? (
        <ViewProductModal
          open={showViewModal.open}
          product={showViewModal.data}
          setShowModal={setShowViewModal}
          setShowEditModal={setShowEditModal}
          isAdmin={true}
        ></ViewProductModal>
      ) : null}
      {showEditModal.open ? (
        <AddEditProductModal
          open={showEditModal.open}
          product={showEditModal.data}
          setShowEditModal={setShowEditModal}
          isAdmin={true}
        ></AddEditProductModal>
      ) : null}
    </Paper>
  );
};

export default CustomTable;

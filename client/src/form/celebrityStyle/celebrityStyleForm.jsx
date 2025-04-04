import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createCelebrityStyles, editcelebrityStyles } from "../../api";
import CustomAutocomplete from "../../components/autocomplete/autocomplete";
import CustomTextfield from "../../components/textfield/customTextfield";
import UploadFiles from "../../components/upload/uploadFiles";
// import UploadVideos from "../../components/upload/uploadVideos";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../store/cartSlice";

const CelebrityStyleForm = (props) => {
  const [celebrityStyles, setCelebrityStyles] = useState({
    name: "",
    image: null,
    videoSrc: null,
    isActive: true,
    productId: null,
  });
  const [, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  const [products, setProducts] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    // give me a array of object of product name and id
    const newProductsArray =
      products?.length > 0 &&
      products?.map((product) => ({
        label: product.name,
        value: product.productId,
      }));
    setProductsArray(newProductsArray);
  }, [products]);

  const handleEdit = (value, field) => {
    setCelebrityStyles((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleFileUpload = (files) => {
    setCelebrityStyles((prev) => ({
      ...prev,
      image: files,
    }));
  };

  useEffect(() => {
    if (props.isEdit && props.data) {
      setCelebrityStyles({ ...props.data });
      setImages(
        Array.isArray(props.data.image) ? props.data.image : [props.data.image]
      );
    }
  }, [props.isEdit, props.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.isEdit) {
      editcelebrityStyles({
        celebrityStyles,
        setCelebrityStyles: props.setCelebrityStyles,
        setLoading,
      });
      dispatch(
        showSnackbar({
          message: `Celebrity Styles edited successfully!`,
          severity: "success",
        })
      );
    } else {
      createCelebrityStyles({
        celebrityStyles,
        setLoading,
        setCelebrityStyles: props.setCelebrityStyles,
      });
      dispatch(
        showSnackbar({
          message: `Celebrity Styles created successfully!`,
          severity: "success",
        })
      );
    }
    props.setShowModal((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <Dialog open={open} onClose={props.handleModalClose} fullWidth>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingBottom: 3 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Roboto Serif', serif",
              color: "#a16149",
              fontWeight: "600",
              textAlign: { xs: "center", md: "left" },
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.3rem",
                lg: "1.5rem",
              },
            }}
          >
            Add Celebrity style
          </Typography>
          <IconButton onClick={props.handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <CustomTextfield
            label="Name"
            value={celebrityStyles.name}
            config={{ field: "name", isRequired: true }}
            handleEdit={handleEdit}
            sx={{ width: "100%" }}
          />
          <CustomAutocomplete
            label="Product Name"
            options={productsArray}
            handleEdit={handleEdit}
            config={{ field: "productId", isRequired: true }}
            value={celebrityStyles.productId}
            sx={{ width: "100%" }}
          />

          <UploadFiles
            updateData={(files) => handleFileUpload(files)}
            isEdit={true}
            images={images}
            singleFile={true}
            file={celebrityStyles.image}
            acceptedFiles="image/png, image/jpeg"
            category="celebrityStyles"
          />
          {/* <UploadVideos handleEdit={handleEdit} /> */}

          <Button type="submit" variant="contained" fullWidth color="custom">
            Submit
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default CelebrityStyleForm;

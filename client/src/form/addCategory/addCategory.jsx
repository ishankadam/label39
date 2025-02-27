import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import UploadFiles from "../../components/upload/uploadFiles";
import CustomTextfield from "../../components/textfield/customTextfield";
import { createCategory, editCategory } from "../../api";

const AddEditCategory = (props) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [images, setImages] = useState([]);

  const handleChange = (value, field) => {
    setCategory((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (images && Array.isArray(images) && images.length > 0) {
      setCategory((prevDetails) => ({
        ...prevDetails,
        image: images[0],
      }));
    }
  }, [images]);

  const handleFileUpload = (files) => {
    setCategory((prev) => ({
      ...prev,
      image: files,
    }));
  };

  useEffect(() => {
    if (props.isEdit && props.data) {
      setCategory({
        categoryId: props.data.categoryId,
        name: props.data.name,
        description: props.data.description,
        image: props.data.image,
      });
      setImages([props.data.image]);
    }
  }, [props.data, props.isEdit]);

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (props.isEdit) {
      editCategory({
        category,
        setCategory: props.setCategories,
        setLoading: props.setLoading,
      });
    } else {
      createCategory({
        category,
        setLoading: props.setLoading,
        setCategories: props.setCategories,
      });
    }
    props.handleModalClose();
  };

  const handleClose = () => {
    props.handleModalClose();
  };

  useEffect(() => {
    if (!category.name || !category.description || category.image.length < 1) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [category, images]);

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        sx={{
          width: { xs: "250px", sm: "550px", md: "650px", lg: "700px" },
          maxWidth: "80vw",
          maxHeight: "120vh",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          overflowY: "auto",
          mx: "auto",
          mt: "10vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
            {props.isEdit ? "Edit Category" : "Create Category"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: { xs: "380px", sm: "400px", md: "400px", lg: "400px" }, // Adjust as needed
            overflowY: "auto",
            mb: 2,
          }}
        >
          <CustomTextfield
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            select
            name="name"
            value={category.name}
            config={{ field: "name" }}
            handleEdit={handleChange}
            sx={{
              mb: 2,
              mt: 2,
            }}
          />

          <CustomTextfield
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            select
            mu
            name="description"
            value={category.description}
            config={{ field: "description" }}
            handleEdit={handleChange}
            multiline={true}
            sx={{
              mb: 2,
            }}
          />
          <Box mb={2}>
            <UploadFiles
              updateData={(files) => handleFileUpload(files)}
              isEdit={props.isEdit}
              images={images}
              file={category.image}
              singleFile={true}
              acceptedFiles="image/png, image/jpeg"
              category="categories"
              //   parentClass="category-form-container"
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="right" mt="auto">
          <Button
            variant="outlined"
            color="custom"
            onClick={handleClose}
            sx={{ width: "200px", mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="custom"
            onClick={handleCategorySubmit}
            disabled={buttonDisabled}
            sx={{ width: "200px" }}
          >
            {props.isEdit ? "Save" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditCategory;

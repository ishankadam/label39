import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  Stack,
  Rating,
  styled,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import CustomTextfield from "../../components/textfield/customTextfield";
import UploadFiles from "../../components/upload/uploadFiles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import StarIcon from "@mui/icons-material/Star";
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value]?.icon}</span>;
}

const TestimonialModal = (props) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [testimonial, setTestimonial] = useState({
    name: "",
    comments: "",
    image: null,
    rating: 5, // Initialize rating
  });
  const [images, setImages] = useState([]);
  const [value, setValue] = useState(0);
  const [hover, setHover] = React.useState(-1);
  const handleChange = (value, field) => {
    setTestimonial((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (images && Array.isArray(images) && images.length > 0) {
      setTestimonial((prevDetails) => ({
        ...prevDetails,
        image: images[0],
      }));
    }
  }, [images]);

  const handleFileUpload = (files) => {
    setImages(files);
  };

  useEffect(() => {
    if (props.isEdit && props.data) {
      setTestimonial({
        testimonialId: props.data.testimonialId,
        name: props.data.name,
        comments: props.data.comments,
        image: props.data.image,
        rating: props.data.rating || 0, // Initialize rating if available
      });
      setImages([props.data.image]);
    }
  }, [props.data, props.isEdit]);

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    props.handleModalClose();
  };

  const handleClose = () => {
    props.handleModalClose();
  };

  useEffect(() => {
    if (
      !testimonial.name ||
      !testimonial.comments ||
      images.length < 1 ||
      testimonial.rating === 0
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [testimonial, images]);

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        sx={{
          width: { xs: "250px", sm: "550px", md: "650px", lg: "700px" },
          maxWidth: "80vw",
          maxHeight: "90vh",
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
              color: "#33376F",
              fontWeight: "Bold",
              textAlign: { xs: "center", md: "left" },
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.4rem",
                lg: "1.6rem",
              },
            }}
          >
            {props.isEdit ? "Edit Testimonial" : "Create Testimonial"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: { xs: "380px", sm: "400px", md: "400px", lg: "400px" },
            overflowY: "auto",
            mb: 2,
          }}
        >
          <CustomTextfield
            label="Name"
            variant="outlined"
            margin="normal"
            required
            name="name"
            value={testimonial.name}
            config={{ field: "name" }}
            handleEdit={handleChange}
            sx={{
              mb: 2,
              mt: 2,
            }}
          />
          <CustomTextfield
            label="Comments"
            variant="outlined"
            margin="normal"
            required
            name="comments"
            value={testimonial.comments}
            config={{ field: "comments" }}
            handleEdit={handleChange}
            multiline={true}
            sx={{
              mb: 2,
            }}
          />

          {/* Rating Component */}
          <Box mb={2} display="flex" alignItems="center">
            <Typography sx={{ mr: 2 }}>Rating:</Typography>
            <Rating
              name="hover-feedback"
              value={testimonial.rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </Box>

          <Box mb={2}>
            <UploadFiles
              updateData={(files) => handleFileUpload(files)}
              isEdit={props.isEdit}
              images={images}
              file={testimonial.image}
              category="testimonial"
              acceptedFiles="image/png, image/jpeg"
              parentClass="testimonial-form-container"
            />
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt="auto">
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleTestimonialSubmit}
            disabled={buttonDisabled}
          >
            {props.isEdit ? "Save" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TestimonialModal;

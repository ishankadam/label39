/* eslint-disable react-hooks/exhaustive-deps */
import { Close } from "@mui/icons-material";
import { Button, Typography, Grid2 } from "@mui/material";
import React, { useEffect, useState, forwardRef } from "react";
import "./uploadFiles.css";
import { imageUrl } from "../../api";

const UploadFiles = forwardRef((props, ref) => {
  const [files, setFiles] = useState([]);
  const inputRef = React.useRef(null);

  const [filePreviews, setFilePreviews] = useState([]);

  const handleFileUpdate = (newFiles) => {
    const validFiles = Array.from(newFiles).filter((file) =>
      ["image/png", "application/pdf", "image/jpg", "image/jpeg"].includes(
        file.type
      )
    );

    if (validFiles.length > 0) {
      setFiles((prevFiles) => {
        const updatedFiles = props.isEditproductDetails.description
          ? [validFiles[0]]
          : [...prevFiles, ...validFiles];
        return updatedFiles;
      });
      props.updateData && props.updateData(validFiles);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpdate(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileRemove = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    props.updateData && props.updateData(updatedFiles);
  };

  useEffect(() => {
    if (props.isEdit && props.images && props.images.length > 0) {
      setFiles(props.images);
    }
  }, [props.images, props.isEdit]);

  useEffect(() => {
    if (props.isEdit) {
      setFiles(props.file);
    }
  }, [props.file]);

  useEffect(() => {
    const previews = files.map((file) =>
      file instanceof File ? URL.createObjectURL(file) : `${imageUrl}/${file}`
    );
    setFilePreviews(previews);

    return () => {
      previews.forEach((preview) => {
        if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
      });
    };
  }, [files, props.category]);

  return (
    <>
      {/* <div id="file-upload-container"> */}
      <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          onChange={handleChange}
          accept={props.acceptedFiles}
          name="attachment"
          multiple={true}
          style={{ display: "none" }}
        />
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            <Typography sx={{ fontSize: "13px" }}>
              Upload your PDF, PNG, JPG, JPEG files here
            </Typography>
            <Button
              variant="text"
              className="upload-button"
              onClick={onButtonClick}
            >
              Upload files
            </Button>
          </div>
        </label>
      </form>
      <Grid2
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      >
        {files.length > 0 && (
          // <div className="files-preview">

          <>
            {files.map((file, index) => (
              <Grid2
                item
                xs={6}
                md={4}
                key={index}
                className="attachment-filename"
                sx={{
                  border: "1px solid #ccc",
                  padding: "5px !important",
                  position: "relative",
                  width: "200px",
                }}
              >
                <div className="image-container">
                  {/* Display image preview */}
                  {filePreviews[index] && (
                    <img
                      className="attachment-file"
                      src={filePreviews[index]}
                      alt="attachment"
                    />
                  )}
                </div>
                <div key={index} className="attachment-filename">
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#555",
                      textAlign: "center",
                    }}
                  >
                    {file instanceof File ? file.name : file}
                  </Typography>

                  <Close
                    onClick={() => handleFileRemove(index)}
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      borderRadius: "50%",
                      padding: "4px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </Grid2>
            ))}
          </>
          // </div>
        )}
      </Grid2>
      {/* </div> */}
    </>
  );
});

export default UploadFiles;

/* eslint-disable react-hooks/exhaustive-deps */
import { Close } from "@mui/icons-material";
import { Button, Typography, Grid2, Box } from "@mui/material";
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
        if (props.singleFile) {
          // If singleFile is true, only store the newest file
          return [validFiles[validFiles.length - 1]];
        } else {
          // If not singleFile, append the files (bulk upload)
          const updatedFiles = [...prevFiles, ...validFiles];
          return updatedFiles;
        }
      });
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
    const previews = files.map((file) =>
      file instanceof File
        ? URL.createObjectURL(file)
        : `${imageUrl}${props.category}/${file}`
    );
    setFilePreviews(previews);
    props.updateData && props.updateData(files);
    return () => {
      previews.forEach((preview) => {
        if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
      });
    };
  }, [files, props.category]);

  return (
    <>
      <form className="form-file-upload" onSubmit={(e) => e.preventDefault()}>
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontSize: "13px" }}>
            Upload your PDF, PNG, JPG, JPEG files here
          </Typography>
          <Button
            variant="text"
            className="upload-button"
            onClick={onButtonClick}
            sx={{ fontFamily: "'Roboto Serif', serif", color: "#a16149" }}
          >
            Upload files
          </Button>
        </Box>
      </form>

      <Grid2
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      >
        {files.length > 0 && (
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
        )}
      </Grid2>
    </>
  );
});

export default UploadFiles;

/* eslint-disable react-hooks/exhaustive-deps */
import { Close } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState, forwardRef } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { getUrl } from "../../common";
import "./uploadFiles.css";

const UploadFiles = forwardRef((props, ref) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const inputRef = React.useRef(null);
  const containerRef = React.useRef(null); // React ref for the container

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setDragActive(false);
    }
  };

  const handleFileUpdate = (file) => {
    if (
      file &&
      !["image/png", "application/pdf", "image/jpg", "image/jpeg"].includes(
        file.type
      )
    ) {
      setFile(undefined);
    } else {
      setFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpdate(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpdate(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileRemove = () => {
    setFile(undefined);
  };

  useEffect(() => {
    const element = containerRef.current; // Use React ref
    if (element) {
      element.addEventListener("dragenter", handleDrag);
      element.addEventListener("dragleave", handleDrag);
      element.addEventListener("dragover", handleDrag);
      element.addEventListener("drop", handleDrop);

      return () => {
        element.removeEventListener("dragenter", handleDrag);
        element.removeEventListener("dragleave", handleDrag);
        element.removeEventListener("dragover", handleDrag);
        element.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  useEffect(() => {
    if (dragActive) {
      const dragElement = document.querySelector(".drag-active-ele");

      if (!dragElement) {
        const div = document.createElement("div");
        div.className = "drag-active-ele";
        div.innerHTML = "<span>Drop File Here!</span>";
        div.addEventListener("dragenter", handleDrag);
        div.addEventListener("dragleave", handleDrag);
        div.addEventListener("dragover", handleDrag);
        div.addEventListener("drop", handleDrop);
        containerRef.current.appendChild(div); // Append to the React ref container
      }
    } else {
      const removeElement = document.querySelector(".drag-active-ele");
      if (removeElement) {
        containerRef.current.removeChild(removeElement); // Remove from the React ref container
      }
    }
  }, [dragActive]);

  useEffect(() => {
    setFile(props.file);

    if (props.file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        const blob = new Blob([arrayBuffer], { type: props.file?.type });
        const url = URL.createObjectURL(blob);
        setImage(url);
      };

      if (props.file && typeof props.file === "object") {
        reader.readAsArrayBuffer(props.file);
      }
    }
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [props.file]);

  return (
    <>
      {!file ? (
        <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            onChange={handleChange}
            accept=" .PDF, .PNG, .JPG, .JPEG "
            name="attachment"
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
            ref={containerRef} // Attach the ref here
          >
            <div>
              <Typography sx={{ fontSize: "13px" }}>
                Drag and drop your PDF, PNG, JPG, JPEG file here or
              </Typography>
              <Button
                variant="text"
                className="upload-button"
                onClick={onButtonClick}
              >
                Upload a file
              </Button>
            </div>
          </label>
        </form>
      ) : file ? (
        <>
          <div className="attachment-filename">
            <Typography>{file && file?.name}</Typography>
            <Close onClick={handleFileRemove}></Close>
          </div>
          <div className="image-container">
            <img
              className="attachment-file"
              src={
                typeof props.file === "object" ? image : `${getUrl()}${file}`
              }
              alt="attachment"
            />
            <div className="overlay">
              <Button
                color={"primary"}
                variant="contained"
                size="small"
                startIcon={
                  <CloudDownloadIcon
                    className="download-icon"
                    fontSize="large"
                  />
                }
              >
                Download
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
});

export default UploadFiles;

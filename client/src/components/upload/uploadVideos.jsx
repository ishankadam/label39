import React, { useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const FileUploadDefaultImage =
  "https://via.placeholder.com/300x200?text=Upload+Image";

const StyledLabel = styled("label")(() => ({
  cursor: "pointer",
  textAlign: "center",
  display: "flex",
  position: "relative",
  "&:hover p, &:hover svg, &:hover img": {
    opacity: 1,
  },
  "& p, svg": {
    opacity: 0.4,
  },
  "&:hover img": {
    opacity: 0.3,
  },
}));

const HiddenInput = styled("input")({
  display: "none",
});

const IconTextBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
});

const DragOverBox = styled(Box)(({ isDragOver }) => ({
  "& img": {
    opacity: isDragOver ? 0.3 : undefined,
  },
  "& p, svg": {
    opacity: isDragOver ? 1 : 0.4,
  },
}));

export const FileUpload = ({
  accept,
  imageButton = false,
  hoverLabel = "Click or drag to upload file",
  dropLabel = "Drop file here",
  width = "600px",
  height = "100px",
  backgroundColor = "#fff",
  image = {},
  onChange,
  onDrop,
}) => {
  const [imageUrl, setImageUrl] = useState(image.url || FileUploadDefaultImage);
  const [labelText, setLabelText] = useState(hoverLabel);
  const [isDragOver, setIsDragOver] = useState(false);

  const imageStyle = image.imageStyle || { height: "inherit" };

  const stopDefaults = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragEvents = {
    onDragEnter: (e) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      }
      onDrop(e);
    },
  };

  const handleChange = (event) => {
    if (imageButton && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
    onChange(event);
  };

  return (
    <>
      <HiddenInput
        onChange={handleChange}
        accept={accept}
        id="file-upload"
        type="file"
      />
      <StyledLabel htmlFor="file-upload" {...dragEvents}>
        <DragOverBox
          isDragOver={isDragOver}
          width={width}
          height={height}
          bgcolor={backgroundColor}
        >
          {imageButton && (
            <Box position="absolute" height={height} width={width}>
              <img
                alt="file upload"
                src={imageUrl || "/placeholder.svg"}
                style={imageStyle}
              />
            </Box>
          )}
          {(!imageButton || isDragOver) && (
            <IconTextBox height={height} width={width}>
              <CloudDownloadIcon fontSize="large" />
              <Typography>{labelText}</Typography>
            </IconTextBox>
          )}
        </DragOverBox>
      </StyledLabel>
    </>
  );
};

import React, { useState } from "react";
import { Button, LinearProgress, Typography, Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Input = styled("input")({
  display: "none",
});

const UploadPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UploadVideos() {
  const [file, setFile] = useState(null);
  const [progress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  return (
    <UploadPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Upload Video
      </Typography>
      <Box mb={2}>
        <label htmlFor="contained-button-file">
          <Input
            accept="video/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Select Video
          </Button>
        </label>
      </Box>
      {file && (
        <Typography variant="body2" gutterBottom>
          Selected file: {file.name}
        </Typography>
      )}
      {progress > 0 && (
        <Box mb={2}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2">{`${Math.round(progress)}%`}</Typography>
        </Box>
      )}
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </UploadPaper>
  );
}

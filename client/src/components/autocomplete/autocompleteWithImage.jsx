import React, { useState } from "react";
import { Autocomplete, TextField, Box, Typography, Chip } from "@mui/material";
import { imageUrl } from "../../api";

// Assuming we have a list of products with their names, images, and IDs

export default function AutocompleteWithImage(props) {
  const [inputValue, setInputValue] = useState([]);

  const handleChange = (_event, newValue) => {
    setInputValue(newValue);
    props.handleEdit(newValue, props.config.field);
  };

  return (
    <Autocomplete
      multiple
      options={props.options}
      getOptionLabel={(option) => option.label}
      value={inputValue}
      onChange={(event, newValue) => {
        handleChange(event, newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select products" />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="50"
            src={`${imageUrl}products/${option.image}`}
            alt={option.label}
          />
          <Typography variant="body2">{option.label}</Typography>
        </Box>
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            key={option.id}
            label={option.label}
            {...getTagProps({ index })}
            avatar={
              <img
                src={`${imageUrl}products/${option.image}`}
                alt={option.label}
              />
            }
          />
        ))
      }
    />
  );
}

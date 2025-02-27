import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

const ChipTextfield = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState(props.value || []);

  // Handle Enter key press to add custom value to array
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault(); // Prevent form submission or new line in input
      if (!values.includes(inputValue.trim())) {
        const updatedValues = [...values, inputValue.trim()];
        setValues(updatedValues);
        props.handleEdit(updatedValues, props.config.field); // Update parent with new values
      }
      setInputValue(""); // Clear input after adding the value
    }
  };

  // Handle selection from predefined options
  const handleChange = (event, newValue) => {
    setValues(newValue); // Update local state
    props.handleEdit(newValue, props.config.field); // Pass updated values to parent
  };

  useEffect(() => {
    setValues(props.value);
  }, [props.value]);

  return (
    <Autocomplete
      multiple
      freeSolo
      sx={props.sx ? props.sx : {}}
      options={props.predefinedOptions}
      value={values}
      onChange={handleChange} // Updates array when a suggestion is selected
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)} // Handles input changes separately
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={index}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label={props.label} onKeyDown={handleKeyDown} />
      )}
    />
  );
};

export default ChipTextfield;

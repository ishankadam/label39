import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";

const CustomAutocomplete = ({
  options,
  label,
  placeholder,
  onChange,
  getOptionLabel = (option) => option.label,
  isOptionEqualToValue = (option, value) => option.id === value.id,
  renderOption,
  config,
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
      onChange={(_event, newValue) => {
        if (onChange) {
          onChange(newValue);
        } else {
          props.handleEdit(newValue, config.field);
        }
      }}
      renderOption={renderOption}
      {...props}
    />
  );
};

export default CustomAutocomplete;

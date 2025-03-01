import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";

const MultiSelectAutocomplete = ({
  options,
  label,
  placeholder,
  onChange,
  getOptionLabel = (option) => {
    if (!option) return "";
    if (typeof option === "object") return option.label || "";
    const found = options.find((o) => o.value === option);
    return found ? found.label : "";
  },
  isOptionEqualToValue = (option, value) => option.value === value.value,
  renderOption = (props, option) => (
    <li {...props} key={option.value}>
      {option.label}
    </li>
  ),
  config,
  ...props
}) => {
  return (
    <Autocomplete
      multiple
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

export default MultiSelectAutocomplete;

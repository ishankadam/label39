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
  isOptionEqualToValue = (option, value) =>
    value ? option.value === value.value : false,
  renderOption = (props, option) => (
    <li {...props} key={option.value}>
      {option.label}
    </li>
  ),
  config,
  value,
  ...props
}) => {
  console.log(value);
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      value={value || []}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
      onChange={(_event, newValue) => {
        console.log("Updated Value:", newValue);
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

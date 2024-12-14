import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import _ from "lodash";
import React from "react";
import "./../../css/selectDropdown.css";
const SelectDropdown = (props) => {
  const handleChange = (e) => {
    props.handleEdit(
      e.target.value,
      props.config.field,
      props.config.index,
      props.config.section
    );
  };
  const CountryFlag = ({ flag, name }) => (
    <img className="country-flag" src={flag} alt={name} />
  );

  const updateMenuItems = (data) => {
    return _.map(data, (obj, index) => (
      <MenuItem key={index} value={obj.value}>
        {obj.flag && <CountryFlag flag={obj.flag} name={obj.label} />}
        {obj.label}
      </MenuItem>
    ));
  };

  const menuItems = updateMenuItems(_.get(props, "optionList", []));
  return (
    <FormControl
      className={props.className ? props.className : "select-condition-list"}
      variant="outlined"
      fullWidth
      margin="normal"
    >
      <InputLabel id={`select-label-${props.id}`}>{props.label}</InputLabel>
      <Select
        aria-labelledby={`select-label-${props.id}`}
        id={props.id || "select-dropdown"}
        className={props.className ? props.className : "select-dropdown"}
        label={props.label}
        variant={props.variant || "outlined"}
        sx={{ ...props.sx }}
        value={props.value}
        onChange={handleChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;

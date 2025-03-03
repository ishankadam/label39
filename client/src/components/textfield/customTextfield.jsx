import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  isValidPhoneNumber,
  validateEmail,
  validatePassword,
} from "../../common.js";

const CustomTextfield = (props) => {
  const [textValue, setTextValue] = useState("");

  const [error, setError] = useState(props.error);
  const [helperText, setHelperText] = useState(props.helperText);

  const handleTextfieldValue = (value) => {
    const inputValue = props.type === "number" ? Number(value) : value;
    setTextValue(inputValue);
    let errObj = {
      isError: props.error,
    };
    const key = props.config.field;
    if (props.config.type === "email") {
      errObj.isError = !validateEmail(inputValue);
    } else if (props.config.type === "password") {
      const passwordValid = validatePassword(inputValue);
      errObj.isError = !passwordValid;
      props.setValidation && props.setValidation(passwordValid);
    } else if (props.config.type === "phone") {
      errObj.isError = !isValidPhoneNumber(inputValue);
    } else if (props.config.type === "amount") {
      errObj.isError = inputValue < 2500;
    } else {
      errObj.isError =
        props.type === "number"
          ? inputValue.length > 0
          : inputValue.trim() === "";
    }
    if (props.config.type !== "filter") {
      props.setError &&
        props.setError({
          ...props.errorObj,
          [key]: errObj.isError,
        });
      setError(errObj.isError);
    }
    setHelperText(props.helperText);

    setTextValue(value);
    if (props.handleEdit) {
    }
    props.handleEdit(
      inputValue,
      props.config.field,
      props.config.index,
      props.config.section
    );
  };

  useEffect(() => {
    setError(props.error);
    setHelperText(props.error && props.helperText);
  }, [props.error, props.helperText]);

  return (
    <TextField
      className={`common-textfield ${props.className ? props.className : ""}`}
      value={props.value ? props.value : textValue}
      id={props.id ? props.id : ""}
      name={props.name || null}
      autoComplete={props.name || null}
      error={error}
      helperText={helperText}
      type={props.type}
      label={props.label}
      placeholder={props.placeholder}
      variant={props.variant}
      size={props.size}
      InputProps={props.InputProps}
      InputLabelProps={{ className: "common-textfield-label" }}
      sx={props.sx}
      disabled={props.disabled}
      required={props.config?.isRequired}
      onChange={(e) => handleTextfieldValue(e.target.value)}
      inputProps={props.inputProps}
      multiline={props.multiline ? props.multiline : false}
    ></TextField>
  );
};

export default CustomTextfield;

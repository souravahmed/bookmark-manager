import React from "react";
import { TextField, Autocomplete } from "@mui/material";

export const Input = ({ input, meta, onChange, ...props }) => {
  const hasError = () => {
    return (meta.error || meta.submitError) && meta.touched;
  };
  return (
    <TextField
      {...input}
      {...props}
      error={hasError()}
      helperText={(hasError() && meta.error) || meta.submitError}
    />
  );
};

export const AutoCompleteSelect = ({
  input,
  meta,
  options,
  label,
  handleOnChange,
  ...rest
}) => {
  const hasError = () => {
    return meta.error && meta.touched;
  };

  return (
    <Autocomplete
      options={options}
      {...input}
      {...rest}
      onChange={(e, value) => {
        input.onChange(value); //final-form's onChange
        handleOnChange(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={hasError()}
          helperText={hasError() && meta.error}
          label={label}
        />
      )}
    />
  );
};

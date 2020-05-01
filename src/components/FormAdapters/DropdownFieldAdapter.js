import React from "react";
import DropdownField from "../Form/DropdownField";

const DropdownFieldAdapter = ({
  input,
  meta,
  disabled,
  required,
  inputProps,
  ...rest
}) => {
  //debugger;
  return (
    <DropdownField
      disabled={input.value ? input.value.disabled : disabled}
      required={
        input.value && typeof input.value.required !== "undefined"
          ? input.value.required
          : required
      }
      inputProps={{
        ...input,
        ...inputProps
      }}
      hasWarning={meta.data.warning}
      hasError={meta.touched && meta.error}
      description={meta.error || meta.data.warning}
      onChange={value => {
        console.log("OnChange dropdown value:", value);
        input.onChange({ ...input.value, inputValue: value, fieldValue: value, required: true })
      }}
      onType={value => {
        console.log("OnType dropdown value:", value);

        return input.onChange({ ...input.value, calculated: false, inputValue: value, fieldValue: value, required: true })
      }}
      onBlur={event => {
        console.log("OnBlur dropdown event:", event); return input.onBlur(event)
      }}
      {...rest}
    />
  );
};

export default DropdownFieldAdapter;

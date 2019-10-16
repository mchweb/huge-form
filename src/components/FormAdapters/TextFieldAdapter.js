import React from "react";
import BaseField from "../Form/BaseField";

const TextFieldAdapter = ({
  input,
  meta,
  disabled,
  required,
  inputProps,
  ...rest
}) => {
  return (
    <BaseField
      disabled={input.value ? input.value.disabled : disabled}
      required={
        input.value && typeof input.value.required !== "undefined"
          ? input.value.required
          : required
      }
      inputProps={{
        ...input,
        ...inputProps,
        value:
          input.value && input.value.inputValue ? input.value.inputValue : ""
      }}
      hasWarning={meta.data.warning}
      hasError={meta.touched && meta.error}
      description={meta.error || meta.data.warning}
      onChange={value => input.onChange({ inputValue: value })}
      onBlur={event => input.onBlur(event)}
      {...rest}
    />
  );
};

export default TextFieldAdapter;

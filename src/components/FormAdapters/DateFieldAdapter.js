import React from "react";
import DateField from "../Form/DateField";

const DateFieldAdapter = ({
  input,
  meta,
  disabled,
  required,
  inputProps,
  ...rest
}) => {
  // console.log(input.value);
  return (
    <DateField

      disabled={input.value ? input.value.disabled : disabled}
      required={
        input.value && typeof input.value.required !== "undefined"
          ? input.value.required
          : required
      }
      calculated={input.value && input.value.calculated}
      inputProps={{
        ...input,
        ...inputProps
      }}
      hasWarning={meta.data.warning}
      hasError={meta.touched && meta.error}
      description={meta.error || meta.data.warning}
      onChange={value =>
        input.onChange({
          inputValue: value.toISOString().slice(0, 10),
          fieldValue: value
        })
      }
      onType={value => {
        console.log('on Type Date value =', value);
        input.onChange({ inputValue: value })
      }}
      onBlur={event => {
        console.log('onBlur event =', event);
        input.onBlur(event)
      }}
      {...rest}
    />
  );
};

export default DateFieldAdapter;

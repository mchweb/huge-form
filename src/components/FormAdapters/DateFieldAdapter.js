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
  const calc = input.value && input.value.calculated /*? "true" : "false"*/;

  return (
    <DateField
      disabled={input.value ? input.value.disabled : disabled}
      required={
        input.value && typeof input.value.required !== "undefined"
          ? input.value.required
          : required
      }
      calculated={calc}
      inputProps={{
        ...input,
        ...inputProps
      }}
      hasWarning={meta.data.warning}
      hasError={meta.touched && meta.error}
      description={meta.error || meta.data.warning}
      onChange={value =>
        input.onChange({
          inputValue: value.toISOString().slice(0, 10)
        })
      }
      onType={value => input.onChange({ inputValue: value })}
      onBlur={event => input.onBlur(event)}
      {...rest}
    />
  );
};

export default DateFieldAdapter;

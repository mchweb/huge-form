import React from "react";
import SearchField from "../Form/SearchField";

const SearchFieldAdapter = ({
  input,
  meta,
  disabled,
  required,
  inputProps,
  textField,
  data,
  columnConfig,
  ...rest
}) => {
  //TODO do not change input, make a new variable
  if (data) {
    if (input.value && input.value.inputValue) {
      if (!data.find((row) => row[textField] === input.value.inputValue)) {
        input.value.inputValue = "";
      }
    }
  }

  const calculatedData =
    input.value && input.value.data ? input.value.data : data;
  const calculatedColumnConfig =
    input.value && input.value.textField
      ? input.value.columnConfig
      : columnConfig;
  const calculatedTextField =
    input.value && input.value.textField ? input.value.textField : textField;

  return (
    <SearchField
      disabled={input.value ? input.value.disabled : disabled}
      required={
        input.value && typeof input.value.required !== "undefined"
          ? input.value.required
          : required
      }
      inputProps={{
        ...input,
        ...inputProps,
      }}
      hasWarning={meta.data.warning}
      hasError={meta.touched && meta.error}
      description={meta.error || meta.data.warning}
      textField={calculatedTextField}
      onChange={(value) =>
        input.onChange({
          ...input.value,
          inputValue: value[textField],
          fieldValue: value,
          calculated: false,
        })
      }
      onType={(value) =>
        input.onChange({
          ...input.value,
          calculated: false,
          inputValue: value,
        })
      }
      onBlur={(event) => input.onBlur(event)}
      data={calculatedData}
      columnConfig={calculatedColumnConfig}
      {...rest}
    />
  );
};

export default SearchFieldAdapter;

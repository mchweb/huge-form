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
  const calculatedData =
    !!input.value && !!input.value.data ? input.value.data : data;
  const calculatedConfig =
    !!input.value && !!input.value.columnConfig
      ? input.value.columnConfig
      : columnConfig;
  const calculatedtextField =
    !!input.value && !!input.value.textField
      ? input.value.textField
      : textField;

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
      textField={calculatedtextField}
      onChange={(value) =>
        input.onChange({ inputValue: value[textField], fieldValue: value })
      }
      onType={(value) => input.onChange({ inputValue: value })}
      onBlur={(event) => input.onBlur(event)}
      {...rest}
      data={calculatedData}
      columnConfig={calculatedConfig}
    />
  );
};

export default SearchFieldAdapter;

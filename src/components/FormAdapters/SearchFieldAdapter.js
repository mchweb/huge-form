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

  let inputCopy = { ...input };
  if (!inputCopy.value)
    inputCopy.value = {};
  
  const cData =
    input.value && input.value.data ? input.value.data : data;
  const cColumnConfig =
    input.value && input.value.colConfig
      ? input.value.colConfig
      : columnConfig;
  const cTextField =
    input.value && input.value.textField ? input.value.textField : textField;
    
    if (cData) {
      if (input.value && input.value.inputValue) {
        if (!data.find((row) => row[cTextField] === input.value.inputValue)) {
          inputCopy.value.inputValue = "";
        }
      }
    }


  return (
    <SearchField
      disabled={input.value ? input.value.disabled : disabled}
      required={
        input.value && typeof input.value.required !== "undefined"
          ? input.value.required
          : required
      }
      inputProps={{
        ...inputCopy,
        ...inputProps
      }}
      hasWarning={meta.data.warning}
      hasError={meta.touched && meta.error}
      description={meta.error || meta.data.warning}
      textField={cTextField}
      onChange={value =>
        input.onChange({ inputValue: value[textField] })
      }
      onType={value => input.onChange({ inputValue: value,})}
      onBlur={event => input.onBlur(event)}
      data={cData}
      columnConfig={cColumnConfig}
      {...rest}
    />
  );
};

export default SearchFieldAdapter;

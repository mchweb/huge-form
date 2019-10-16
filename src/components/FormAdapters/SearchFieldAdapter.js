import React from "react";
import SearchField from "../Form/SearchField";

const SearchFieldAdapter = ({
  input,
  meta,
  disabled,
  required,
  inputProps,
  textField,
  ...rest
}) => {
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
        ...inputProps
      }}
      hasWarning={meta.data.warning}
      hasError={meta.touched && meta.error}
      description={meta.error || meta.data.warning}
      textField={textField}
      onChange={value =>
        input.onChange({ inputValue: value[textField], fieldValue: value })
      }
      onType={value => input.onChange({ inputValue: value })}
      onBlur={event => input.onBlur(event)}
      {...rest}
    />
  );
};

export default SearchFieldAdapter;

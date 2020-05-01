import React from "react";
import SearchField from "../Form/SearchField";
import { columnConfig } from "../../Examples/TaskData";

const SearchFieldAdapter = ({
  input,
  meta,
  disabled,
  required,
  inputProps,
  textField,
  gridData,
  ...rest
}) => {
  const calculatedData = input.value && input.value.gridData ? input.value.gridData : gridData;
  const calculatedtextField = input.value && input.value.textField ? input.value.textField : textField;
  const calculatedcolumnConfig = input.value && input.value.columnConfig ? input.value.columnConfig : columnConfig;

  //  console.log("input value:", input, "calculated tf:", calculatedtextField);

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
      textField={calculatedtextField}//it's clear that issue is here
      onChange={value => {
        //console.log("OnChange seach  value:", value);
        // console.log("OnChange textField:", textField, "value[textField]", value[textField]);
        return input.onChange({
          ...input.value,
          inputValue: value[textField],
          fieldValue: value,
          calculated: false
        })
      }
      }
      //onType={function(value){...}}
      onType={value => {
        // console.log("OnType input.value:", input.value);
        //console.log("OnType seach value:", value);
        return input.onChange({
          ...input.value,
          inputValue: value,
          calculated: false
        })
      }}
      onBlur={event => {
        //console.log(event);
        input.onBlur(event);
      }}
      data={calculatedData}
      //columnConfig={calculatedcolumnConfig}

      // data={gridData}
      /**? */
      {...rest}
    />
  );
};

/*
function bla(a, b){
  return a+b
}

const x = function(a, b){
  return a+b;
}

const bla = (a, b) => {
  return a+b;
}

const bla1 = a => {
  return a+1;
}

const bla2 = a => (a+1);
*/
export default SearchFieldAdapter;

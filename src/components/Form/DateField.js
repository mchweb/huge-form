import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { BaseField } from ".";

class DateField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popupOpen: false, inputValue: "", selectedDate: null };
  }
  onType = value => {
    // TODO: update value when user input date is valid
    const { onType, onChange } = this.props;
    //const isItemSelected = options.indexOf(value) !== -1;
    this.setState({
      //selectedItem: isItemSelected ? value : null,
      inputValue: value
    });
    //if (isItemSelected && typeof onChange === "function") {
    //  onChange(value);
    //} else {
    if (typeof onType === "function") onType(value);
  };
  onSelect = date => {
    const { onChange } = this.props;
    if (typeof onChange === "function") onChange(date);
    this.setState({
      popupOpen: false,
      selectedItem: date,
      inputValue:
        typeof date.toISOString === "function"
          ? date.toISOString().slice(0, 10)
          : ""
    });
  };
  componentDidUpdate(prevProps) {
    const { inputProps } = this.props;

    if (inputProps && inputProps.value.calculated) {
      this.onType(inputProps.value.fieldValue.toISOString().slice(0, 10));
    }
  }

  render() {
    const { inputProps, onType, ...rest } = this.props;
    const { popupOpen, inputValue, selectedDate } = this.state;
    return (
      <BaseField
        icon="Calendar"
        inputProps={{
          ...inputProps,
          value:
            inputProps && inputProps.value && inputProps.value.inputValue
              ? inputProps.value.inputValue
              : inputValue
        }}
        onIconClick={() => {
          this.setState({ popupOpen: !popupOpen });
        }}
        onChange={this.onType}
        {...rest}
      >
        <div style={{ position: "absolute", right: 0 }}>
          {popupOpen ? (
            <DatePicker
              selected={selectedDate}
              onChange={this.onSelect}
              inline
            />
          ) : (
            ""
          )}
        </div>
      </BaseField>
    );
  }
}

DateField.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasError: PropTypes.bool,
  description: PropTypes.string,

  onType: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  inputProps: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.shape({
      inputValue: PropTypes.string,
      fieldValue: PropTypes.object
    })
  })
};

export default DateField;

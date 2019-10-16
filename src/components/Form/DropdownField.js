import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseField";
import FieldPopup from "./FieldPopup";
import List from "../List";

class DropdownField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listOpen: false, inputValue: "", selectedItem: null };
  }

  onType = value => {
    const { onType, onChange, options } = this.props;
    const isItemSelected = options.indexOf(value) !== -1;
    this.setState({
      selectedItem: isItemSelected ? value : null,
      inputValue: value
    });
    if (isItemSelected && typeof onChange === "function") {
      onChange(value);
    } else {
      if (typeof onType === "function") onType(value);
    }
  };

  onSelect = item => {
    const { onChange } = this.props;
    if (typeof onChange === "function") onChange(item);
    this.setState({ listOpen: false, selectedItem: item, inputValue: item });
  };

  componentDidUpdate(prevProps) {
    const { inputProps } = this.props;

    if (inputProps && inputProps.value.calculated) {
      this.onType(inputProps.value.inputValue);
    }
  }

  render() {
    const {
      inputProps,
      options,
      onChange,
      onType,
      hasError,
      description,
      ...rest
    } = this.props;
    const { listOpen, inputValue, selectedItem } = this.state;
    const invalidInput = inputValue !== "" && selectedItem == null;
    const filteredOptions = options.filter(
      i => i.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    );
    return (
      <BaseField
        inputProps={{
          ...inputProps,
          value:
            inputProps && inputProps.value && inputProps.value.inputValue
              ? inputProps.value.inputValue
              : inputValue
        }}
        onIconClick={() => {
          this.setState({ listOpen: !listOpen });
        }}
        onFocus={() => {
          this.setState({ listOpen: true });
        }}
        icon={listOpen ? "ChevronUp" : "ChevronDown"}
        onChange={this.onType}
        hasError={hasError || invalidInput}
        description={invalidInput ? "Please select an item" : description}
        {...rest}
      >
        {listOpen ? (
          <FieldPopup>
            {filteredOptions.length ? (
              <List
                onBlur={() => {
                  this.setState({ listOpen: false });
                }}
                items={filteredOptions}
                onSelect={this.onSelect}
              />
            ) : (
              <div className="field__popupEmptyMessage">No items found</div>
            )}
          </FieldPopup>
        ) : (
          ""
        )}
      </BaseField>
    );
  }
}

DropdownField.defaultProps = {
  options: []
};
DropdownField.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasError: PropTypes.bool,
  description: PropTypes.string,

  options: PropTypes.array.isRequired,

  onType: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  inputProps: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.shape({
      inputValue: PropTypes.string,
      fieldValue: PropTypes.string
    })
  })
};

export default DropdownField;

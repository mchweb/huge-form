import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseField";
import FieldPopup from "./FieldPopup";
import List from "../List";
import Table from "../Table";

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      inputValue: "",
      selectedItem: null,
      listExpanded: false
    };
  }

  onType = value => {
    const { onType, onChange, data, textField } = this.props;
    const selectedItem = data.find(e => e[textField] === value);
    this.setState({
      selectedItem: selectedItem,
      inputValue: value
    });
    if (selectedItem && typeof onChange === "function") {
      onChange(selectedItem);
    } else {
      if (typeof onType === "function") onType(value);
    }
  };

  onSelect = item => {
    const { onChange, data, textField } = this.props;
    const row =
      typeof item === "object" ? item : data.find(e => e[textField] === item);
    if (typeof onChange === "function") onChange(row);
    this.setState({
      listOpen: false,
      selectedItem: row,
      inputValue: row[textField]
    });
  };

  componentDidUpdate(prevProps) {
    const { inputProps } = this.props;
    if (inputProps && inputProps.value.calculated) {
      this.onType(inputProps.value.inputValue);
    }
  }

  renderPopup = () => {
    const { textField, columnConfig, data } = this.props;
    const { listExpanded, inputValue } = this.state;
    const filteredOptions = data.filter(
      i => i[textField].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    );

    if (listExpanded) {
      return (
        <React.Fragment>
          <Table
            onBlur={() => {
              this.setState({ listOpen: false });
            }}
            columnConfig={columnConfig}
            data={filteredOptions}
            onSelect={this.onSelect}
          />
          {!filteredOptions.length ? (
            <div className="field__popupEmptyMessage">No items found</div>
          ) : (
            ""
          )}
        </React.Fragment>
      );
    } else {
      if (filteredOptions.length) {
        return (
          <List
            onBlur={() => {
              this.setState({ listOpen: false });
            }}
            items={filteredOptions.map(i => i[textField])}
            onSelect={this.onSelect}
          />
        );
      }
    }
    return <div className="field__popupEmptyMessage">No items found</div>;
  };

  render() {
    const {
      inputProps,
      onChange,
      onType,
      hasError,
      description,
      data,
      columnConfig,
      textField,
      ...rest
    } = this.props;
    const { listOpen, listExpanded, inputValue, selectedItem } = this.state;
    const invalidInput = inputValue !== "" && selectedItem == null;

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
        icon={"Search"}
        onChange={this.onType}
        hasError={hasError || invalidInput}
        description={invalidInput ? "Please select an item" : description}
        {...rest}
      >
        {listOpen ? (
          <FieldPopup
            isExpanded={listExpanded}
            style={{ width: listExpanded ? "200%" : "100%" }}
            onExpand={() => {
              this.setState({ listExpanded: !listExpanded });
            }}
          >
            {this.renderPopup()}
          </FieldPopup>
        ) : (
          ""
        )}
      </BaseField>
    );
  }
}

SearchField.defaultProps = {
  textField: "",
  columnConfig: [],
  data: []
};
SearchField.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasError: PropTypes.bool,
  description: PropTypes.string,

  textField: PropTypes.string.isRequired,
  columnConfig: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,

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

export default SearchField;

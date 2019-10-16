import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Tab = ({
  name,
  label,
  isSelected,
  onTabClick,
  className,
  ...attributes
}) => {
  return (
    <li {...attributes} className={className}>
      <button
        className={`tabsNav__item ${
          isSelected ? "tabsNav__item_isActive" : ""
        }`}
        type="button"
        name={name}
        onClick={onTabClick}
        tabIndex={isSelected ? -1 : 0}
      >
        {label}
      </button>
    </li>
  );
};

Tab.defaultProps = {
  className: ""
};
Tab.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onTabClick: PropTypes.func
};

export default Tab;

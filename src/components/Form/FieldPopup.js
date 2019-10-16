import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

const FieldPopup = ({
  onExpand,
  isExpanded,
  className,
  children,
  ...attributes
}) => {
  return (
    <div {...attributes} className={`field__popup ${className}`}>
      <div className="field__popupContent">{children}</div>
      {typeof onExpand === "function" ? (
        <button
          type="button"
          onClick={onExpand}
          className="field__expandButton"
        >
          <Icon icon={isExpanded ? "Collapse" : "Expand"} />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

FieldPopup.defaultProps = {
  className: ""
};
FieldPopup.propTypes = {
  onExpand: PropTypes.func,
  isExpanded: PropTypes.bool
};

export default FieldPopup;

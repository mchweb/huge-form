import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

export const Container = ({ children, className, ...attributes }) => {
  return (
    <div {...attributes} className={`container ${className}`}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  className: ""
};

export const Row = ({ children, className, ...attributes }) => {
  return (
    <div {...attributes} className={`row ${className}`}>
      {children}
    </div>
  );
};

Row.defaultProps = {
  className: ""
};

export const Col = ({ size, children, className, ...attributes }) => {
  return (
    <div {...attributes} className={`col-${size} ${className}`}>
      {children}
    </div>
  );
};

Col.defaultProps = {
  className: ""
};
Row.propTypes = {
  size: PropTypes.number
};

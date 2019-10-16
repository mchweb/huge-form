import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Button = ({ children, className, ...attributes }) => {
  return (
    <div {...attributes} className={`btn ${className}`}>
      {children}
    </div>
  );
};

Button.defaultProps = {
  className: ""
};

Button.propTypes = {};

export default Button;

import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Button = ({
  type,
  className,
  primary,
  fluid,
  onClick,
  children,
  ...attributes
}) => {
  return (
    <button
      {...attributes}
      type={type || "button"}
      className={`btn ${className}
        ${primary ? "btn_primary" : ""} 
        ${fluid ? "btn_fluid" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: ""
};
Button.propTypes = {
  type: PropTypes.string,
  primary: PropTypes.bool,
  fluid: PropTypes.bool,
  onClick: PropTypes.func
};
export default Button;

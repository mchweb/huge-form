import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Link = ({ href, onClick, className, children, ...attributes }) => {
  return (
    <a
      {...attributes}
      href={href ? href : "#"}
      className={`link ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

Link.defaultProps = {
  className: ""
};
Link.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func
};

export default Link;

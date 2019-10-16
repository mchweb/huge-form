import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import ICON_LIST from "./icons";

const Icon = ({ icon, className, ...attributes }) => {
  if (icon) {
    return (
      <i {...attributes} className={`icon ${className}`}>
        {icon in ICON_LIST ? ICON_LIST[icon] : icon}
      </i>
    );
  } else return <React.Fragment />;
};

Icon.defaultProps = {
  className: ""
};
Icon.propTypes = {
  icon: PropTypes.string
};

export default Icon;

import React from "react";
import "./index.scss";

const NavPanelFooter = ({ children, className, ...attributes }) => {
  return (
    <div {...attributes} className={`navPanel__footer ${className}`}>
      {children}
    </div>
  );
};

NavPanelFooter.defaultProps = {
  className: ""
};

class NavPanel extends React.Component {
  static Footer = NavPanelFooter;
  render() {
    const { children, className, ...attributes } = this.props;
    return (
      <div {...attributes} className={`navPanel ${className}`}>
        {children}
      </div>
    );
  }
}

NavPanel.defaultProps = {
  className: ""
};

export default NavPanel;

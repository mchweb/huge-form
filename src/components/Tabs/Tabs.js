import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import Tab from "./Tab";

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: this.props.defaultTab };
  }
  render() {
    const {
      defaultTab,
      onChange,
      children,
      className,

      ...attributes
    } = this.props;
    const { activeTab } = this.state;
    return (
      <div {...attributes} className={`tabs ${className}`}>
        <div className="tabsNav">
          <div className="tabs__shadow"></div>
          <ul className="tabsNav__list">
            {children.map(child => (
              <Tab
                key={child.props.name}
                label={child.props.label}
                name={child.props.name}
                isSelected={child.props.name === activeTab}
                onTabClick={() => {
                  this.setState({ activeTab: child.props.name });
                  if (typeof onChange === "function") {
                    onChange(child.props.name);
                  }
                }}
              />
            ))}
          </ul>
        </div>
        <div className="tabs__wrapper">
          <div className="tabs__content">
            {children.map(child => {
              if (child.props.name !== activeTab) return undefined;
              return child.props.children;
            })}
          </div>
        </div>
      </div>
    );
  }
}

Tabs.defaultProps = {
  className: ""
};
Tabs.propTypes = {
  defaultTab: PropTypes.string,
  onChange: PropTypes.func
};

export default Tabs;

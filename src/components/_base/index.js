import "./index.scss";
import React from "react";

const rootClass = "hugeForm";

class BasePanel extends React.Component {
  componentDidMount() {
    this.updateTheme(this.props.theme ? this.props.theme : "default");
  }
  updateTheme = (next, prev) => {
    if (prev) document.body.classList.remove(`theme-${prev}`);
    if (next) document.body.classList.add(`theme-${next}`);
  };
  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      this.updateTheme(this.props.theme, prevProps.theme);
    }
  }
  render() {
    const { className, ...attributes } = this.props;
    return (
      <div className={`${rootClass} ${className}`} {...attributes}>
        {this.props.children}
      </div>
    );
  }
}

BasePanel.defaultProps = {
  className: ""
};

export default BasePanel;

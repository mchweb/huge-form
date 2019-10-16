import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import Icon from "../Icon";

const ActionButton = ({ icon, isSecondary, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`card__action ${isSecondary ? "card__action_secondary" : ""}`}
    >
      <Icon icon={icon} />
    </button>
  );
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false, isActive: false };
  }

  onActivate = () => {
    if (!this.state.isActive) {
      this.setState({ isExpanded: true, isActive: true });
      if (typeof this.props.onActivate === "function") this.props.onActivate();
    } else {
      this.setState({ isExpanded: !this.state.isExpanded });
    }
  };

  onReset = () => {
    this.setState({ isExpanded: false, isActive: false });
    if (typeof this.props.onReset === "function") this.props.onReset();
  };

  renderActions = (isExpanded, isActive) => (
    <React.Fragment>
      <ActionButton
        key="open"
        icon={isExpanded ? "Remove" : "Add"}
        onClick={this.onActivate}
      />
      {isActive ? (
        <ActionButton
          key="reset"
          icon="ChevronLeftMed"
          isSecondary
          onClick={this.onReset}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );

  render() {
    const {
      title,
      expandable,
      onActivate,
      onReset,
      className,
      children,
      ...attributes
    } = this.props;
    const { isExpanded, isActive } = this.state;
    return (
      <div
        {...attributes}
        className={`card ${className}
          ${expandable ? "card_expandable" : ""} 
          ${isExpanded ? "card_isExpanded" : ""}
          ${isActive ? "card_isActive" : ""}`}
      >
        <div className="card__header">
          {expandable ? this.renderActions(isExpanded, isActive) : ""}
          <h2 className="card__title">{title}</h2>
        </div>
        {!expandable || isExpanded ? (
          <div className="card__content">{children}</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

Card.defaultProps = {
  className: ""
};
Card.propTypes = {
  title: PropTypes.string,
  expandable: PropTypes.bool,
  onActivate: PropTypes.func,
  onReset: PropTypes.func
};

export default Card;

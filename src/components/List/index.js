import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const List = ({ items, onSelect, className, ...attributes }) => {
  return (
    <ul {...attributes} className={`list ${className}`}>
      {items
        ? items.map((item, index) => (
            <li
              key={index}
              className={`list__item`}
              onClick={() => {
                if (typeof onSelect === "function") onSelect(item);
              }}
            >
              {item}
            </li>
          ))
        : ""}
    </ul>
  );
};

List.defaultProps = {
  className: ""
};
List.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

export default List;

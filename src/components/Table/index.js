import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Table = ({ columnConfig, data, onSelect, className, ...attributes }) => {
  return (
    <div {...attributes} className={`dataTable ${className}`}>
      <div className="dataTable__row dataTable__header">
        {columnConfig.map((item, index) => (
          <div
            key={index}
            className="dataTable__cell"
            style={{ width: item.width }}
          >
            {item.name}
          </div>
        ))}
      </div>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="dataTable__row"
          onClick={() => {
            if (typeof onSelect === "function") onSelect(row);
          }}
        >
          {columnConfig.map((col, colIndex) => (
            <div
              key={colIndex}
              className="dataTable__cell"
              style={{ width: col.width }}
            >
              {row[col.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Table.defaultProps = {
  className: ""
};
Table.propTypes = {
  columnConfig: PropTypes.array.isRequired,
  data: PropTypes.array,
  onSelect: PropTypes.func
};

export default Table;

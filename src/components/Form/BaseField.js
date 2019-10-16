import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import "./index.scss";

const BaseField = ({
  label,
  prefix,
  icon,
  required,
  disabled,
  hasWarning,
  hasError,
  description,
  isBusy,

  onChange,
  onBlur,
  onFocus,
  onIconClick,

  inputProps,

  className,
  children,
  ...attributes
}) => {
  return (
    <div
      {...attributes}
      className={`field field_inline ${className}
        ${hasError ? "field_hasError" : ""} 
        ${!hasError && hasWarning ? "field_hasWarning" : ""}
        ${isBusy ? "field_isBusy" : ""}
        ${disabled ? "field_disabled" : ""}
      `}
    >
      <div className="field__label">
        <label>
          {label}
          {required ? <span className="field__requiredMark">&nbsp;*</span> : ""}
        </label>
      </div>
      <div className="field__group">
        <div className="input">
          {prefix ? <div className="input__prefix">{prefix}</div> : ""}
          <input
            autoComplete="nope"
            {...inputProps}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className="input__control"
            onChange={e => {
              if (typeof onChange === "function") onChange(e.target.value);
            }}
            onBlur={e => {
              if (typeof onBlur === "function") onBlur(e);
            }}
            onFocus={e => {
              if (typeof onFocus === "function") onFocus(e);
            }}
          />
          {isBusy || icon ? (
            <button
              type="button"
              className="input__icon"
              tabIndex={
                disabled || isBusy || typeof onIconClick !== "function" ? -1 : 0
              }
              onClick={
                icon && typeof onIconClick === "function" ? onIconClick : null
              }
            >
              <Icon icon={isBusy ? "Spinner" : icon} />
            </button>
          ) : (
            ""
          )}
        </div>
        {children}
        {hasWarning || hasError ? (
          <div className="field__description">
            {hasWarning && !hasError ? (
              <span className="field__descriptionIcon">
                <Icon icon="Asterisk" />
                &nbsp;
              </span>
            ) : (
              ""
            )}
            {description}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

BaseField.defaultProps = {
  className: ""
};
BaseField.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.string,
  icon: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasError: PropTypes.bool,
  description: PropTypes.string,
  isBusy: PropTypes.bool,

  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onIconClick: PropTypes.func,

  inputProps: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  })
};

export default BaseField;

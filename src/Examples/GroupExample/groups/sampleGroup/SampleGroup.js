import React from "react";
import FIELDS from "./_fields";
import { FieldPrefix, PrefixedField } from "../../../../helpers/PrefixedField";

const SampleGroup = ({ prefix }) => {
  return (
    <FieldPrefix prefix={prefix}>
      <h3>Sample Group with prefix = {prefix}</h3>
      <PrefixedField
        key={FIELDS.SOME_FIELD}
        name={FIELDS.SOME_FIELD}
        component="input"
      >
        {({ input, meta }) => (
          <div>
            <label>First Name</label>
            <br />
            <input {...input} />
            {meta.data.warning && (
              <span style={{ color: "#d29200" }}>{meta.data.warning}</span>
            )}
            {meta.touched && meta.error && (
              <span style={{ color: "red" }}>{meta.error}</span>
            )}
          </div>
        )}
      </PrefixedField>
      <PrefixedField
        key={FIELDS.ANOTHER_FIELD}
        name={FIELDS.ANOTHER_FIELD}
        component="input"
      >
        {({ input, meta }) => (
          <div>
            <label>Second Name</label>
            <br />
            <input {...input} />
            {meta.data.warning && (
              <span style={{ color: "#d29200" }}>{meta.data.warning}</span>
            )}
            {meta.touched && meta.error && (
              <span style={{ color: "red" }}>{meta.error}</span>
            )}
          </div>
        )}
      </PrefixedField>
    </FieldPrefix>
  );
};

export default SampleGroup;

import React from "react";
import { Form, FormSpy } from "react-final-form";
import setFieldData from "final-form-set-field-data";
import SampleGroup from "./groups/sampleGroup";
import onSubmit from "./submit";

const WarningEngine = ({ mutators: { setFieldData } }) => (
  <FormSpy
    subscription={{ values: true }}
    onChange={({ values }) => {
      // call warning generation function for each group
      SampleGroup.generateWarnings({ values, setFieldData });
    }}
  />
);

const validate = values => {
  // combine error object from validate function from each group
  return { ...SampleGroup.validate(values) };
};

class GroupExample extends React.Component {
  render() {
    return (
      <Form
        initialValues={{}}
        onSubmit={onSubmit}
        validate={validate}
        // array of calculate functions from each group
        decorators={[SampleGroup.calculations]}
        mutators={{ setFieldData }}
        render={({ handleSubmit, form: { mutators }, submitting, values }) => (
          <form onSubmit={handleSubmit} style={{ margin: 20 }}>
            <SampleGroup.FieldList prefix="one" />
            <br />
            <SampleGroup.FieldList prefix="two" />
            <br />
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
            <WarningEngine mutators={mutators} />
          </form>
        )}
      />
    );
  }
}

export default GroupExample;

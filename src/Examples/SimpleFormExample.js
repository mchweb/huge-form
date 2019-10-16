import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-calculate";
import setFieldData from "final-form-set-field-data";
import { parseNumber } from "../utlis/parseUtils";

const WarningEngine = ({ mutators: { setFieldData } }) => (
  <FormSpy
    subscription={{ values: true }}
    onChange={({ values }) => {
      setFieldData("secondName", {
        warning:
          values.secondName &&
          values.firstName &&
          parseInt(values.secondName) - 10 == values.firstName
            ? "This value has been calculated automatically"
            : null
      });
    }}
  />
);

const calculator = createDecorator({
  field: "firstName",
  updates: {
    secondName: (firstNameValue, values) => {
      if (!values.firstName) {
        return values.secondName;
      }
      return parseInt(firstNameValue) + 10;
    }
  }
});

const validate = values => {
  const errors = {};
  if (!values.firstName) errors.firstName = "Please fill in this field";
  return errors;
};

const App = () => {
  return (
    <Form
      initialValues={{}}
      onSubmit={values => {
        console.log(values);
      }}
      validate={validate}
      decorators={[calculator]}
      mutators={{ setFieldData }}
      render={({
        handleSubmit,
        reset,
        form: { mutators },
        submitting,
        pristine,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          autoComplete="nope"
          style={{ margin: 30 }}
        >
          <Field name="firstName" parse={parseNumber}>
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
          </Field>
          <br />
          <Field name="secondName" parse={parseNumber}>
            {({ input, meta }) => (
              <div>
                <label>Second Name</label>
                <br />
                <input {...input} />
                {meta.data.warning && (
                  <span style={{ color: "#ea4300" }}>{meta.data.warning}</span>
                )}
                {meta.touched && meta.error && (
                  <span style={{ color: "red" }}>{meta.error}</span>
                )}
              </div>
            )}
          </Field>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
          <WarningEngine mutators={mutators} />
        </form>
      )}
    />
  );
};

export default App;

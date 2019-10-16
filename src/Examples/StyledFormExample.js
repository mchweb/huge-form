import React from "react";

import createDecorator from "final-form-calculate";
import setFieldData from "final-form-set-field-data";

import Base from "../components/_base";
import Card from "../components/Card";
import { Container, Row, Col } from "../components/Grid";
import {
  TextFieldAdapter,
  DropdownFieldAdapter,
  DateFieldAdapter,
  SearchFieldAdapter
} from "../components/FormAdapters";
import { Form, Field, FormSpy } from "react-final-form";
import NavPanel from "../components/NavPanel";
import Link from "../components/Link";
import Button from "../components/Button";

import { list, columnConfig, data } from "./sampleData";

const WarningEngine = ({ mutators: { setFieldData } }) => (
  <FormSpy
    subscription={{ values: true }}
    onChange={({ values }) => {
      setFieldData("secondName", {
        warning:
          values.secondName &&
          values.secondName.inputValue &&
          values.secondName.calculated
            ? "This value has been calculated automatically"
            : null
      });
    }}
  />
);

const calculator = createDecorator(
  {
    field: "firstName",
    updates: {
      secondName: (firstNameValue, values) => {
        const newValue = {
          inputValue: parseInt(firstNameValue.inputValue) + 10,
          calculated: true,
          disabled: true
        };
        if (!values.firstName || values.firstName.inputValue === "") {
          return {};
        }
        if (
          !values.secondName ||
          values.secondName.inputValue === "" ||
          values.secondName.calculated
        ) {
          return newValue;
        }
        return values.secondName;
      },
      list: (firstNameValue, values) => {
        if (values.firstName && values.firstName.inputValue === "123") {
          return { inputValue: "Invalid Input", calculated: true };
        }
      },
      date: (firstName, values) => {
        if (values.firstName && values.firstName.inputValue === "111") {
          return { fieldValue: new Date(), calculated: true };
        }
      }
    }
  },
  {
    field: "list",
    updates: {
      lookup: (listValue, values) => {
        if (values.list && values.list.inputValue === "Leanne Graham") {
          return { inputValue: "010-692-6593 x09125", calculated: true };
        }
      }
    }
  }
);

const validate = values => {
  const errors = {};
  if (!values.firstName || values.firstName.inputValue === "")
    errors.firstName = "Please fill in this field";
  return errors;
};

const App = () => {
  return (
    <Base>
      <Container>
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
            <form onSubmit={handleSubmit} autoComplete="nope">
              <Row>
                <Col size={2}>
                  <NavPanel>
                    <Card title="Navigation">
                      <Link>Link 1</Link>
                      <Link>Link 2</Link>
                      <NavPanel.Footer>
                        <Button fluid>Validate</Button>
                        <Button primary fluid type="submit">
                          Submit
                        </Button>
                      </NavPanel.Footer>
                    </Card>
                  </NavPanel>
                </Col>
                <Col size={5}>
                  <Card title="Form Group">
                    <Field
                      name="firstName"
                      prefix="%"
                      required
                      label="First Name"
                      inputProps={{ maxLength: 3 }}
                      component={TextFieldAdapter}
                    />
                    <Field
                      name="secondName"
                      label="Second Name"
                      component={TextFieldAdapter}
                    />
                    <Field
                      name="list"
                      label="Dropdown"
                      component={DropdownFieldAdapter}
                      options={list}
                    />
                    <Field
                      name="date"
                      label="Date"
                      component={DateFieldAdapter}
                    />
                    <Field
                      name="lookup"
                      label="Lookup"
                      component={SearchFieldAdapter}
                      textField={"phone"}
                      data={data}
                      columnConfig={columnConfig}
                    />
                    <WarningEngine mutators={mutators} />
                  </Card>
                </Col>
                <Col size={5}>
                  <Card title="Values">
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                  </Card>
                </Col>
              </Row>
            </form>
          )}
        />
      </Container>
    </Base>
  );
};

export default App;

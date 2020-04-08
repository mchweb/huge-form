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
  SearchFieldAdapter,
} from "../components/FormAdapters";
import { Form, Field, FormSpy } from "react-final-form";
import NavPanel from "../components/NavPanel";
import Link from "../components/Link";
import Button from "../components/Button";

import {
  list,
  columnConfig,
  columnConfig_1,
  columnConfig_2,
  columnConfig_3,
  columnConfig_4,
  data,
  data_1,
  data_2,
  data_3,
  data_4,
} from "./sampleData";

const WarningEngine = ({ mutators: { setFieldData } }) => (
  <FormSpy
    subscription={{ values: true }}
    onChange={({ values }) => {
      setFieldData("lookup2", {
        warning:
          values.lookup2 &&
          values.lookup2.inputValue &&
          values.lookup2.calculated
            ? "This value has been calculated automatically"
            : null,
      });
    }}
  />
);

const calculator = createDecorator(
  {
    field: "lookup1",
    updates: {
      lookup2: (values, allValues) => {
        const inputVal =
          values && values.fieldValue && values.inputValue !== ""
            ? values.fieldValue.username
            : "";
        return {
          inputValue: inputVal,
          calculated: true,
        };
      },
      lookup3: (values, allValues) => {
        if (!allValues.lookup1 || allValues.lookup1.inputValue === "") {
          return { inputValue: "", calculated: true };
        }
        const newValue = {
          inputValue: values.fieldValue ? values.fieldValue.name : "",
          calculated: true,
        };
        return newValue;
      },
    },
  },
  {
    field: "lookup4",
    updates: {
      list: (inputValue, allValues) => {
        if (!inputValue || inputValue.inputValue === "") {
          return {};
        }
        const newValue = {
          inputValue: "",
          calculated: true,
          required: true,
        };
        return newValue;
      },
      date: (inputValue, allValues) => {
        if (
          !inputValue ||
          !inputValue.fieldValue ||
          !inputValue.fieldValue.date
        ) {
          return {};
        }
        const inputDate = new Date(inputValue.fieldValue.date);
        if (inputDate) {
          return { fieldValue: inputDate, calculated: true };
        } else {
          return {};
        }
      },
    },
  },
  {
    field: "list2",
    updates: {
      lookup5: (values, allValues) => {
        if (!values || values.inputValue === "") {
          console.log("empty value, use default data");
          return {};
        }
        if (values.inputValue === "Set1") {
          console.log("use data_2");
          return {
            data: data_2,
            columnConfig: columnConfig_2,
            textField: "username",
            calculated: true,
          };
        }
        if (values.inputValue === "Set2") {
          console.log("use data 3");
          return {
            data: data_3,
            columnConfig: columnConfig_3,
            textField: "email",
            calculated: true,
          };
        }

        console.log("use default data");
        return {};
      },
    },
  }
);

const validate = (values) => {
  const errors = {};
  if (!values.lookup1 || values.lookup1.inputValue === "")
    errors.lookup1 = "Please fill in this field";
  return errors;
};

const App = () => {
  return (
    <Base>
      <Container>
        <Form
          initialValues={{}}
          onSubmit={(values) => {
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
            values,
          }) => (
            <form onSubmit={handleSubmit} autoComplete="nope">
              <Row>
                <Col size={4}>
                  <Card title="Group1">
                    <Field
                      name="lookup1"
                      label="Lookup_1"
                      component={SearchFieldAdapter}
                      textField={"name"}
                      data={data_1}
                      columnConfig={columnConfig_1}
                    />
                    <Field
                      name="lookup2"
                      label="Lookup_2"
                      component={SearchFieldAdapter}
                      textField={"username"}
                      data={data_2}
                      columnConfig={columnConfig_2}
                    />
                    <Field
                      name="lookup3"
                      label="Lookup_3"
                      component={SearchFieldAdapter}
                      textField={"name"}
                      data={data_3}
                      columnConfig={columnConfig_3}
                    />
                    <WarningEngine mutators={mutators} />
                  </Card>
                </Col>
                <Col size={4}>
                  <Card title="Group2">
                    <Field
                      name="lookup4"
                      label="Lookup_4"
                      component={SearchFieldAdapter}
                      textField={"name"}
                      data={data_4}
                      columnConfig={columnConfig_4}
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
                  </Card>
                </Col>
                <Col size={4}>
                  <Card title="Group3">
                    <Field
                      name="list2"
                      label="Dropdown set"
                      component={DropdownFieldAdapter}
                      options={["Set1", "Set2"]}
                    />
                    <Field
                      name="lookup5"
                      label="Lookup_5"
                      component={SearchFieldAdapter}
                      textField={""}
                      data={[]}
                      columnConfig={columnConfig}
                    />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col size={9}>
                  <Card title="Values">
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                  </Card>
                </Col>
                <Col size={1}>
                  <Button primary fluid type="submit">
                    Submit
                  </Button>
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

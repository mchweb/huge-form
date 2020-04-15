import React from "react";
import { Container, Row, Col } from "../components/Grid";
import { Form, Field } from "react-final-form";
import { list, columnConfig, data } from "../Examples/sampleData";
import {
  SearchFieldAdapter,
  DropdownFieldAdapter,
} from "../components/FormAdapters";
import createDecorator from "final-form-calculate";
import Card from "../components/Card";
import Base from "../components/_base";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500);
  window.alert(JSON.stringify(values, undefined, 2));
};

const secondaryFieldsModificator = createDecorator({
  field: "lookup",
  updates: {
    list: (listValue, values) => {
      if (!!values.lookup.inputValue && !values.lookup.fieldValue) {
        return { required: false };
      }
      if (!!values.lookup.inputValue && !!values.lookup.fieldValue) {
        return { inputValue: "", calculated: true };
      }
    },
    date: (dateValue, values) => {
      if (!!values.lookup.fieldValue) {
        return values.lookup.fieldValue.email;
      }
    },
  },
});

const App = () => {
  return (
    <Base>
      <Container>
        <Form
          initialValues={{}}
          onSubmit={showResults}
          decorators={[secondaryFieldsModificator]}
          validate={(values) => {}}
          render={({ handleSubmit, reset, values }) => (
            <form autoComplete="nope">
              <Row>
                <Col size={4}>
                  <Card title="Users Table">
                    <Field
                      name="lookup"
                      label="Lookup"
                      component={SearchFieldAdapter}
                      textField={"name"}
                      data={data}
                      columnConfig={columnConfig}
                      autoComplete="off"
                    />
                  </Card>
                </Col>
                <Col size={3}>
                  <Card title="DropDown Field">
                    <Field
                      name="list"
                      label="Dropdown"
                      component={DropdownFieldAdapter}
                      options={list}
                      required={
                        !!values.lookup && !!values.lookup.fieldValue
                          ? true
                          : false
                      }
                    />
                  </Card>
                  <Card title="Col2 date">
                    <Field name="date" label="Email" component="input" />
                  </Card>
                </Col>
                <Col size={4}>
                  <Card title="values">
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                  </Card>
                </Col>
              </Row>
            </form>
          )}
        ></Form>
      </Container>
    </Base>
  );
};

export default App;

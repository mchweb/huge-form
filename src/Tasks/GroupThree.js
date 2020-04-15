import React from "react";
import { Container, Row, Col } from "../components/Grid";
import { Form, Field } from "react-final-form";
import { list, columnConfig, data, data2 } from "../Examples/sampleData";
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

const dependOnSet = (values) => {
  console.log("values", values);
  if (!!values.list && values.list.inputValue === "Set1") {
    return (
      <Field
        name="lookup"
        label="Lookup"
        component={SearchFieldAdapter}
        textField={"name"}
        data={data}
        columnConfig={columnConfig}
      />
    );
  } else if (!!values.list && values.list.inputValue === "Set2") {
    return (
      <Field
        name="lookup"
        label="Lookup"
        component={SearchFieldAdapter}
        textField={"name"}
        data={data2}
        columnConfig={columnConfig}
      />
    );
  }
  return (
    <Field
      name="lookup"
      label="Lookup"
      component={SearchFieldAdapter}
      textField={"name"}
      data={data}
      columnConfig={columnConfig}
    />
  );
};

const App = () => {
  return (
    <Base>
      <Container>
        <Form
          onSubmit={showResults}
          validate={(values) => {}}
          render={({ handleSubmit, reset, values }) => (
            <form autoComplete="nope">
              <Row>
                <Col size={4}>
                  <Card title="DropDown Field">
                    <Field
                      name="list"
                      label="Dropdown"
                      component={DropdownFieldAdapter}
                      options={["Set1", "Set2"]}
                    />
                  </Card>
                </Col>
                <Col size={3}>
                  <Card title="Users Table">{dependOnSet(values)}</Card>
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

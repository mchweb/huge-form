import React from "react";

import { Container, Row, Col } from "../components/Grid";
import { list, columnConfig, data } from "../Examples/sampleData";
import { SearchFieldAdapter } from "../components/FormAdapters";
import { Form, Field } from "react-final-form";
import createDecorator from "final-form-calculate";
import NavPanel from "../components/NavPanel";
import Card from "../components/Card";
import Base from "../components/_base";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500);
  window.alert(JSON.stringify(values, undefined, 2));
};

const fieldsAutoFill = createDecorator({
  field: "lookup",
  updates: {
    username: (userNameValue, values) => {
      if (!values.lookup || values.lookup.inputValue === "") {
        return {};
      }

      return userNameValue;
    },
    usernickname: (userNickNameValue, values) => {
      if (!values.lookup || values.lookup.inputValue === "") {
        return {};
      }
      return {
        ...userNickNameValue,
        inputValue:
          values.lookup.fieldValue && values.lookup.fieldValue.username,
      };
    },
  },
});

const App = () => {
  return (
    <Base>
      <Container>
        <Form
          onSubmit={showResults}
          decorators={[fieldsAutoFill]}
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
                      readOnly
                    />
                  </Card>
                </Col>
                <Col size={4}>
                  <Card title="Selected User Data">
                    <label>User Name</label>
                    <Field
                      name="username"
                      component={SearchFieldAdapter}
                      placeholder="User Name"
                      inputProps={{ maxLength: 2 }}
                    />
                    <label>User Nickname</label>
                    <Field
                      name="usernickname"
                      component={SearchFieldAdapter}
                      placeholder="User Nickname"
                      inputProps={{ maxLength: 2 }}
                    />
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

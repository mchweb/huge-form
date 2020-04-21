import React from "react";

import { Container, Row, Col } from "../components/Grid";
import {
  columnConfig_t1_1,
  columnConfig_t1_2,
  columnConfig_t1_3,
  data_t1_1,
  data_t1_2,
  data_t1_3,
} from "../Examples/sampleData";
import { SearchFieldAdapter } from "../components/FormAdapters";
import { Form, Field, FormSpy } from "react-final-form";
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
      if (
          !!userNameValue &&
          !!userNameValue.fieldValue &&
          !!userNameValue.inputValue !== ""
      ) {
        return { inputValue: userNameValue.fieldValue.name, calculated: true };
      }
    },
    usernickname: (userNickNameValue, values) => {
      if (
          !!userNickNameValue &&
          !!userNickNameValue.fieldValue &&
          !!userNickNameValue.inputValue !== ""
      ) {
        return {
          inputValue: userNickNameValue.fieldValue.username,
          calculated: true,
        };
      }
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
                              data={data_t1_1}
                              columnConfig={columnConfig_t1_1}
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
                              textField={"name"}
                              data={data_t1_2}
                              columnConfig={columnConfig_t1_2}
                          />
                          <div style={{ color: "red" }}>
                            {!!values.username &&
                            !!values.username.inputValue &&
                            !values.username.fieldValue
                                ? "Please notice User Name field filled automaticaly, please check"
                                : ""}
                          </div>
                          <label>User Nickname</label>
                          <Field
                              name="usernickname"
                              component={SearchFieldAdapter}
                              textField={"username"}
                              data={data_t1_3}
                              columnConfig={columnConfig_t1_3}
                          />
                          <div style={{ color: "red" }}>
                            {!!values.usernickname &&
                            !!values.usernickname.inputValue &&
                            !values.usernickname.fieldValue
                                ? "Please notice User Name field filled automaticaly, please check"
                                : ""}
                          </div>
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

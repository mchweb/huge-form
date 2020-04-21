import React from "react";

import { Container, Row, Col } from "../components/Grid";
import {
  columnConfig,
  columnConfig_t1_1,
  columnConfig_t1_2,
  columnConfig_t1_3,
  columnConfig_t2_1,
  data,
  data2,
  list,
  data_t1_1,
  data_t1_2,
  data_t1_3,
  data_t2_1,
} from "../Examples/sampleData";
import {
  SearchFieldAdapter,
  DropdownFieldAdapter,
  DateFieldAdapter,
} from "../components/FormAdapters";
import { Form, Field } from "react-final-form";
import createDecorator from "final-form-calculate";
import Card from "../components/Card";
import Base from "../components/_base";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500);
  window.alert(JSON.stringify(values, undefined, 2));
};

const calculations = createDecorator(
  {
    field: "lookup",
    updates: {
      username: (userNameValue, values) => {
        if (
          !!userNameValue &&
          !!userNameValue.fieldValue &&
          !!userNameValue.inputValue !== ""
        ) {
          return {
            inputValue: userNameValue.fieldValue.name,
            calculated: true,
          };
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
  },
  {
    field: "lookup2",
    updates: {
      list2: (listValue, values) => {
        if (!!values.lookup2.inputValue && !values.lookup2.fieldValue) {
          return { required: false };
        }
        if (!!values.lookup2.inputValue && !!values.lookup2.fieldValue) {
          return { inputValue: "", calculated: true };
        }
      },
      date: (dateValue, values) => {
        if (!dateValue || !dateValue.fieldValue || !dateValue.fieldValue.date) {
          return {};
        }
        const inputDate = new Date(dateValue.fieldValue.date);
        if (!!inputDate) {
          return { fieldValue: inputDate, calculated: true };
        }
      },
    },
  },
  {
    field: "list",
    updates: {
      lookup3: (lookupSet, values) => {
        if (lookupSet.inputValue === "Set1") {
          return {
            data: data,
            columnConfig: columnConfig,
            textField: "username",
            inputValue: "",
          };
        }
        if (lookupSet.inputValue === "Set2") {
          return {
            data: data2,
            textField: "phone",
            columnConfig: columnConfig,
            inputValue: "",
          };
        }
        return {};
      },
    },
  }
);

const App = () => {
  return (
    <Base>
      <Container>
        <Form
          onSubmit={showResults}
          decorators={[calculations]}
          render={({ handleSubmit, reset, values }) => (
            <form autoComplete="nope">
              <Row>
                <Col size={4}>
                  <Card title="Group 1">
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
                    <Field
                      name="username"
                      label="User Name"
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
                    <Field
                      name="usernickname"
                      label="User Nickname"
                      component={SearchFieldAdapter}
                      textField={"username"}
                      data={data_t1_3}
                      columnConfig={columnConfig_t1_3}
                    />
                    <div style={{ color: "red" }}>
                      {!!values.usernickname &&
                      !!values.usernickname.inputValue &&
                      !values.usernickname.fieldValue
                        ? "Please notice User Nickname field filled automaticaly, please check"
                        : ""}
                    </div>
                  </Card>
                </Col>
                <Col size={4}>
                  <Card title="Group 2">
                    <Field
                      name="lookup2"
                      label="Lookup"
                      component={SearchFieldAdapter}
                      textField={"name"}
                      data={data_t2_1}
                      columnConfig={columnConfig_t2_1}
                      autoComplete="off"
                    />
                    <Field
                      name="list2"
                      label="Dropdown"
                      component={DropdownFieldAdapter}
                      options={list}
                      required={
                        !!values.lookup2 && !!values.lookup2.fieldValue
                          ? true
                          : false
                      }
                    />
                    <Field
                      name="date"
                      label="Date"
                      component={DateFieldAdapter}
                    />
                  </Card>
                </Col>
                <Col size={4}>
                  <Card title="Group 3">
                    <Field
                      name="list"
                      label="Dropdown"
                      component={DropdownFieldAdapter}
                      options={["Set1", "Set2"]}
                    />
                    <Field
                      name="lookup3"
                      label="Lookup"
                      component={SearchFieldAdapter}
                      textField={""}
                      data={[]}
                      columnConfig={columnConfig}
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

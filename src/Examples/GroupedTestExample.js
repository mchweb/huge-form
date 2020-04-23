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
import { groupsColumnConfig, groups, people, peopleColumnConfig, mems, memsColumnConfig, dateListData, dldataColumnConfig, dlOptions } from "./sampleData";
import {optionsSet, setdColumnConfig} from "./sampleData";

const WarningEngine = ({ mutators: { setFieldData } }) => (
  <FormSpy
    subscription={{ values: true }}
    onChange={({ values }) => {
      setFieldData("person", {
        warning:
          values.person &&
          values.groups.inputValue &&
          values.person.calculated
            ? "This value has been calculated automatically"
            : null
      });
    }}
  />
);

const calculator = createDecorator(
  {
    field: "groups",
    updates: {
      person: (inputValue, values) => {
        if (!inputValue || !inputValue.fieldValue || inputValue.fieldValue.persongroup === "") 
          return {};
        return { inputValue: inputValue.fieldValue.persongroup, calculated: true};
      },
      mem: (inputValue, values) => {
        if (!inputValue || !inputValue.fieldValue || inputValue.fieldValue.themegroup === "") 
          return {};
        return { inputValue: inputValue.fieldValue.themegroup, calculated: true };
      }
    }
  }, 
  {
    field: "dateListData",
    updates: {
      dldate: (inputValue, values) => {
        console.log(inputValue);
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
      dloptions: (inputValue, values) => {
        if (!inputValue || !inputValue.fieldValue || inputValue.fieldValue.listval === "") 
          return {};
        
        return { inputValue: "", calculated: true, required: true};
      }
    }
  },
  {
    field: "moptions",
    updates: {
      optionsSet: (inputValue, values) => {
        if (
            !inputValue ||
            !inputValue.fieldValue
        ) {
          return {};
        }
          console.log(optionsSet[inputValue.fieldValue]);
        return {data: optionsSet[inputValue.fieldValue], calculated: true, colConfig: setdColumnConfig, textField: "col1", inputValue: ""};
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
            alert(JSON.stringify(values));
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
                <Col size={5}>
                  <Card title="Some playing with tables">
                    <Field
                      name="groups"
                      label="Theme and reciever"
                      component={SearchFieldAdapter}
                      textField={"persongroup"}
                      data={groups}
                      columnConfig={groupsColumnConfig}
                    />
                    <Field
                      name="person"
                      label="Person"
                      component={SearchFieldAdapter}
                      textField={"persongroup"}
                      data={people}
                      columnConfig={peopleColumnConfig}
                    />
                    <Field
                      name="mem"
                      label="Mem"
                      component={SearchFieldAdapter}
                      textField={"theme"}
                      data={mems}
                      columnConfig={memsColumnConfig}
                    />
                    <WarningEngine mutators={mutators} />
                  </Card>
                </Col>
                <Col size={5}>
                  <Card title="Lets play more">
                    <Field
                      name="dateListData"
                      label="Select data"
                      component={SearchFieldAdapter}
                      textField={"listval"}
                      data={dateListData}
                      columnConfig={dldataColumnConfig}
                    />
                    <Field
                      name="dloptions"
                      label="Option"
                      component={DropdownFieldAdapter}
                      options={dlOptions}
                    />
                    <Field
                      name="dldate"
                      label="Date"
                      component={DateFieldAdapter}
                    />
                    <WarningEngine mutators={mutators} />
                  </Card>
                </Col>
                <Col size={5}>
                  <Card title="Task with a star">
                  <Field
                      name="moptions"
                      label="Option"
                      component={DropdownFieldAdapter}
                      options={dlOptions}
                    />
                    <Field
                      name="optionsSet"
                      label="Option set"
                      component={SearchFieldAdapter}
                      textField={""}
                      data={[]}
                      columnConfig={[]}
                    />                    
                    <WarningEngine mutators={mutators} />
                  </Card>
                </Col>
                <Col size={5}>
                  <Card title="Show me more.....">
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col size={5}>
                    <NavPanel>
                        <Card title="Lets do something with it">
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
              </Row>
            </form>
          )}
        />
      </Container>
    </Base>
  );
};

export default App;

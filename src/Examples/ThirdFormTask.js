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

import { columnLoginConfig, columnLastNameConfig, columnConfig, data, femaledata } from "./TaskData";

//console.log(data);

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
                        : null,
            });
        }}
    />
);

const calculator = createDecorator({

    field: 'list.fieldValue',
    updates: (value, name, allValues, prevValues) => {
        //debugger;
        //console.log('Date: ', new Date(value.birthdate));
        if (value === "male")
            return { //return { fieldValue: new Date(), calculated: true };

                lookup: {
                    ...allValues.lookup,
                    columnConfig: columnConfig,
                    gridData: data,
                    textField: "id",
                    inputValue: "",
                    calculated: true
                },
            };
        else if (value === "female")
            return { //return { fieldValue: new Date(), calculated: true };
                lookup: {
                    ...allValues.lookup,
                    columnConfig: columnLoginConfig,
                    gridData: femaledata,
                    textField: "login",
                    inputValue: "",
                    calculated: true
                },
            };
    }
},
);

const validate = (values) => {
    const errors = {};
    if (!values.list || values.list.inputValue === "")
        errors.list = "Please fill in this field";
    return errors;
};

const App = () => {
    return (
        <Base>
            <Container>
                <Form
                    /*
                        initialValues={{
                            list: { inputValue: '1', calculated: true }
                        }}*/
                    onSubmit={(values) => {
                        console.log("values = ", values);
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
                                    <Col size={5}>
                                        <Card title="Form Group">
                                            <Field
                                                name="list"
                                                label="Gender"
                                                component={DropdownFieldAdapter}
                                                options={["male", "female"]}
                                            /*onChange={value => {
                                                console.log("Value = ", value);
                                            }}*/
                                            />
                                            <Field
                                                name="lookup"
                                                label="ID"
                                                component={SearchFieldAdapter}
                                                textField=""
                                                gridData={[]}
                                            // columnConfig={}
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

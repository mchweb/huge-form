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

import { columnLoginConfig, columnLastNameConfig, columnConfig, data, list } from "./TaskData";

console.log(data);

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

    field: 'lookup.fieldValue',
    updates: (value, name, allValues, prevValues) => {
        //console.log('Date: ', new Date(value.birthdate));
        console.log("allValues", allValues);
        // debugger;
        if (!value.id || value.id.inputValue === "") {
            return {};
        }
        if (value.id && value.id !== "") {
            console.log("value calc :", value.id);
            return { //return { fieldValue: new Date(), calculated: true };

                birthdate: {
                    ...allValues.birthdate,
                    // fieldValue: new Date(value.birthdate),
                    inputValue: (value.birthdate),
                    //calculated: true
                },

                list: {
                    ...allValues.list,
                    inputValue: "",
                    calculated: true,
                    required: true
                },
                /*        lookup3: {
                            ...allValues.lookup3,
                            inputValue: value.login,
                            calculated: true
                        }*/
            }
        }
        if (value.id === "") {
            console.log("value empty:", value.id);
            return { //return { fieldValue: new Date(), calculated: true };
                birthdate: {
                    ...allValues.birthdate,
                },
                list: {
                    ...allValues.list,
                },
            }
        }

        return {};
        // ...update maximum to the result of this function
        // lookup2: (id, values) => 

    }
}
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
                    initialValues={{
                        // lookup: { inputValue: '1', calculated: true }
                    }}
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
                                    <Col size={5}>
                                        <Card title="Form Group">
                                            <Field
                                                name="lookup"
                                                label="ID"
                                                component={SearchFieldAdapter}
                                                textField={"id"}
                                                gridData={data}
                                                columnConfig={columnConfig}
                                            />
                                            <Field
                                                name="list"
                                                label="Dropdown"
                                                component={DropdownFieldAdapter}
                                                options={list}
                                                textField={"prof"}
                                            //required
                                            />
                                            <Field
                                                name="birthdate"
                                                label="DateOfBirth"
                                                component={DateFieldAdapter}
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

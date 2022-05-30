import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {
    //creating error state for validation
    const [error, setError] = useState(false);

    // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();

        // checking if value of first name and last name is empty show error else take to step 2
        if (
            validator.isEmpty(values.name) ||
            validator.isEmpty(values.password) ||
            validator.isEmpty(values.email)
        ) {
            setError(true);
        } else {
            nextStep();
        }
    };

    return (
        <div>
            <Card style={{ marginTop: 100 }}>
                <Card.Body>
                    <Form onSubmit={submitFormData}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                style={{ border: error ? "2px solid red" : "" }}
                                name="name"
                                defaultValue={values.name}
                                type="text"
                                placeholder="Name..."
                                onChange={handleFormData("name")}
                            />
                            {error ? (
                                <Form.Text style={{ color: "red" }}>
                                    This is a required field
                                </Form.Text>
                            ) : (
                                ""
                            )}

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                style={{ border: error ? "2px solid red" : "" }}
                                defaultValue={values.password}
                                type="password"
                                id="password"
                                name="password"
                                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                placeholder="Password..."
                                onChange={handleFormData("password")}
                            />
                            {error ? (
                                <Form.Text style={{ color: "red" }}>
                                    This is a required field
                                </Form.Text>
                            ) : (
                                ""
                            )}

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                style={{ border: error ? "2px solid red" : "" }}
                                defaultValue={values.email}
                                type="email"
                                placeholder="Email..."
                                onChange={handleFormData("email")}
                            />
                            {error ? (
                                <Form.Text style={{ color: "red" }}>
                                    This is a required field
                                </Form.Text>
                            ) : (
                                ""
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StepOne;

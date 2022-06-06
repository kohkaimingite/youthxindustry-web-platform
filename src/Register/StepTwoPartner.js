import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepTwoPartner = ({ nextStep, handleFormData, prevStep, values }) => {
    //creating error state for validation
    const [error, setError] = useState(false);

    // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();

        // checking if value of first name and last name is empty show error else take to next step
        if (validator.isEmpty(values.email) || validator.isEmpty(values.contactNumber)) {
            setError(true);
        } else {
            nextStep();
        }
    };
    return (
        <>
            <Card style={{ marginTop: 100 }}>
                <Card.Body>
                    <Form onSubmit={submitFormData}>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                style={{ border: error ? "2px solid red" : "" }}
                                defaultValue={values.email}
                                type="email"
                                required
                                placeholder="E.g: newuser@gmail.com"
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


                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                style={{ border: error ? "2px solid red" : "" }}
                                defaultValue={values.contactNumber}
                                type="tel"
                                required
                                id="contactNumber"
                                name="contactNumber"
                                pattern="(8|9)\d{7}"
                                placeholder="8 digit number that starts with 8 or 9"
                                onChange={handleFormData("contactNumber")}
                            />
                            {error ? (
                                <Form.Text style={{ color: "red" }}>
                                    This is a required field
                                </Form.Text>
                            ) : (
                                ""
                            )}
                        </Form.Group>


                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Button variant="primary" onClick={prevStep}>
                                Previous
                            </Button>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default StepTwoPartner;

import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
  const [error, setError] = useState(false);

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

      // checking if value of first name and last name is empty show error else take to next step
      if (validator.isEmpty(values.age) || validator.isEmpty(values.gender) || validator.isEmpty(values.mobileNumber)){
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
              <Form.Label>Age</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                defaultValue={values.age}
                type="number"
                min="1"
                placeholder="Age..."
                onChange={handleFormData("age")}
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
              <Form.Label>Gender</Form.Label>
              <Form.Control
              style={{ border: error ? "2px solid red" : "" }}
                defaultValue={values.gender}
                type="text"
                placeholder="Gender..."
                onChange={handleFormData("gender")}
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
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                    style={{ border: error ? "2px solid red" : "" }}
                    defaultValue={values.mobileNumber}
                    type="tel"
                              id="mobileNumber"
                              name="mobileNumber"
                              pattern="(8|9)\d{7}"
                    placeholder="8 digit number that starts with 8 or 9"
                    onChange={handleFormData("mobileNumber")}
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

export default StepTwo;

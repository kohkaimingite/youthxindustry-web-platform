import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Axios from 'axios';

const Final = ({ values }) => {

    //destructuring the object from values
    const { name, password, age, email, gender, mobileNumber } = values;

    const register = () => {
        Axios.post("http://localhost:3001/register", {
            name: name,
            password: password,
            email: email,
            age: age,
            gender: gender,
            mobileNumber: mobileNumber
        })
    };

    return (
        <>
            <Card style={{ marginTop: 100, textAlign: "left" }}>
                <Card.Body>
                    <p>
                        <strong>Name :</strong> {name}{" "}
                    </p>

                    <p>
                        <strong>Password :</strong> {password}{" "}
                    </p>

                    <p>
                        <strong>Age :</strong> {age}{" "}
                    </p>

                    <p>
                        <strong>Email :</strong> {email}{" "}
                    </p>

                    <p>
                        <strong>Gender :</strong> {gender}{" "}
                    </p>

                    <p>
                        <strong>Mobile Number :</strong> {mobileNumber}{" "}
                    </p>
                    <button onClick={register}>Register</button>
                </Card.Body>
            </Card>
        </>
    );
};

export default Final;

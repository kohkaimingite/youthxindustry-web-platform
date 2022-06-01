import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Axios from 'axios';

const FinalPartner = ({ values }) => {

    //destructuring the object from values
    const { name, password, email, contactNumber } = values;

    const [status, setStatus] = useState('');

    const registerPartner = () => {
        Axios.post("http://localhost:3001/registerPartner", {
            name: name,
            password: password,
            email: email,
            contactNumber: contactNumber
        })
            .then(() => {
                setStatus({ type: 'success' });
            })
            .catch((error) => {
                setStatus({ type: 'error', error });
            });
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
                        <strong>Email :</strong> {email}{" "}
                    </p>


                    <p>
                        <strong>Contact Number :</strong> {contactNumber}{" "}
                    </p>

                    <p>
                        <button onClick={registerPartner}>Register</button>
                    </p>

                    <>
                        {status?.type === 'success' && <a href="/AboutUs"> Account Created! Back to Homepage?</a>}
                        {status?.type === 'error' && <p>Account creation failed</p>}
                    </>
                </Card.Body>
            </Card>
        </>
    );
};

export default FinalPartner;

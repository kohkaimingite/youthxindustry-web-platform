import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavBar from '../components/NavBar';
import Axios from 'axios';
import validator from "validator";


export default function RegisterPartner() {

    const [status, setStatus] = useState('');

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const submitFormData = (e) => {
        e.preventDefault();
        if (
            validator.isEmpty(name) ||
            validator.isEmpty(password) ||
            validator.isEmpty(email)
        ) {
            setError(true);
        } else {
            Axios.post("http://localhost:3001/registerPartner", {
                name: name,
                password: password,
                email: email,

            })
                .then(() => {
                    setStatus({ type: 'success' });
                })
                .catch((error) => {
                    setStatus({ type: 'error', error });
                });
        }
    };

    const styleDiv = {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        flexDirection: "column",
    };

    return (
        <div className="RegisterPartner">
            <NavBar />
            <h1 style={{ color: "lime" }}>Partner Register </h1>
            <div style={styleDiv}>
                <Form onSubmit={submitFormData}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="email"
                            required
                            placeholder="Email..."


                            input onChange={handleEmail}
                            value={email}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            name="name"

                            type="text"
                            required
                            placeholder="Name..."


                            input onChange={handleName}
                            value={name}
                        />


                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="password"
                            required
                            id="password"
                            name="password"
                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                            placeholder="Minumum 8 characters, 1 number and 1 letter"

                            input onChange={handlePassword}
                            value={password}

                        />

                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    <p>
                        {status?.type === 'success' && <a href="/AboutUs"> Account Created! Back to Homepage?</a>}
                        {status?.type === 'error' && <p>Account creation failed</p>}
                    </p>
                </Form>
            </div>
        </div>
    )

}
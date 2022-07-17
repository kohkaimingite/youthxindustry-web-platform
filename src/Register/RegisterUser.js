import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavBar from '../components/NavBar';
import Axios from 'axios';
import './RegisterPage.css';
import { faUser, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function RegisterUser() {

    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);


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

        Axios.post("http://localhost:3001/registerUser", {
            name: name,
            password: password,
            email: email,

        })
            .then(() => {
                setStatus("Account created!");
                setSuccess(true);
            })
            .catch((err) => {

                if (err.response.status === 409) {
                    setStatus("Email/Name taken!");
                } else {
                    setStatus("No server response!");
                }
            });
    };

    return (
        <div className="RegisterDiv">
            <NavBar />
            <>
                {success ? (
                    <section>
                        <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: "30px", color: " #66ff00" }} />
                        <h1 style={{ color: " #66ff00" }}>Account successfully created!</h1>
                        <p>
                            <a href="/Login">Sign in</a>
                        </p>
                    </section>
                ) : (
                    <section>
                        <div className="RegisterUserDiv">
                            <h1 style={{ color: "dodgerblue" }} >User Register <FontAwesomeIcon icon={faUser} /> </h1>
                            <Form onSubmit={submitFormData}>

                                <Form.Label style={{ marginRight: "170px" }}>Email</Form.Label>
                                <Form.Control
                                    style={{ width: "200px" }}
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email"
                                    input onChange={handleEmail}
                                    value={email}
                                />

                                <Form.Label style={{ marginRight: "170px" }}>Name</Form.Label>
                                <Form.Control
                                    style={{ width: "200px" }}
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Name"
                                    input onChange={handleName}
                                    value={name}
                                />

                                <Form.Label style={{ marginRight: "150px" }}>Password</Form.Label>
                                <Form.Control
                                    style={{ width: "200px" }}
                                    name="password"
                                    type="password"
                                    required
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                    placeholder="Password"
                                    autofocus required title="Minumum 8 characters, 1 number and 1 letter"
                                    input onChange={handlePassword}
                                    value={password}
                                />

                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                                <p>
                                    {status}
                                </p>
                            </Form>
                        </div>
                    </section>
                )}
            </>
        </div>
    )

}
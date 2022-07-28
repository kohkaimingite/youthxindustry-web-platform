import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavBar from '../components/NavBar';
import Axios from 'axios';
import './RegisterPage.css';
import { faUsers, faSpinner} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emailjs from '@emailjs/browser'; //Zhi Wei email to confirm partner function

export default function RegisterPartner() {

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

        //Zhi Wei email to confirm partner function
        emailjs.sendForm('service_nqak4rb', 'template_0fcbuq9', e.target, 'EOze04zGTBzzoGFXp')
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
          console.log('FAILED...', error);
      });

        Axios.post("http://localhost:3001/registerPartner", {
            name: name,
            password: password,
            email: email,

        })
            .then(() => {
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
                        <FontAwesomeIcon icon={faSpinner} style={{ fontSize: "30px", color: " #66ff00" }} />
                        <h1 style={{ color: " #66ff00" }}>Admin has been notified of your account creation</h1>
                        <p style={{fontSize: "12px"}}>*Partners are only able to access their account after account creation is confirmed by admin</p>
                        <p style={{ fontSize: "12px" }}>*You will receive an email once your account is confirmed</p>
                    </section>
                ) : (
                    <section>
                        <div className="RegisterUserDiv">
                            <h1 style={{ color: "limegreen" }} >Partner Register <FontAwesomeIcon icon={faUsers} /> </h1>
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
                                    maxlength="20"
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
                                    <p style={{color:"red"}}>
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
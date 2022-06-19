import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavBar from '../components/NavBar';
import Axios from 'axios';
import validator from "validator";


export default function UpdateOppoPartner() {

    const [status, setStatus] = useState('');

    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const [location, setLocation] = useState('');

    const [address, setAddress] = useState('');

    const [type, setType] = useState('');

    const [error, setError] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleLocation = (e) => {
        setLocation(e.target.value);
    };
    const handleAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleType = (e) => {
        setType(e.target.value);
    };

    const submitFormData = (e) => {
        e.preventDefault();
        if (
            validator.isEmpty(name) ||
            validator.isEmpty(description) ||
            validator.isEmpty(location) ||
            validator.isEmpty(address) ||
            validator.isEmpty(type) 
        ) {
            setError(true);
        } else {
            Axios.post("http://localhost:3001/addOppPartner", {
                name: name,
                description: description,
                location: location,
                address: address,
                type: type

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
        height: '70vh',
        flexDirection: "column",
    };

    return (
        <div className="AddOppoPartner">
            <NavBar />
            <h1 style={{ color: "yellow" }}>Add Opportunity</h1>
            <div style={styleDiv}>
                <Form onSubmit={submitFormData}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="text"
                            required
                            placeholder="Name..."


                            input onChange={handleName}
                            value={name}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                         
                            type="text"
                            required
                            placeholder="Description..."


                            input onChange={handleDescription}
                            value={description}
                        />


                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="text"
                            required
                            placeholder="Location..."

                            input onChange={handleLocation}
                            value={location}

                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="text"
                            required
                            placeholder="Address..."

                            input onChange={handleAddress}
                            value={address}

                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="text"
                            required
                            placeholder="Type..."

                            input onChange={handleType}
                            value={type}

                        />

                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Add 
                    </Button>
                    <p>
                        {status?.type === 'success' && <a href="/OppoPartner"> Successfully added!</a>}
                        {status?.type === 'error' && <p>Not successfully added</p>}
                    </p>
                </Form>
            </div>
        </div>
    )

}
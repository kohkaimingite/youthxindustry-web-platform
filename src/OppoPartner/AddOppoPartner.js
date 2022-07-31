import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PartnerNavBar from '../components/PartnerNavBar';
import axios from 'axios';
import validator from "validator";
import Dropdown from "react-bootstrap/Dropdown";


export default function AddOppoPartner() {

    const [status, setStatus] = useState('');

    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const [location, setLocation] = useState('Please Select a Location');

    const [address, setAddress] = useState('');

    const [type, setType] = useState('');

    const [qualification, setQualification] = useState('');

    const [pay, setPay] = useState('');

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
    const handleQualification = (e) => {
        setQualification(e.target.value);
    };
    const handlePay = (e) => {
        setPay(e.target.value);
    };


    const styleDiv = {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        flexDirection: "column",
    };

    function submit() {
        axios.post("http://localhost:3001/NewOppo", {
            name: name,
            description: description,
            location: location,
            address: address,
            type: type,
            qualification: qualification,
            pay: pay
        }).then(() => {
            console.log("Test");
            window.location = "http://localhost:3000/Company";
        });
    }

    return (
        <div className="AddOppoPartner">
            <PartnerNavBar />
            <h1 style={{ color: "green" }}>Submit Opportunity</h1>
            <div style={styleDiv}>

                    <Form.Group className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="text"
                            required
                            input onChange={handleName}
                            value={name}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={2}
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="text"
                            required
                            input onChange={handleDescription}
                            value={description}
                        />


                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <br/>
                        <select value={location} onChange={handleLocation}>
                            <option location="North">North</option>
                            <option location="South">South</option>
                            <option location="East">East</option>
                            <option location="West">West</option>
                            <option location="Central">Central</option>
                        </select>   

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="text"
                            required
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
                            input onChange={handleType}
                            value={type}

                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Qualification</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="text"
                            required
                            input onChange={handleQualification}
                            value={qualification}

                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pay</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="number"
                            required
                            input onChange={handlePay}
                            value={pay}

                        />

                    </Form.Group>


                <Button variant="primary" type="submit" onClick={submit}>Add</Button>
                    <p>
                        {status?.type === 'success' && <a href="/OppoPartner"> Successfully added!</a>}
                        {status?.type === 'error' && <p>Not successfully added</p>}
                    </p>
            </div>
        </div>
    )

}
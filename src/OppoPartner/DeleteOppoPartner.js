import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavBar from '../components/NavBar';
import Axios from 'axios';
import validator from "validator";


export default function DeleteOppoPartner() {

    const [status, setStatus] = useState('');

    const [oppId, setOppId] = useState('');

    const [error, setError] = useState(false);

    const handleOppId = (e) => {
        setOppId(e.target.value);
    };

    
    const submitFormData = (e) => {
        e.preventDefault();
        if (
            validator.isEmpty(oppId) 
        ) {
            setError(true);
        } else {
            Axios.post("http://localhost:3001/deleteOppPartner", {
                oppId: oppId,
             
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
        <div className="DeleteOppoPartner">
            <NavBar />
            <h1 style={{ color: "red" }}>Delete Opportunity</h1>
            <div style={styleDiv}>
                <Form onSubmit={submitFormData}>
                    <Form.Group className="mb-3">
                        <Form.Label>Job Code</Form.Label>
                        <Form.Control
                            style={{ border: error ? "2px solid red" : "", width: "400px" }}
                            type="number"
                            required
                            placeholder="OppID..."
                            input onChange={handleOppId}
                            value={oppId}
                        />

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Delete
                    </Button>
                    <p>
                        {status?.type === 'success' && <a href="/OppoPartner"> Successfully deleted!</a>}
                        {status?.type === 'error' && <p>Not successfully deleted</p>}
                    </p>
                </Form>
            </div>
        </div>
    )

}
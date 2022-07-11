// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import AdminNavBar from '../../components/AdminNavBar';
import "../Opportunities/EditOppo.css";
import axios from 'axios';

export default function EditOppo2() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [qualification, setQualification] = useState('');
    const [pay, setPay] = useState(0);

    const editOpportunity = () => {
        axios.post("http://localhost:3001/oppoEdit", {
            Name: name,
            Description: description,
            Location: location,
            Address: address,
            Type: type,
            Qualification: qualification,
            Pay: pay,
        }).then(() => {
            console.log("Success");
        });
    };

    return (
        <div className="App">
            
            <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}}>
                <label>Name</label>
                <input type="adminInput" value={name} onChange={(event) => {setName(event.target.value)}} />

                <label>Description</label>
                <input type="adminInput" value={description}  onChange={(event) => {setDescription(event.target.value)}} />

                <label>Location</label>
                <input type="adminInput" value={location} onChange={(event) => {setLocation(event.target.value)}} />

                <label>Address</label>
                <input type="adminInput" value={address} onChange={(event) => {setAddress(event.target.value)}} />

                <label>Type</label>
                <input type="adminInput" value={type} onChange={(event) => {setType(event.target.value)}} />

                <label>Qualification</label>
                <input type="adminInput" value={qualification} onChange={(event) => {setQualification(event.target.value)}} />

                <label>Pay</label>
                <input type="adminInput" value={pay} onChange={(event) => {setPay(event.target.value)}} />

                <button onClick={editOpportunity}>Update</button>
            </form>
        </div>
    )
}
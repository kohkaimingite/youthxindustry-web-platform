// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';

const initialSate = {
    OppID: 0,
    Name: "",
    Description: "",
    Location: "",
    Address: "",
    Type: "",
    Qualification: "",
    Pay: 0
}


const EditOppo = () => {

    const [state, setState] = useState(initialSate);
    const { oppID, name, description, location, address, type, qualification, pay} = state;
   
    const handleOppID = (e) => {
        const {oppID, value} = e.target;
        setState({...state, [oppID]: value})
    }

    const handleName= (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }

    const handleDescription= (e) => {
        const {description, value} = e.target;
        setState({...state, [description]: value})
    }

    const handleLocation = (e) => {
        const {location, value} = e.target;
        setState({...state, [location]: value})
    }

    const handleAddress= (e) => {
        const {address, value} = e.target;
        setState({...state, [address]: value})
    }

    const handleType= (e) => {
        const {type, value} = e.target;
        setState({...state, [type]: value})
    }

    const handleQualification= (e) => {
        const {qualification, value} = e.target;
        setState({...state, [qualification]: value})
    }

    const handlePay = (e) => {
        const {pay, value} = e.target;
        setState({...state, [pay]: value})
    }
    
    const submitFormData = (e) => {
        e.preventDefault();
        {
            axios.post("http://localhost:3001/EditOppo", {
                oppID,
                name,
                description,
                location,
                address,
                type,
                qualification,
                pay,
            })
                .then((response) => {
                    console.log(response);
                    setState({ oppID: 0, name: "", description: "", location: "", address: "", type: "", qualification: "", pay:0})
                    console.log("Successfully updated");
                })
                .catch(() => {
                    console.log("Failed to update");
                });
        }
    };

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}>
                <label>OppID</label>
                <input type="aOppID" placeholder="Your OppID" value={oppID} onChange={handleOppID}></input>

                <label>Name</label>
                <input type="aName" placeholder="Your Name ..." value={name} onChange={handleName}></input>

                <label>Description</label>
                <input type="aDescription" placeholder="Your Description ..." value={description} onChange={handleDescription}></input>

                <label>Location</label>
                <input type="aLocation" placeholder="Your Location ..." value={location} onChange={handleLocation}></input>

                <label>Address</label>
                <input type="aAddress" placeholder="Your Address ..." value={address} onChange={handleAddress}></input>

                <label>Type</label>
                <input type="aType" placeholder="Your Type ..." value={type} onChange={handleType}></input>

                <label>Qualification</label>
                <input type="aQualification" placeholder="Your Qualification ..." value={qualification} onChange={handleQualification}></input>

                <label>Pay</label>
                <input type="aPay" placeholder="Your Pay ..." value={pay} onChange={handlePay}></input>

                <button onClick={submitFormData}>Submit</button>
                <Link to="/ViewOppo">
                    <button className="btn backButton">Go Back to View All Opportunities</button>
                </Link>
            </form>
        </div>
    )
}

export default EditOppo;
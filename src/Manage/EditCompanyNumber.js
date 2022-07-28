// JavaScript source code
import PartnerNavBar from '../components/PartnerNavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

function EditCompany() {
    const [Check, setCheck] = useState("");
    const [Bio, setBio] = useState("");
    const [EmailCheck, setEmailCheck] = useState("test");
    const [Number, setNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [NumberCheck, setNumberCheck] = useState("");
    const [CompList, setCompList] = useState([]);
    const columns = CompList[0] && Object.keys(CompList[0]);

    useEffect(() => {
        axios.get("http://localhost:3001/Company").then((response) => {

            console.log(response);
            setCompList(response.data);

        });
    },[]);

    return (
        <div className="App">
            <PartnerNavBar />
            <div className="Main">
                <h1>Edit Company Number </h1>
                <div className="AlignLeft">
                    <h3> Details: </h3>
                    <form method="post">
                        {CompList.map((val, key) => {
                            return <text align="Left">Contact Number: {val.ContactNumber}</text>;
                        })}<br />


                    </form>

                </div>

                <div className="AlignMiddle">
                    <h3> Changes: </h3>
                    <br />
                    <label>New Contact Number</label>
                    <input type="text" id="number" placeholder="Enter a Contact Number..." onChange={e => setNumber(e.target.value)}></input><br />

                </div>


            </div>

        
        
        </div>
        )
    function submit() {
        axios.post("http://localhost:3001/EditCNumber", {
            Number: parseInt(Number),
            Email: Email,
            Bio: Bio
        }).then(() => {
            console.log("Test");
            /*setCheck(response.data);*/
            window.location = "http://localhost:3000/Company";
        });

    };


}

export default EditCompany;
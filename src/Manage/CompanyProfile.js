// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';


function UserProfile() {
    const [CompList, setCompList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/Company").then((response) => {

            console.log(response);
            setCompList(response.data);

        });
    });



    return (
        <div className="App">
            <NavBar />
            <div className="main">
                <h1>Profile</h1>
                <div className="AlignLeft">
                    <h3> Details: </h3>
                    <form method="post">
                        <text align="Left">Company Name: </text><br />
                        <text align="Left">Company Email: </text><br />
                        <text align="Left">Company Contact Number: </text><br />
                        <text align="Left">Company Bio: </text><br />
                    </form>

                </div>
                <div className="AlignMiddle">
                    <form action="/action_page.php" method="post">
                        <h3>Information</h3>
                        {CompList.map((val, key) => {
                            return <text align="Left">{val.Name}</text>;
                        })}<br />
                        {CompList.map((val, key) => {
                            return <text align="Left">{val.Email}</text>;
                        })}<br />
                        {CompList.map((val, key) => {
                            return <text align="Left">{val.ContactNumber}</text>;
                        })}<br />
                        {CompList.map((val, key) => {
                            return <text align="Left">{val.UserBio}</text>;
                        })}<br />
                    </form>
                </div>
            </div>
        </div>
    )


}

    //SQL statement = "SELECT name, email, ContactNumber FROM partners WHERE PartnerID = "id";
    //SQL Update Statement ="UPDATE partners SET name = newname, email = newEmail, ContactNumber = newNumber WHERE PartnerID = "id";

export default UserProfile;
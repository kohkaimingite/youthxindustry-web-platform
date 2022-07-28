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
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
            <PartnerNavBar />
            <div class="wholeProfile">
                <titleSection>
                    <h1>Profile</h1>

                </titleSection>
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Company Name:</text><br />
                    {CompList.map((val, key) => {
                        return <h6 style={{ fontSize: "20px" }}>{val.Name}</h6>;
                    })}
                </nameSection>
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Company Email:</text><br />
                    {CompList.map((val, key) => {
                        return <h6 style={{ fontSize: "20px" }}>{val.Email}</h6>;
                    })}
                </nameSection>
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Contact Number:</text><br />
                    {CompList.map((val, key) => {
                        return <text style={{ fontSize: "20px" }}>{val.ContactNumber} </text>;
                    })}<a href="/EditCompanyNumber"> <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> </a><br />
                </nameSection>
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Bio: </text><br />
                    {CompList.map((val, key) => {
                        return <text style={{ fontSize: "20px" }}>{val.UserBio} </text>;
                    })}<a href="/EditCompanyBio"> <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> </a><br />
                </nameSection>


            </div>

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
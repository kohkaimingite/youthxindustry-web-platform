// JavaScript source code
import { Route, Link } from 'react-router-dom';
import { Component } from 'react';
import { React, useState, useEffect } from "react";
import axios from 'axios';

//import zIndex from '@mui/material/styles/zIndex';
// <button>About Us</button> 
//



const PartnerNavBar = () => {

    const [currentUserName, setCurrentUserName] = useState('');
    useEffect(() => {
        axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
                setCurrentUserName(response.data.user[0].Name);

            }
        });
    }, []);

    return (
        <header class='header' style={test}>
            <h1 style={brandName}>CYC</h1>
            <div class="containerNavBar borderYtoX">
                <a href="/Home">Home</a>
                
                <a href="/OppoPage">OppoPage</a>
                <a href="/Company">Company</a>
                <a href="/Profile">Profile</a>
                <a href="/EditCompanyNumber">Edit Company Number</a>              
                <a href="/EditCompanyBio">Edit Bio</a>
                <a href="/SubmitApplication">Submit Oppo</a>
                <p>{currentUserName}</p>
                <button onClick={logout}>Logout</button>


            </div>

        </header>

    )
}



const logout = () => {
    axios.get("http://localhost:3001/logout")
    setTimeout(function () {
        window.location.reload();
    }, 1000);
};

const brandName = {
    color: "white",

}
//position: "fixed",
//    width: "100%",
//       top: 0,
//           margin: "0  0 30px",
const test = {

    backgroundColor: '#FFD700'
}

//position: "fixed"
//,
  //  position: "sticky",
    //top: 0,
    //zIndex: 9999
export default PartnerNavBar
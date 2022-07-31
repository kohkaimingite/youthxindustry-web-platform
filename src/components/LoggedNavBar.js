// JavaScript source code
import { Route, Link } from 'react-router-dom';
import { Component } from 'react';
import { React, useState, useEffect } from "react";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import zIndex from '@mui/material/styles/zIndex';
// <button>About Us</button> 
//                <a href="/AboutUs">About Us</a><a href="/ContactUs">Contact Us</a>

const LoggedNavBar = () => {

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
                <a href="/Opportunities">Opportunities</a>
                <a href="/Favourites">Favourites</a>
                <a href="/Status">Status</a>
                <a href="/AcceptJob" >Accept Offer</a>
                <a href="/AddReview">Add Review</a>
                <a href="/ViewCompanyProfile">Companies</a>
                <a href="/Profile">{currentUserName}</a>
                <a onClick={logout}><FontAwesomeIcon icon={ faRightFromBracket}/></a>
              

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

    backgroundColor: '#FFD700',
    margin: 0,
    height:'100px'
}

//position: "fixed"
//,
  //  position: "sticky",
    //top: 0,
    //zIndex: 9999
export default LoggedNavBar
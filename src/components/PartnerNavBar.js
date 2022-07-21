// JavaScript source code
import { Route, Link } from 'react-router-dom';
import { Component } from 'react';
import { React, useState, useEffect } from "react";
import axios from 'axios';

//import zIndex from '@mui/material/styles/zIndex';
// <button>About Us</button> 
//
const PartnerNavBar = () => {
    return (
        <header class='header' style={test}>
            <h1 style={brandName}>CYC</h1>
            <div class="containerNavBar borderYtoX">
                <a href="/Home">Home</a>
                <a href="/AdminPanel">Admin Panel</a>
                <a href="/ViewUser">View User</a>
                <a href="/EditUser">Edit User</a>
                <a href="/ViewOppo">View Oppo</a>
                <a href="/EditOppo">Edit Oppo</a>
                <a href="/EditPartner">Edit Partner</a>
                <a href="/ConfirmPartner">Confirm Partner</a>
                


            </div>

        </header>

    )
}
const logout = () => {
    axios.get("http://localhost:3001/logout")
        .then((response) => {

            
        });
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
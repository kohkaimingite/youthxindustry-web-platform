// JavaScript source code
import { Route, Link } from 'react-router-dom';
import { Component } from 'react';
import { React, useState, useEffect } from "react";
import axios from 'axios';

//import zIndex from '@mui/material/styles/zIndex';
// <button>About Us</button> 
//
const LoggedNavBar = () => {
    return (
        <header class='header' style={test}>
            <h1 style={brandName}>CYC</h1>
            <div class="containerNavBar borderYtoX">
                <a href="/LoggedHome">Home</a>
                <a href="/AboutUs">About Us</a>
                <a href="/LoggedOppoPage">Opportunities</a>
                <a href="/Favourites">Favourites</a>
                <a href="/LoggedContactPage">Contact Us</a>
                <a href="/makingReview">Making Review</a>
                <a href="/Profile">Profile</a>
                <a href="/EditProfile">Edit Profile</a>
                <a onclick={logout}>Logout</a>


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
export default LoggedNavBar
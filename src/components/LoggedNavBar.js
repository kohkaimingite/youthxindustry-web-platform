// JavaScript source code
import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
// <button>About Us</button> 
//
const LoggedNavBar = () => {
    return (
        <header class='header' style={test}>
            <h1 style={brandName}>CYC</h1>
            <div class="containerNavBar borderYtoX">
                <a href="/">Home</a>
                <a href="/AboutUs">About Us</a>
                <a href="/Opportunities">Opportunities</a>
                <a href="/Favourites">Favourites</a>
                <a href="/ContactUs">Contact Us</a>
                <a href="/makingReview">Making Review</a>


            </div>

        </header>

    )
}


const brandName = {
    color: "white",

}
//position: "fixed",
//    width: "100%",
//       top: 0,
//           margin: "0  0 30px",
const test = {

    backgroundColor: '#FFD700',
    position: "sticky",
    top: 0,
    zIndex: 9999
}

//position: "fixed"

export default LoggedNavBar
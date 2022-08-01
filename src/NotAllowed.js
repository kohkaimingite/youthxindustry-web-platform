// JavaScript source code
import NavBar from './components/NavBar'
import { Route, Link } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';

function NotAllowed() {
    
    return (

        <div className="App">

            <header class='header' style={test}>
                <h1 style={brandName}>CYC</h1>
                <div class="containerNavBar borderYtoX">
                    


                </div>

            </header>

            <h1>You are not allowed on this page!!</h1>
            
            <h2>Click here to redirect to main page</h2>
            <Link to="/home"><button >Home</button> </Link>

        </div>


    );
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
export default NotAllowed;
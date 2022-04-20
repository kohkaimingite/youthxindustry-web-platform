// JavaScript source code
import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
// <button>About Us</button> 
//
const NavBar  = () => {
        return (
            <header class = 'header'>
                <h1 style={brandName}>Testing nav bar</h1>
                <Link to="/AboutUs"><button>About Us</button> </Link>
                
                <button>Opportunities</button>
                <button>Contact us</button>
                <button>Login</button>
            </header>
             
            )
}

const brandName = {
    color: "white",
    backgroundColor: 'red'
}
export default NavBar 
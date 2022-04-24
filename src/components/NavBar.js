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
                <Link to="/Opportunities"><button>Opportunities</button> </Link>
                <Link to="/ContactUs"><button>Contact us</button> </Link>
                <Link to="/Login"><button>Login</button> </Link>
                
            </header>
             
            )
}

const brandName = {
    color: "white",
    backgroundColor: 'red'
}
export default NavBar 
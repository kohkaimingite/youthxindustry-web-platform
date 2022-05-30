// JavaScript source code
import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
// <button>About Us</button> 
//
const NavBar  = () => {
        return (
            <header class = 'header'>
                <h1 style={brandName}>Testing nav bar</h1>
                
                <Link to="/AboutUs"><button class= "button aboutUsButton">About Us</button> </Link>
                        <div class="dropdown">

                        <Link to="/Opportunities"><button class= "button oppoButton">Opportunities</button> </Link>

                            <div class="dropdown-content">

                        <Link to="/Favourites"><button class="button oppoButton">Favourites</button></Link>
                            </div>

                        </div>
                
                    <Link to="/ContactUs"><button class= "button contactButton">Contact us</button> </Link>
                    <Link to="/Login"><button class= "button loginButton">Login</button> </Link>
                <Link to="/Register"><button class="button registerButton">Register</button></Link>
                <Link to="/makingReview"><button class="button registerButton">review</button></Link>
                <div class="dropdown">
                    <Link to="/Profile"><button class="button ProfileButton">Profile</button></Link>
                    <div class="dropdown-content">
                        <Link to="/EditProfile"><button class="button ProfileButton">Edit Profile</button></Link>
                        </div>
                </div>
            </header>
             
            )
}

const brandName = {
    color: "white",
    backgroundColor: 'red'
}


export default NavBar 
// JavaScript source code
import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
// <button>About Us</button> 
//
const NavBar  = () => {
        return (
            <header class='header' style={test}>
                <h1 style={brandName}>CYC</h1>
                <div class="container teal borderYtoX">
                    <a href="/AboutUs">About Us</a>
                    <a href="/Opportunities">Opportunities</a>
                    <a href="/Favourites">Favourites</a>
                    <a href="/ContactUs">Contact Us</a>
                    <a href="/Login">Login</a>
                    <a href="/Register">Register</a>
                    <a href="/makingReview">Making Review</a>
                    <a href="/Profile">Profile</a>
                    <a href="/EditProfile">Edit Profile</a>
                    

                </div>
                
            </header>
             
            )
}


const brandName = {
    color: "white",
    
}
const test = {
    
    backgroundColor: '#FFD700'
}
const styles = {
    container: {

        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    textArea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 200,
        width: 300

    }
    
};


export default NavBar 
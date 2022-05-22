import { Route, Link } from 'react-router-dom';
import logo from '../Pictures/aboutmeTEST.jpg';
import React, { Component } from 'react';
console.log(logo);
const AboutmeSet = () => {
    return (
        
        <div class="container">
            <img src={logo} alt="Snow"  />
            <h2 class="centered">About us description</h2>
            <Link to="/AboutUs"><button class="centeredButton">About Us</button></Link>

        </div>


    )
}
//
//style={aboutus}
//
const aboutus = {
    
}
export default AboutmeSet
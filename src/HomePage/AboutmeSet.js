// JavaScript source code class='aboutmepic'
import logo from '../Pictures/aboutmeTEST.jpg';
import React, { Component } from 'react';
console.log(logo);
const AboutmeSet = () => {
    return (
        
        <div class="container">
            <img src={logo} alt="Snow"  />
            <div class="centered">Centered</div>
            <button class="centeredButton">About Us</button>

        </div>
    )
}
//
//style={aboutus}
//
const aboutus = {
    
}
export default AboutmeSet
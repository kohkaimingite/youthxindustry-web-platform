import { Route, Link } from 'react-router-dom';
import logo from '../Pictures/aboutmeTEST.jpg';
import React, { Component } from 'react';
console.log(logo);
const ContactPageSet = () => {
    return (

        <div class="container">
            <img src={logo} alt="Snow" />
            <h2 class="centered">Contact Description</h2>
            <Link to="/ContactUs"><button class="centeredButton">Conatct</button></Link>

        </div>


    )
}

export default ContactPageSet
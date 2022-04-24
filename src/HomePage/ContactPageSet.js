
import logo from '../Pictures/aboutmeTEST.jpg';
import React, { Component } from 'react';
console.log(logo);
const ContactPageSet = () => {
    return (

        <div class="container">
            <img src={logo} alt="Snow" />
            <h2 class="centered">Contact Description</h2>
            <button class="centeredButton">Conatct</button>

        </div>


    )
}

export default ContactPageSet
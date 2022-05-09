import { Route, Link } from 'react-router-dom';
import logo from '../Pictures/aboutmeTEST.jpg';
import React, { Component } from 'react';
console.log(logo);
const RegisterSet = () => {
    return (

        <div class="container">
            <img src={logo} alt="Snow" />
            <h2 class="centered">Register</h2>
            <Link to="/Register"><button class="centeredButton">Register page</button></Link>

        </div>


    )
}

export default RegisterSet
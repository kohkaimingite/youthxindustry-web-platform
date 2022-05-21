import { Route, Link } from 'react-router-dom';
import logo from '../Pictures/aboutmeTEST.jpg';
import React, { Component } from 'react';
console.log(logo);
const OppoPageSet = () => {
    return (

        <div class="container">
            <img src={logo} alt="Snow" />
            <h2 class="centered">Oppotunities Description</h2>
            <Link to="/Opportunities"><button class="centeredButton">Oppo page</button></Link>

        </div>


    )
}

export default OppoPageSet
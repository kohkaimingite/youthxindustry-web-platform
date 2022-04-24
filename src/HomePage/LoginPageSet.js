import { Route, Link } from 'react-router-dom';
import logo from '../Pictures/aboutmeTEST.jpg';
import React, { Component } from 'react';
console.log(logo);
const LoginPageSet = () => {
    return (

        <div class="container">
            <img src={logo} alt="Snow" />
            <h2 class="centered">Login Description</h2>
            <Link to="/Login"><button class="centeredButton">Login</button></Link>

        </div>


    )
}
//
//style={aboutus}
//
const aboutus = {

}
export default LoginPageSet
// JavaScript source code
import NavBar from './components/NavBar'
import { Route, Link } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';

function NotAllowed() {
    
    return (

        <div className="App">

            <NavBar />

            <h1>You are not allowed on this page!!</h1>
            
            <h2>Click here to redirect to main page</h2>
            <Link to="/home"><button >Home</button> </Link>

        </div>


    );
}

export default NotAllowed;
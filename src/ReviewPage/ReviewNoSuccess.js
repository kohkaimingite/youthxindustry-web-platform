// JavaScript source code
import NavBar from '../components/NavBar'
import LoggedNavBar from '../components/LoggedNavBar'
import { React, useState, useEffect } from "react";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');


function ReviewNoSuccess() {
    return (
        

        <div className="App">
            <LoggedNavBar />


            <div className="main">
                <h2>Your review has not been submitted successfully</h2>
                <h2>due to some errors</h2>
                <h2>Click here to redirect to main page</h2>
                <Link to="/home"><button >Home</button> </Link>
            </div>
        </div>
    )
}


export default ReviewNoSuccess;
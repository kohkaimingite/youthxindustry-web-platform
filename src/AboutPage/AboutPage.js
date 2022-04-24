// JavaScript source code
//<Router>  className="App"
//                <Route path="/Aboutus" component={AboutPage} />
//            </Router>
//<h2>Picure of logo with "about us" button</h2>
            //<AboutmeSet />
            //<h2>Picure of logo with "opportunities" button</h2>
            //<h2>Picure of logo with "contact us" button</h2>
            //<h2>Picure of logo with "login" button</h2>
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
function AboutPage() {
    return (
        <div className="App">
            <NavBar />
            <h1>ABOUT US</h1>

            <p>We are a group of students doing a prototype</p>

            <div className="category">
                <h2>Our Mission</h2>

                <h2>Our Vision</h2>

                <h2>Our Values</h2>
            </div>

        </div>
    );
}

export default AboutPage;


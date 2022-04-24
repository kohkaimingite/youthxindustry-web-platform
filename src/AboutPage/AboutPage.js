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
            <div style={{ backgroundColor: 'lightblue', width: '1920px', minHeight: '1080px' }}>
                <div style={{ padding: '10px 20px', textAlign: 'center' }}>
                    <h1>ABOUT US</h1>

                    <p>We are a group of students doing a prototype</p>
                </div>

                <div style={{padding: '10px 20px', textAlign: 'left'}}>
                    <h2>Our Mission</h2>
                </div>

                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Our Vision</h2>
                </div>

                <div style={{ padding: '10px 20px', textAlign: 'right' }}>
                    <h2>Our Values</h2>
                </div>
            </div>

        </div>
    );
}

export default AboutPage;


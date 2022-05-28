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
import AdminNavBar from '../components/AdminNavBar'
function AboutPage() {
    return (
        <div className="App">
            <NavBar />
            <AdminNavBar /> {/* admin nav bar added for testing no touchy */}
            <div style={{ backgroundColor: 'lightblue', width: '1920px', minHeight: '1080px' }}>
                <div style={{ padding: '129x 30px', textAlign: 'center' }}>
                    <h1>ABOUT US</h1>

                    <p>We are a group of students doing a prototype</p>
                </div>


                <div style={{ padding: '10px 20px', textAlign: 'left' }}>
                    <h2>Our Mission</h2>

                    <p>We are here to complete the prototype</p>
                </div>

                <div style={{ padding: '10px 20px', textAlign: 'center' }}>
                    <h2>Our Vision</h2>

                    <p>We want to make this prototype work</p>
                </div>

                <div style={{ padding: '10px 20px', textAlign: 'right' }}>
                    <h2>Our Values</h2>

                    <p>Teamwork: We are able to do more when we work together</p>
                    <p>Respect: We value everyone and treat teammates with dignity and professionalism</p>
                </div>
            </div>

        </div>
    );
}

export default AboutPage;


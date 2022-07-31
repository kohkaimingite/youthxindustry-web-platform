import NavBar from '../components/NavBar'
import LoggedNavBar from '../components/LoggedNavBar'
import LoginPageSet from './LoginPageSet'
import OppoPageSet from './OppoPageSet'
import ContactPageSet from './ContactPageSet'
import { Route, Link } from 'react-router-dom';
import '../App.css';
import React, { Component, useLayoutEffect, useState } from 'react';
import RegisterSet from './RegisterSet';
import AdminNavBar from '../components/AdminNavBar'
import AdminPanel from '../AdminPanel/AdminPanel'
import axios from 'axios';

import OppoPage from '../OppoPage/OppoPage';
import ContactPage from '../ContactPage/ContactPage';
import Login from '../LoginPage/Login';
import Register from '../Register/Register';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import PartnerNavBar from '../components/PartnerNavBar'
import Carousel from 'react-bootstrap/Carousel';
import pic1 from '../Pictures/find.jpg';
import pic2 from '../Pictures/smile.jpg';
import pic3 from '../Pictures/tgt.jpg';


// Idea:
//top will be buttons "About" - "opportunities(have sub)" - "contact us" - "login"
// below will be pictures with a text in the center and the button to the page
//EXAMPLE:
//First one will be a picture then a brief description and below the description wil be the about us button
//GRAPHIC EXAMPLE:
//"About" - "opportunities(have sub)" - "contact us" - "login"
//-------------------------------------------------------------
//|                      this is cyc                          |
//|                       About us                            |
//-------------------------------------------------------------
//|               here, we have opporunities                  |
//|                     opporunities                          |
//-------------------------------------------------------------

//mamamamadsadasadsadasda
//<switch>
//           <Route exact path="/aboutus" component={AboutPage} />
//          </switch>
//<h2 class = 'aboutmepic'>ABOUT US</h2>
function Home() {
    const [user, setUser] = useState(0);
    
/*    let heigh1t = box.style.offsetHeight;*/
    const [loading, setLoading] = useState(true)
    useLayoutEffect(() => {

        axios.get("http://localhost:3001/getCurrentUserRole").then((response) => {

            if (response !== null) {
                setLoading(false)

                return setUser(parseInt(response.data[0].RoleID));


            } else {
                setLoading(false)
                setUser(0);
            }
        });

    }, []);
    if (loading === true) {
        return <div className="App">
            <Login />

        </div>
    }
    if (user === 1) {
        return (

            <div className="App" >

                <LoggedNavBar id='navbar'/>
                <div>
                <Carousel >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={ pic1}
                                alt="First slide"
                                style={{ width: '100%', height: '750px' }}
                        />
                        <Carousel.Caption>
                            <h3>Explore opportunities!</h3>
                            <p>We provde opportunities from various categories so youre sure to find the one the suits you!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={pic2}
                                alt="Second slide"
                                style={{ width: '100%', height: '750px' }}

                        />

                        <Carousel.Caption>
                            <h3>Outsourcing for you internship!</h3>
                                <p>Finding difficulty outsouring for your internship? Fret not! We offer a wide variety of opportunities from you to choose from!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={pic3}
                                alt="Third slide"
                                style={{ width: '100%', height: '750px' }}
                                
                        />

                        <Carousel.Caption>
                                <h3>Collaboration with partners</h3>
                                <p>We work together with partners to provide you with all the opportunities you see</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
                    </div>

            </div>


        );
    } else if (user === 2) {
        return (

            <div className="App">

                <PartnerNavBar />

                <OppoPageSet />

                <ContactPageSet />

                <LoginPageSet />

                <RegisterSet />

            </div>


        );
    } else if (user === 3) {
        return (

            <div className="App">
                <AdminPanel />
            </div>


        );
    }
}

export default Home;
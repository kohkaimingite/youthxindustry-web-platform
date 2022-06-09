import NavBar from './components/NavBar'
import AboutmeSet from './HomePage/AboutmeSet'
import LoginPageSet from './HomePage/LoginPageSet'
import OppoPageSet from './HomePage/OppoPageSet'
import ContactPageSet from './HomePage/ContactPageSet'
import {Route, Link } from 'react-router-dom';
import './App.css';
import AboutPage from './AboutPage/AboutPage';
import React, { Component } from 'react';
import RegisterSet from './HomePage/RegisterSet';
import AdminNavBar from './components/AdminNavBar'
import AdminPanel from './AdminPanel/AdminPanel'

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
function App() {
  return (
      <div className="App">
          
          <NavBar />
          
          <AboutmeSet/>
          
          <OppoPageSet />
          
          <ContactPageSet />
          
          <LoginPageSet/>

          <RegisterSet/>

          <AdminNavBar/>
         
    </div>
  );
}

export default App;

//<h2>Picure of logo with "login" button</h2>
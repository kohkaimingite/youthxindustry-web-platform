import NavBar from './components/NavBar'
import AboutmeSet from './HomePage/AboutmeSet'
import LoginPageSet from './HomePage/LoginPageSet'
import OppoPageSet from './HomePage/OppoPageSet'
import ContactPageSet from './HomePage/ContactPageSet'
import './App.css';
import AboutPage from './AboutPage/AboutPage';
import React, { Component } from 'react';
import RegisterSet from './HomePage/RegisterSet';
import AdminNavBar from './components/AdminNavBar'


import Home from './HomePage/Home';
import OppoPage from './OppoPage/OppoPage';
import ContactPage from './ContactPage/ContactPage';
import Login from './LoginPage/Login';
import Register from './Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';


import EditUser from './AdminPanel/EditUser';
import Favourites from './OppoPage/Favourites';
import EditUserNumber from './Manage/EditUserNumber';
import MakingReview from './ReviewPage/MakingReview';
import ReviewSuccess from './ReviewPage/ReviewSuccess';
import ReviewNoSuccess from './ReviewPage/ReviewNoSuccess';
import RegisterUser from './Register/RegisterUser';
import EditUserBio from './Manage/EditUserBio';
import MyApplication from './Manage/MyApplication'; 
import LoggedOppoPage from './OppoPage/LoggedOppoPage';

import AdminPanel from './AdminPanel/AdminPanel';
import EditOppo from './AdminPanel/EditOppo';
import MngPartner from './AdminPanel/MngPartner';
import ProfilePage from './Manage/UserProfile';
import CompanyPage from './Manage/CompanyProfile';
import EditCompanyNumber from './Manage/EditCompanyNumber';
import CreateCompanyProfile from './CompanyProfile/CreateCompanyProfile';
import EditCompanyBio from './Manage/EditCompanyBio';
import EditUserResume from './Manage/EditUserResume';
import RegisterPartner from './Register/RegisterPartner';
import OppoPartner from './OppoPartner/OppoPartner';
import AddOppoPartner from './OppoPartner/AddOppoPartner';
import DeleteOppoPartner from './OppoPartner/DeleteOppoPartner';
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
//<NavBar />
function App() {
    
    
    return (
        <div className="App">

            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/AboutUs' element={<AboutPage />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Opportunities' element={<OppoPage />} />
                <Route path='/ContactUs' element={<ContactPage />} />


                <Route path='/Favourites' element={<Favourites />} />
                <Route path='/MakingReview' element={<MakingReview />} />
                <Route path='/ReviewSuccess' element={<ReviewSuccess />} />
                <Route path='/ReviewNoSuccess' element={<ReviewNoSuccess />} />
                <Route path='/EditUserResume' element={<EditUserResume />} />
                <Route path='/RegisterUser' element={< RegisterUser />} />
                <Route path='/EditUserBio' element={<EditUserBio />} />
                <Route path='/LoggedOppoPage' element={<LoggedOppoPage />} />
                

                <Route path='/AdminPanel' element={<AdminPanel />} />
                <Route path='/EditOppo' element={<EditOppo />} />
                <Route path='/EditUser' element={<EditUser />} />
                <Route path='/MngPartner' element={<MngPartner />} />
                <Route path='/Profile' element={<ProfilePage />} />
                <Route path='/Company' element={<CompanyPage />} />
                <Route path='/EditUserNumber' element={<EditUserNumber />} />
                <Route path='/EditCompanyNumber' element={<EditCompanyNumber />} />
                <Route path='/CreateCompanyProfile' element={<CreateCompanyProfile />} />
                <Route path='/RegisterPartner' element={< RegisterPartner />} />
                <Route path='/MyApplications' element={< MyApplication />} />
                <Route path='/OppoPartner' element={<OppoPartner />} />
                <Route path='/AddOppoPartner' element={<AddOppoPartner />} />
                <Route path='/DeleteOppoPartner' element={<DeleteOppoPartner />} />
                <Route path='/EditCompanyBio' element={<EditCompanyBio />} />
                </Routes>
        </div>
    );


}

export default App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>
        <App/>
    </Router>,
    root
);
//<h2>Picure of logo with "login" button</h2>
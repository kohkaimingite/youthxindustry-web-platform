import NavBar from './components/NavBar'
import AboutmeSet from './HomePage/AboutmeSet'
import LoginPageSet from './HomePage/LoginPageSet'
import OppoPageSet from './HomePage/OppoPageSet'
import ContactPageSet from './HomePage/ContactPageSet'
import './App.css';
import AboutPage from './AboutPage/AboutPage';
import React from 'react';
import { Component, useState, useEffect, useLayoutEffect} from 'react';
import RegisterSet from './HomePage/RegisterSet';
import AdminNavBar from './components/AdminNavBar'
import axios from 'axios';
//dsadaddsadsdadsadadsdaasasdad

import Home from './HomePage/Home';
import OppoPage from './OppoPage/OppoPage';
import ContactPage from './ContactPage/ContactPage';
import LoggedContactPage from './ContactPage/LoggedContactPage';
import Login from './LoginPage/Login';
import Register from './Register/Register';
import ReactDOM from 'react-dom/client';
import NotAllowedLog from './NotAllowedLog';
import NotAllowed from './NotAllowed';

import LoggedHome from './HomePage/LoggedHome';
import Favourites from './OppoPage/Favourites';
import EditUserNumber from './Manage/EditUserNumber';
import MakingReview from './ReviewPage/MakingReview';
import ReviewSuccess from './ReviewPage/ReviewSuccess';
import ReviewNoSuccess from './ReviewPage/ReviewNoSuccess';
import RegisterUser from './Register/RegisterUser';
import EditUserBio from './Manage/EditUserBio';
import MyApplication from './Manage/MyApplication'; 
import LoggedOppoPage from './OppoPage/LoggedOppoPage';
import ViewOppoStatus from './OppoPage/ViewOppoStatus';


import AdminPanel from './AdminPanel/AdminPanel';
import ViewUser from './AdminPanel/Users/ViewUser';
import EditUser from './AdminPanel/Users/EditUser';
import ViewOppo from './AdminPanel/Opportunities/ViewOppo';
import EditOppo from './AdminPanel/Opportunities/EditOppo';
import EditOppo2 from './AdminPanel/Opportunities/EditOppo2';
import ViewPartner from './AdminPanel/Partners/ViewPartner';
import ConfirmPartner from './AdminPanel/Partners/ConfirmPartner';
import ProfilePage from './Manage/UserProfile';
import CompanyPage from './Manage/CompanyProfile';
import EditCompanyNumber from './Manage/EditCompanyNumber';
import SearchCompanyProfile from './CompanyProfile/SearchCompanyProfile';
import ViewCompanyProfile from './CompanyProfile/ViewCompanyProfile';
import EditCompanyBio from './Manage/EditCompanyBio';
import EditUserResume from './Manage/EditUserResume';
import RegisterPartner from './Register/RegisterPartner';
import OppoPartner from './OppoPartner/OppoPartner';
import AddOppoPartner from './OppoPartner/AddOppoPartner';
import SubmitApplication from './Manage/SubmitApplication';
import RatingStats from './RatingStats/RatingStats'

import Protection from './Protection';
import { BrowserRouter as Router, Routes, Route,Link, Navigate, Outlet, } from 'react-router-dom';



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
    axios.defaults.withCredentials = true;
    const ProtectedRouteLog = ({ user, redirectPath = '/NoAccess' }) => {
        if (user!==1) {
            return <Navigate to={redirectPath} replace />;
        } 

        return <Outlet />;
    };
    const ProtectedRoutepartner = ({ user, redirectPath = '/NotAllowed' }) => {
        if (user!==2) {
            return <Navigate to={redirectPath} replace />;
        }

        return <Outlet />;
    };
    const ProtectedRouteAdmin = ({ user, redirectPath = '/NotAllowed' }) => {
        if (user!==3) {
            return <Navigate to={redirectPath} replace />;
        }

        return <Outlet />;
    };
    const ProtectedRouteHome = ({ user, redirectPath = '/NotAllowed' }) => {
        if (user !== 3 && user!==2 && user!==1) {
            return <Navigate to={redirectPath} replace />;
        }

        return <Outlet />;
    };
    const [testList, setTestList] = useState([]);
    const [user, setUser] = useState(0);
    const [testuserRole, setTestuserRole] = useState(3);
    
    //const [userTest, setUserTest] = useState(2);
    //alert(user);

    const [loading,setLoading] = useState(true)
    useLayoutEffect(() => {
        
        axios.get("http://localhost:3001/getCurrentUserRole").then((response) => {
            
            if (response !== null) {
                setLoading(false)

                return setUser(parseInt(response.data[0].RoleID));
                

            } else {
                setLoading(false)
                setUser(0);
            }
        }, (err) => {
            setLoading(false)
            setUser(0);
        });

    },[]);
    if (loading===true) {
        return <div className="App">
            <Login/>
            
        </div>
    }
    return (
        <div className="App">

            
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/NotAllowed' element={<NotAllowed />} />
                <Route path='/NoAccess' element={<NotAllowedLog />} />
                
                
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                
                <Route path='/ViewCompanyProfile' element={<SearchCompanyProfile />} />
                <Route exact path='/ViewCompanyProfile/:Name' element={<ViewCompanyProfile />} />
                <Route path='/RatingStats' element={<RatingStats />} />
              

                <Route path='/Profile' element={<ProfilePage />} />
                <Route path='/EditCompanyNumber' element={<EditCompanyNumber />} />
                <Route path='/RegisterPartner' element={< RegisterPartner />} />
                <Route path='/EditCompanyBio' element={<EditCompanyBio />} />
                <Route path='/SubmitApplication' element={<SubmitApplication />} />
                <Route path='/OppoPartner' element={<OppoPartner />} />
                <Route path='/AddOppoPartner' element={<AddOppoPartner />} />


                <Route path='/AdminPanel' element={<AdminPanel />} />
                <Route path='/ViewUser' element={<ViewUser />} />
                <Route path='/EditUser' element={<EditUser />} />
                <Route path='/ViewOppo' element={<ViewOppo />} />
                <Route path='/EditOppo' element={<EditOppo />} />
                <Route path='/EditOppo2' element={<EditOppo2 />} />
                <Route path='/ViewPartner' element={<ViewPartner />} />
                <Route path='/ConfirmPartner' element={<ConfirmPartner />} />



                <Route element={<ProtectedRouteLog user={user} />}>
                    
                    <Route path='/AboutUs' element={<AboutPage />} />
                    <Route path='/Opportunities' element={<LoggedOppoPage />} />
                    <Route path='/Favourites' element={<Favourites />} />
                    <Route path='/AddReview' element={<MakingReview />} />
                    <Route path='/ContactUs' element={<ContactPage />} />

                    <Route path='/EditUserResume' element={<EditUserResume />} />
                    <Route path='/RegisterUser' element={< RegisterUser />} />
                    <Route path='/EditUserBio' element={<EditUserBio />} />
                    <Route path='/MyApplications' element={< MyApplication />} />
                    <Route path='/EditUserNumber' element={<EditUserNumber />} />
                    <Route path='/Status' element={<ViewOppoStatus />} />

                    <Route path='/ReviewSuccess' element={<ReviewSuccess />} />
                    <Route path='/ReviewNoSuccess' element={<ReviewNoSuccess />} />
                    
                    
                </Route>

                
                
                <Route element={<ProtectedRoutepartner user={user} />}>
                
                <Route path='/OppoPage' element={<EditOppo />} />
                <Route path='/Company' element={<CompanyPage />} />
                <Route path='/Profile' element={<ProfilePage />} />
                <Route path='/EditCompanyNumber' element={<EditCompanyNumber />} />
                <Route path='/RegisterPartner' element={< RegisterPartner />} />
                <Route path='/EditCompanyBio' element={<EditCompanyBio />} />
                <Route path='/SubmitApplication' element={<SubmitApplication />} />
                </Route>

                <Route element={<ProtectedRouteHome user={user} />}>
                    <Route path='/Home' element={<LoggedHome />} />
                </Route>


                <Route element={<ProtectedRouteAdmin user={user} />}>
                    {/* <Route path='/AdminPanel' element={<AdminPanel />} />
                    <Route path='/ViewUser' element={<ViewUser />} />
                    <Route path='/EditUser' element={<EditUser />} />
                    <Route path='/ViewOppo' element={<ViewOppo />} />
                    <Route path='/EditOppo' element={<EditOppo />} />
                    <Route path='/EditOppo2' element={<EditOppo2 />} />
                    <Route path='/ViewPartner' element={<ViewPartner />} />
                    <Route path='/ConfirmPartner' element={<ConfirmPartner />} /> */}
                    

                </Route>
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
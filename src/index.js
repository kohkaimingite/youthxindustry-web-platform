import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';


import OppoPage from './OppoPage/OppoPage';
import ContactPage from './ContactPage/ContactPage';
import Login from './LoginPage/Login';
import Register from './Register/Register';
import SearchCompanyProfile from './CompanyProfile/SearchCompanyProfile';









//<Route path='/EditCompany' element={<EditCompany />} />


//ReactDOM.render(
//  <Router>
//    <Routes>
//      <Route path='/' element={<App/>}/>
//</Routes>
//</Router> ,
//document.getElementById('root')
//);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

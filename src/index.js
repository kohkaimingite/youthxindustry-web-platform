import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AboutPage from './AboutPage/AboutPage';
import OppoPage from './OppoPage/OppoPage';
import ContactPage from './ContactPage/ContactPage';
import SignInSide from './LoginPage/SignInSide';
import SignUp from './Register/SignUp';
import SubPage from './OppoPage/SubPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        
        <Router>
        <Routes>
                <Route path='/' element={<App />} />
                <Route path='/AboutUs' element={<AboutPage />} />
                <Route path='/Opportunities' element={<OppoPage />} />
                <Route path='/ContactUs' element={<ContactPage />} />
                <Route path='/Login' element={<SignInSide />} />
                <Route path='/Sub' element={<SubPage />} />
                <Route path='/Register' element={<SignUp />} />

        </Routes>
    </Router>
    </React.StrictMode>
);
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

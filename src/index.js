import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminPanel from './AdminPanel/AdminPanel';
import EditOppo from './AdminPanel/EditOppo';
import EditUser from './AdminPanel/EditUser';
import MngPartner from './AdminPanel/MngPartner';
import AboutPage from './AboutPage/AboutPage';
import OppoPage from './OppoPage/OppoPage';
import ContactPage from './ContactPage/ContactPage';
import Login from './LoginPage/Login';
import Favourites from './OppoPage/Favourites';
import OneJob from './OppoPage/OneJob';
import ProfilePage from './Manage/UserProfile';
import CompanyPage from './Manage/CompanyProfile';
import EditProfile from './Manage/EditProfile';
import MakingReview from './ReviewPage/MakingReview';
import ReviewSuccess from './ReviewPage/ReviewSuccess'; 
import ReviewNoSuccess from './ReviewPage/ReviewNoSuccess';
import EditCompany from './Manage/EditCompany';
import CreateCompanyProfile from './CompanyProfile/CreateCompanyProfile';
import Register from './Register/Register';
import RegisterUser from './Register/RegisterUser';
import RegisterPartner from './Register/RegisterPartner';
import MyApplication from './Manage/MyApplication';
import OppoPartner from './OppoPartner/OppoPartner';
import AddOppoPartner from './OppoPartner/AddOppoPartner';
import DeleteOppoPartner from './OppoPartner/DeleteOppoPartner';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        
        <Router>
        <Routes>
                <Route path='/' element={<App />} />
                <Route path='/AdminPanel' element={<AdminPanel />} />
                <Route path='/EditOppo' element={<EditOppo />} />
                <Route path='/EditUser' element={<EditUser />} />
                <Route path='/MngPartner' element={<MngPartner />} />
                <Route path='/AboutUs' element={<AboutPage />} />
                <Route path='/Opportunities' element={<OppoPage />} />
                <Route path='/ContactUs' element={<ContactPage />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Favourites' element={<Favourites />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/job' element={<OneJob />} />
                <Route path='/Profile' element={<ProfilePage />} />
                <Route path='/Company' element={<CompanyPage />} />
                <Route path='/EditProfile' element={<EditProfile />} />
                <Route path='/MakingReview' element={<MakingReview />} />
                <Route path='/ReviewSuccess' element={<ReviewSuccess />} />
                <Route path='/ReviewNoSuccess' element={<ReviewNoSuccess />} />
                <Route path='/EditCompany' element={<EditCompany />} />
                <Route path='/CreateCompanyProfile' element={<CreateCompanyProfile />} />
                <Route path='/RegisterUser' element={< RegisterUser />} />
                <Route path='/RegisterPartner' element={< RegisterPartner />} />
                <Route path='/MyApplications' element={< MyApplication />} />
                <Route path='/OppoPartner' element={<OppoPartner />} />
                <Route path='/AddOppoPartner' element={<AddOppoPartner />} />
                <Route path='/DeleteOppoPartner' element={<DeleteOppoPartner />} />
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

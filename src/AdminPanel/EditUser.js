// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import "./EditUser.css";
import axios from 'axios';

const initialSate = {
    UserID: 0,
    RoleID: 0,
    Name: "",
    Password: "",
    Email: "",
    Age: 0,
    Gender: "",
    UserBio: "",
    MobileNumber: 0
}

const EditUser = () => {

    const [state, setState] = useState(initialSate);
    const { userID, roleID, name, password, email, age, gender, UserBio, MobileNumber} = state;
   
    const handleuserID = (e) => {
        const {userID, value} = e.target;
        setState({...state, [userID]: value})
    }

    const handleName= (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }

    const handleroleID= (e) => {
        const {roleID, value} = e.target;
        setState({...state, [roleID]: value})
    }

    const handlepassword = (e) => {
        const {password, value} = e.target;
        setState({...state, [password]: value})
    }

    const handleEmail= (e) => {
        const {email, value} = e.target;
        setState({...state, [email]: value})
    }

    const handleAge= (e) => {
        const {age, value} = e.target;
        setState({...state, [age]: value})
    }

    const handleGender= (e) => {
        const {gender, value} = e.target;
        setState({...state, [gender]: value})
    }

    const handleUserBio = (e) => {
        const {UserBio, value} = e.target;
        setState({...state, [UserBio]: value})
    }

    const handleContact= (e) => {
        const {MobileNumber, value} = e.target;
        setState({...state, [MobileNumber]: value})
    }
    
    const submitFormData = (e) => {
        e.preventDefault();
        {
            axios.post("http://localhost:3001/userEdit", {
                userID,
                roleID,
                name,
                password,
                email,
                age,
                gender,
                UserBio,
                MobileNumber,
            })
                .then((response) => {
                    console.log(response);
                    setState({ userID: 0, roleID: 0, name: "", password: "", email: "", age: 0, gender: "", UserBio: "", MobileNumber:0})
                    console.log("Successfully updated");
                })
                .catch(() => {
                    console.log("Failed to update");
                });
        }
    }

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}>
                <label>UserID</label>
                <input type="aUserID" placeholder="UserID" value={userID} onChange={handleuserID}></input>

                <label>Name</label>
                <input type="aName" placeholder="Your Name ..." value={name} onChange={handleName}></input>

                <label>RoleID</label>
                <input type="aRoleID" placeholder="Your RoleID ..." value={roleID} onChange={handleroleID}></input>

                <label>Password</label>
                <input type="aPassword" placeholder="Your Password ..." value={password} onChange={handlepassword}></input>

                <label>Email</label>
                <input type="aEmail" placeholder="Your Email ..." value={email} onChange={handleEmail}></input>

                <label>Age</label>
                <input type="aAge" placeholder="Your Age ..." value={age} onChange={handleAge}></input>

                <label>Gender</label>
                <input type="aGender" placeholder="Your Gender ..." value={gender} onChange={handleGender}></input>

                <label>UserBio</label>
                <input type="aUserBio" placeholder="Your User Biography ..." value={UserBio} onChange={handleUserBio}></input>

                <label>Contact</label>
                <input type="aContact" placeholder="Your Contact Number ..." value={MobileNumber} onChange={handleContact}></input>

                <button onClick={submitFormData}>Submit</button>
                <Link to="/ViewUser">
                    <button className="btn backButton">Go Back to View All Users</button>
                </Link>
            </form>
        </div>
    )
}

export default EditUser;
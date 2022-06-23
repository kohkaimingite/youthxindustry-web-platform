// JavaScript source code
import React, { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
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

    const handlepassword = (e) => {
        const {password, value} = e.target;
        setState({...state, [password]: value})
    }

    const handleUserBio = (e) => {
        const {UserBio, value} = e.target;
        setState({...state, [UserBio]: value})
    }

    const handleroleID= (e) => {
        const {roleID, value} = e.target;
        setState({...state, [roleID]: value})
    }

    const handleName= (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }
    const handleAge= (e) => {
        const {age, value} = e.target;
        setState({...state, [age]: value})
    }
    const handleContact= (e) => {
        const {MobileNumber, value} = e.target;
        setState({...state, [MobileNumber]: value})
    }
    const handleemail= (e) => {
        const {email, value} = e.target;
        setState({...state, [email]: value})
    }
    const handlegender= (e) => {
        const {gender, value} = e.target;
        setState({...state, [gender]: value})
    }


    const submitFormData = (e) => {
        e.preventDefault();
        {
            axios.post("http://localhost:3001/EditUser", {
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
                    console.log("Success to update");
                })
                .catch(() => {
                    console.log("Failed to update");
                });
        }
    };

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            <form>
                <label>UserID</label>
                <textarea value={userID} onChange={handleuserID}></textarea>

                <label>Name</label>
                <textarea value={name} onChange={handleName}></textarea>

                <label>RoleID</label>
                <textarea value={roleID} onChange={handleroleID}></textarea>

                <label>Password</label>
                <textarea value={password} onChange={handlepassword}></textarea>

                <label>Email</label>
                <textarea value={email} onChange={handleemail}></textarea>

                <label>Age</label>
                <textarea value={age} onChange={handleAge}></textarea>

                <label>Gender</label>
                <textarea value={gender} onChange={handlegender}></textarea>

                <label>UserBio</label>
                <textarea value={UserBio} onChange={handleUserBio}></textarea>

                <label>Contact</label>
                <textarea value={MobileNumber} onChange={handleContact}></textarea>

            </form>
            <button onClick={submitFormData}>Submit</button>
        </div>
    )
}

export default EditUser;
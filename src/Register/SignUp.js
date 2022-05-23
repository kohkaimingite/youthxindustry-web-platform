import React, { useState } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';

export default function SignUp() {
    const [nameReg, setNameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [emailReg, setEmailReg] = useState('')
    const [ageReg, setAgeReg] = useState('')
    const [genderReg, setGenderReg] = useState('')

    const register = () => {
        Axios.post("http://localhost:3001/register", {
            name: nameReg,
            password: passwordReg,
            email: emailReg,
            age: ageReg,
            gender: genderReg,
        }).then((response) => {
            console.log(response);
        });
    };
    return (
        <div className="App">
            <div className="registration">
                <NavBar />
                <h1>Registration</h1>
                <label>Name</label>
                <input type="text" onChange={(e) => {
                    setNameReg(e.target.value);
                }}
                />
                <label>Password</label>
                <input type="text" onChange={(e) => {
                    setPasswordReg(e.target.value);
                }}
                />
                <label>Email</label>
                <input type="text" onChange={(e) => {
                    setEmailReg(e.target.value);
                }}
                />
                <label>Age</label>
                <input type="text" onChange={(e) => {
                    setAgeReg(e.target.value);
                }}
                />
                <label>Gender</label>
                <input type="text" onChange={(e) => {
                    setGenderReg(e.target.value);
                }}
                />
                <button onClick={register}>Register</button>
            </div>
        </div>
    
  );
}
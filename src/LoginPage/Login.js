import React, { useState } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';

export default function Login() {

    const [nameReg, setNameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [loginStatus, setLoginStatus] = useState('');


    const login = () => {
        Axios.post("http://localhost:3001/login", {
            name: nameReg,
            password: passwordReg,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)

            } else {
                setLoginStatus(response.data[0].name)
            }
            
        });
    };

    return (
        <div className="App">
            <div className="login">
                <NavBar />
                <h1>Login</h1>
                <label>Name</label>
                <input type="text"
                    placeholder= "Name..."
                    onChange={(e) => {
                    setNameReg(e.target.value);
                }}
                />
                <label>Password</label>
                <input type="text"
                    placeholder="Password..."
                    onChange={(e) => {
                    setPasswordReg(e.target.value);
                }}
                />
              
                <button onClick={login}>Login</button>
            </div>
            <h1>{loginStatus}</h1>
        </div>

    );
}
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';
import './Login.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        })
            .then((response) => {

                if (response.data.message) {
                    setStatus(response.data.message)
                } else {
                    setStatus(response.data[0].email)
                }

            });
    };



    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn = true) {
                setStatus(response.data.message);
            }
        });
    }, []);


    return (
        <div className="App">
            <NavBar />
            <div className="login">
                <h1>Login</h1>

                <label>Email</label>
                <input type="email"
                    placeholder="Email..."
                    id="email"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label>Password</label>
                <input type="password"
                    placeholder="Password..."
                    id="password"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <button onClick={login}>Login</button>

            </div>
            <h1>{status}</h1>
        </div>

    );
}
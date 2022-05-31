import React, { useState } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';

export default function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');


    const login = () => {
        Axios.post("http://localhost:3001/login", {
            name: name,
            password: password,
        })
            .then(() => {
                setStatus({ type: 'success' });
            })
            .catch((error) => {
                setStatus({ type: 'error', error });
            });
    };


    return (
        <div className="App">
            <div className="login">
                <NavBar />
                <h1>Login</h1>
                <label>Name</label>
                <input type="text"
                    placeholder="Name..."
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <label>Password</label>
                <input type="text"
                    placeholder="Password..."
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <button onClick={login}>Login</button>
            </div>
            <>
                {status?.type === 'success' && <a href="/AboutUs">Successfully login! Back to  Home Page?</a>}
                {status?.type === 'error' && <p>Account not found!</p>}
            </>
        </div>

    );
}
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { faSignIn, faUserLock, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {

    Axios.defaults.withCredentials = true;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate('');

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        })
            .then((response) => {

                if (response.data.message) {

                    setStatus(response.data.message);
                   
                } else {
                    navigate("/Home")
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);

                }

            });
    };

    

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
          
        });
    }, []);



    return (
        <div className="App">
            <NavBar />
            <div className="login">
                <FontAwesomeIcon icon={faUserLock} />
                <h1>Login</h1>

                <label style={{ marginRight: "150px" }}>Email</label>
                <input type="email"
                    placeholder="Enter email"
                    id="email"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label style={{ marginRight: "125px" }}>Password</label>
                <input type="password"
                    placeholder="Enter password"
                    id="password"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />


                <button onClick={login}>Login <FontAwesomeIcon icon={faSignIn} /></button>
                <p>{status}</p>
            </div>
        </div>

    );
}


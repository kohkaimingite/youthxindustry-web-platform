// JavaScript source code
import React, { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';


const DeleteUser = () => {

    const [userId, setuserId] = useState('');

    const handleuserID = (e) => {
        setuserId(e.target.value);
    };

    const submitFormData = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/DeleteUser", {
            userId: userId,

        })
            .then(() => {
               console.log("Success");
            })
            .catch((error) => {
                console.log("Fail");
            });
    }

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            <form>
                <label>UserID</label>
                <textarea value={userId} onChange={handleuserID}></textarea>
                <button variant="primary" onClick={submitFormData}>
                    Delete
                </button>
            </form>

        </div>

    )
}

export default DeleteUser;
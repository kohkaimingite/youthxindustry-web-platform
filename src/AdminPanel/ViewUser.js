// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import "./ViewUser.css";
import axios from 'axios';

const ViewUser = () => {

    const [data, setData] = useState([]);

    let { storeUserID } = '';

    useEffect(() => {
        axios.get("http://localhost:3001/user")
        .then((response) => {

            console.log(response);
            setData(response.data);

        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const deleteUser = (id) => {
        if (
            window.confirm("Are you sure that you wanted to delete that user?")
        ) {
            axios.post("http://localhost:3001/userDelete", {
                UserID: parseInt(storeUserID)
            }).then(() => {
                console.log("Deleted sucessfully");
            });
        }
    };

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            <Link to="/AdminPanel">
                <button className="btn backButton">Go Back to Admin Panel</button>
            </Link>
            <table className="User-Table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}> ID </th>
                        <th style={{textAlign: "center"}}> Name </th>
                        <th style={{textAlign: "center"}}> Email </th>
                        <th style={{textAlign: "center"}}> Age </th>
                        <th style={{textAlign: "center"}}> Gender </th>
                        <th style={{textAlign: "center"}}> UserBio </th>
                        <th style={{textAlign: "center"}}> Contact </th>
                        <th style={{textAlign: "center"}}> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((User, key) => {
                        storeUserID = User.UserID;
                        return (
                            <tr key={key}>
                                <td> {User.UserID} </td>
                                <td> {User.Name} </td>
                                <td> {User.Email} </td>
                                <td> {User.Age} </td>
                                <td> {User.Gender} </td>
                                <td> {User.UserBio} </td>
                                <td> {User.ContactNumber} </td>
                                <td>
                                    <Link to="/EditUser">
                                        <button className="btn editButton">Edit</button>
                                    </Link>

                                    <button className="btn deleteButton" onClick={() => deleteUser(User.UserID)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    );
}

export default ViewUser;
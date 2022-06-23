// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';

const ViewUser = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/user").then((response) => {

            console.log(response);
            setData(response.data);

        });
    });

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            <table>
                <tr>
                    <th> ID </th>
                    <th> Name </th>
                    <th> Email </th>
                    <th> Age </th>
                    <th> Gender </th>
                    <th> UserBio </th>
                    <th> Contact </th>
                </tr>
                <tbody>
                    {data.map((User, key) => {
                        return (
                            <tr key={key}>
                                <td> {User.UserID} </td>
                                <td> {User.Name} </td>
                                <td> {User.Email} </td>
                                <td> {User.Age} </td>
                                <td> {User.Gender} </td>
                                <td> {User.UserBio} </td>
                                <td> {User.ContactNumber} </td>
                            </tr>
                        )
                    })}
                </tbody>
                <Link to="/EditUser">
                    <button>Edit User</button>
                </Link>
                <Link to="/DeleteUser">
                    <button>Delete User</button>
                </Link>
            </table>
        </div >
    );
}

export default ViewUser;
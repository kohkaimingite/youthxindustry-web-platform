// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import "./ViewOppo.css";
import axios from 'axios';

const ViewOppo = () => {
    const [searchInput, setSearchInput] = useState('');

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/oppo").then((response) => {

            console.log(response);
            setData(response.data);

        });
    });

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            <Link to="/AdminPanel">
                <button className="btn backButton">Go Back to Admin Panel</button>
            </Link>
            <input type="search" placeholder="Search..." onChange={event => {setSearchInput(event.target.value)}}/>
            <input type="submit" value="Go" class="btn goButton"/>
            <table className="User-Table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}> Job Code </th>
                        <th style={{textAlign: "center"}}> Job Name </th>
                        <th style={{textAlign: "center"}}> Description </th>
                        <th style={{textAlign: "center"}}> Location </th>
                        <th style={{textAlign: "center"}}> Address </th>
                        <th style={{textAlign: "center"}}> Category(-ies) </th>
                        <th style={{textAlign: "center"}}> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((User, key) => {
                        return (
                            <tr key={key}>
                                <td> {User.OppID} </td>
                                <td> {User.Name} </td>
                                <td> {User.Description} </td>
                                <td> {User.Location} </td>
                                <td> {User.Address} </td>
                                <td> {User.Type} </td>
                                <td>
                                    <Link to="/EditOppo">
                                        <button className="btn editButton">Edit</button>
                                    </Link>

                                    <Link to="/DeleteUser">
                                        <button className="btn deleteButton">Delete</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    );
}

export default ViewOppo;
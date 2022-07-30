// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from '../../components/AdminNavBar';
import "../Reviews/ViewReview.css";
import axios from 'axios';

const ViewReview = () => {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [order, setOrder] = useState("ascending");
    const sortWord = (col) => {
        if (order === "ascending") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase ? 1 : -1
            );
            setData(sorted);
            setOrder("descending");
        }
        if (order === "descending") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase ? 1 : -1
            );
            setData(sorted);
            setOrder("ascending");
        }
    }

    const sortNum = (col) => {
        if (order === "ascending") {
            const sorted = [...data].sort((a, b) =>
                a[col] - b[col]
            );
            setData(sorted);
            setOrder("descending");
        }
        if (order === "descending") {
            const sorted = [...data].sort((a, b) =>
                b[col] - a[col]
            );
            setData(sorted);
            setOrder("ascending");
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3001/apReview").then((response) => {

            console.log(response);
            setData(response.data);
            
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div className="App">
            <AdminNavBar />
            <Link to="/AdminPanel">
                <button className="btn backButton">Go Back to Admin Panel</button>
            </Link>
            <input type="search" placeholder="Search..." onChange={event => {setSearchInput(event.target.value)}}/>
            <table className="User-Table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}} onClick={()=>sortNum("UserID")}> ID </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Name")}> Name </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortNum("OppID")}> Job Code </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Review")}> Review </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortNum("Rating")}> Rating </th>
                    </tr>
                </thead>
                <tbody>
                    {data.filter((User) => {
                        var strUserID = '' + User.UserID;
                        var strOppID = '' + User.OppID;

                        if (searchInput == "") {
                            return User
                        } else if (strUserID.includes(searchInput)) {
                            return User
                        } else if (strOppID.includes(searchInput)) {
                            return User
                        } else if (User.Name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        } else if (User.Review.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        }
                    }).map((User, key) => {
                        return (
                            <tr key={key}>
                                <td> {User.UserID} </td>
                                <td> {User.Name} </td>
                                <td> {User.OppID} </td>
                                <td> {User.Review} </td>
                                <td> {User.Rating} </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    );
}

export default ViewReview;
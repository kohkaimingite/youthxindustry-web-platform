// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from '../../components/AdminNavBar';
import "../Users/ViewUser.css";
import axios from 'axios';

const ViewUser = () => {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [userList, setUserList] = useState([]);
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

    let { storeUserID } = '';

    useEffect(() => {
        axios.get("http://localhost:3001/apUser").then((response) => {

            console.log(response);
            setData(response.data);
            
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const deleteUser = (UserID) => {
        const newUser = [...userList];
        const index = userList.findIndex((User) => User.UserID === UserID);
        newUser.splice(index, 1);
        setUserList(newUser);

        if (
            window.confirm("Are you sure you want to delete this user?")
        ) {
            axios.post("http://localhost:3001/apUserDelete", {
                UserID: UserID,
                adminUserID: parseInt(storeUserID)
            }).then(() => {
                console.log("Successfully Deleted.");
            })
            .catch(() => {
                console.log("Failed to delete.");
            });
        }
    };

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
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Email")}> Email </th>
                        <th style={{textAlign: "center"}}> Age </th>
                        <th style={{textAlign: "center"}}> Gender </th>
                        <th style={{textAlign: "center"}}> UserBio </th>
                        <th style={{textAlign: "center"}}> Contact </th>
                        <th style={{textAlign: "center"}}> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.filter((User) => {
                        var strUserID = '' + User.UserID;

                        if (searchInput == "") {
                            return User
                        } else if (strUserID.includes(searchInput)) {
                            return User
                        } else if (User.Name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        } else if (User.Email.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        }
                    }).map((User, key) => {
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
                                    <Link to={"/EditUser/"+User.UserID}>
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
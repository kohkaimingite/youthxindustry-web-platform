// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from '../../components/NavBar';
import "../Partners/ViewPartner.css";
import axios from 'axios';

const ViewPartner = () => {
    const [searchInput, setSearchInput] = useState('');

    const [data, setData] = useState([]);

    const [partnerList, setPartnerList] = useState([]);

    let { storeUserID } = '';

    useEffect(() => {
        axios.get("http://localhost:3001/partner").then((response) => {

            console.log(response);
            setData(response.data);

        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const deleteUser = (UserID) => {
        const newPartner = [...partnerList];
        const index = partnerList.findIndex((User) => User.UserID === UserID);
        newPartner.splice(index, 1);
        setPartnerList(newPartner);

        if (
            window.confirm("Are you sure you want to delete this user?")
        ) {
            axios.post("http://localhost:3001/partnerDelete", {
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
            <NavBar />
            <Link to="/AdminPanel">
                <button className="btn backButton">Go Back to Admin Panel</button>
            </Link>
            <table className="User-Table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}> ID </th>
                        <th style={{textAlign: "center"}}> Name </th>
                        <th style={{textAlign: "center"}}> Email </th>
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

export default ViewPartner;
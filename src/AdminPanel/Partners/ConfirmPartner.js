// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from '../../components/AdminNavBar';
import "../Partners/ConfirmPartner.css";
import axios from 'axios';

const ConfirmPartner = () => {
    const [searchInput, setSearchInput] = useState('');

    const [data, setData] = useState([]);

    const [partnerList, setPartnerList] = useState([]);

    let { storeUserID } = '';

    useEffect(() => {
        axios.get("http://localhost:3001/apPartnerConfirm").then((response) => {

            console.log(response);
            setData(response.data);

        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const confirmPartner = (UserID) => {
        const newPartner = [...partnerList];
        const index = partnerList.findIndex((User) => User.UserID === UserID);
        newPartner.splice(index, 1);
        setPartnerList(newPartner);

        if (
            window.confirm("Are you sure you want to confirm registration for this partner?")
        ) {
            axios.post("http://localhost:3001/apConfirmRegistration", {
                UserID: UserID,
                adminUserID: parseInt(storeUserID)
            }).then(() => {
                console.log("Successfully Registered.");
            })
            .catch(() => {
                console.log("Failed to register.");
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
                        <th style={{textAlign: "center"}}> ID </th>
                        <th style={{textAlign: "center"}}> Name </th>
                        <th style={{textAlign: "center"}}> Email </th>
                        <th style={{textAlign: "center"}}> UserBio </th>
                        <th style={{textAlign: "center"}}> Contact </th>
                        <th style={{textAlign: "center"}}> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.filter((User) => {
                        if (searchInput == "") {
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
                                <td> {User.UserBio} </td>
                                <td> {User.ContactNumber} </td>
                                <td>
                                    <button className="btn confirmButton" onClick={() => confirmPartner(User.UserID)}>
                                        Confirm
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

export default ConfirmPartner;
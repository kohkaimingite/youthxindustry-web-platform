// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from '../../components/AdminNavBar';
// import "../Partners/ConfirmPartner.css";
import axios from 'axios';
import emailjs from '@emailjs/browser';

export default function ConfirmPartner1({ data }) {
    const columns = data[0] && Object.keys(data[0]);


    //Kai Ming Job confirmation function
    const emailInfo = {
        name: '',
        email: ''

    };

    function EmailConfirmation() {
        emailInfo.name = data[0].UserID;
        emailInfo.email = data[0].Email;
        console.log(emailInfo)
        emailjs.sendForm('service_nqak4rb', 'template_0fcbuq9', emailInfo, 'EOze04zGTBzzoGFXp')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    //////////////////////////////////////////////////


    function Confirm(UserID) {
        if (window.confirm("Are you sure you want to confirm registration for this partner?")) {

            axios.post("http://localhost:3001/apConfirmRegistration", {
                UserID: parseInt(UserID),
            }).then((response) => {
                console.log("Successfully Registered");
                alert("Registered");
                { EmailConfirmation() }
            });
        } else {
            alert("Failed to register")
        }
    }

    return (
        <table class="oppoTable">
            <tr>
                <th> ID </th>
                <th> Name </th>
                <th> Email </th>
                <th> UserBio </th>
                <th> Contact </th>
                <th> Actions </th>



            </tr>
            {data.map(row => <tr>
                {
                    columns.map(column => <td style={{ textAlign: 'center' }}>{row[column]}</td>)

                }
                <button className="btn confirmButton" onClick={() => Confirm(row[columns[0]])}> </button>


            </tr>)}
        </table>
    )

}
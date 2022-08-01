// JavaScript source code
import { React, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import emailjs from '@emailjs/browser';



export default function LogAppTable({ data }) {
    const columns = data[0] && Object.keys(data[0]);


    //Kai Ming Job confirmation function
    const emailInfo = {
        OppID: '',
        Company: '',
        JobName: '',
        Email: '',
        Number: ''
    };

    function EmailConfirmation(appID) {
        axios.post("http://localhost:3001/AppForEmailConfirmation", {
            AppID: parseInt(appID),
        }).then((response) => {
            emailInfo.OppID = response.data[0].OppID;
            emailInfo.JobName = response.data[0].Name;
            emailInfo.Email = response.data[0].Email;
            emailInfo.Number = response.data[0].ContactNumber;
            axios.post("http://localhost:3001/OppForEmailConfirmation", {
                OppID: parseInt(emailInfo.OppID),
            }).then((response) => {
                emailInfo.Company = response.data[0].Name;

                emailjs.send('service_x7yymg6', 'template_6artrdu', emailInfo, 'IsHv-S74WPDFFkoTT')
                    .then((result) => {
                        console.log(result.text);
                        window.location.reload();
                    }, (error) => {
                        console.log(error.text);
                    });
            });

        });
    }
    //////////////////////////////////////////////////


    function Accept(appID) {
        if (window.confirm("Accept Application? An email will be send to the applicant")) {

            axios.post("http://localhost:3001/AcceptApplication", {
                AppID: parseInt(appID),
            }).then((response) => {
                console.log("Updated Sucessfully");
                alert("Accepted!");
                { EmailConfirmation(appID) }
                console.log(emailInfo);

            });

        } else {
            alert("Application not Accepted")
        }
    }

    function Reject(appID) {
        if (window.confirm("Reject Application?")) {

            axios.post("http://localhost:3001/RejectApplication", {
                AppID: parseInt(appID),
            }).then((response) => {
                console.log("Updated Sucessfully");
                alert("Rejected!")
                window.location.reload();
            });
        } else {
            alert("Application not rejected")
        }
    }

    function Resume(userID) {
        axios.post("http://localhost:3001/getblob2", {
            userID: userID.then((response) => {
                console.log(response);
                return response.data;
            })
        })
    }
    return (
        <table class="AppTable1">
            <tr>
                <th>Application ID</th>
                <th>UserID</th>
                <th>Opportunity ID</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Status</th>
                <th>Resume</th>
                <th>Accept</th>
                <th>Reject</th>



            </tr>
            {data.map(row => <tr>
                {
                    columns.map(column => <td style={{ textAlign: 'center' }}>{row[column]}</td>)

                }
                <td><a
                    href={`http://localhost:3001/getblob/`+ row[columns[1]]}
                    target="_blank"
                    rel="noreferrer"
                >
                    Resume
                </a></td>
                <td><FontAwesomeIcon icon={faCheck} onClick={() => Accept(row[columns[0]])}> </FontAwesomeIcon></td>
                <td><FontAwesomeIcon icon={faX} onClick={() => Reject(row[columns[0]])}> </FontAwesomeIcon></td>

            </tr>)}
        </table>
    )
}
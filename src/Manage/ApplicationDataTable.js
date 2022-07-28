// JavaScript source code
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import { Route, Link } from 'react-router-dom';
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
        Email: ''

    };

    function EmailConfirmation(appID) {
        axios.post("http://localhost:3001/AppForEmailConfirmation", {
            AppID: parseInt(appID),
        }).then((response) => {
            emailInfo.OppID = response.data[0].OppID;
            emailInfo.JobName = response.data[0].Name;
            emailInfo.Email = response.data[0].Email;
            axios.post("http://localhost:3001/OppForEmailConfirmation", {
                OppID: parseInt(emailInfo.OppID),
            }).then((response) => {
                emailInfo.Company = response.data[0].Name;
                console.log(emailInfo);
                emailjs.send('service_nqak4rb', 'template_ej4c4sk', emailInfo, 'EOze04zGTBzzoGFXp')
                    .then((result) => {
                        console.log(result.text);
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
            });
        } else {
            alert("Application not rejected")
        }
    }

    return (
        <table class="oppoTable">
            <tr>
                <th>Application ID</th>
                <th>Opportunity ID</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Description</th>
                <th>Status</th>
                <th>Accept</th>
                <th>Reject</th>



            </tr>
            {data.map(row => <tr>
                {
                    columns.map(column => <td style={{ textAlign: 'center' }}>{row[column]}</td>)

                }
                <td><FontAwesomeIcon icon={faCheck} onClick={() => Accept(row[columns[0]])}> </FontAwesomeIcon></td>
                <td><FontAwesomeIcon icon={faX} onClick={() => Reject(row[columns[0]])}> </FontAwesomeIcon></td>

            </tr>)}
        </table>
    )

}
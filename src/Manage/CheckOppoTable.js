// JavaScript source code
// JavaScript source code
import { React, useState, useEffect } from "react";
import "../AdminPanel/Partners/ConfirmPartner.css";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import emailjs from '@emailjs/browser';



export default function LogAppTable({ data }) {
    const columns = data[0] && Object.keys(data[0]);

    function Accept(oppID) {
        if (window.confirm("Accept Opportunity?")) {

            axios.post("http://localhost:3001/AcceptOppo", {
                OppID: parseInt(oppID),
            }).then((response) => {
                console.log("Updated Sucessfully");
                alert("Accepted!");
                window.location.reload();
            });
        } else {
            alert("Opportunity not Accepted")
        }
    }

    function Reject(oppID) {
        if (window.confirm("Reject Opportunity?")) {

            axios.post("http://localhost:3001/RejectOppo", {
                OppID: parseInt(oppID),
            }).then((response) => {
                console.log("Updated Sucessfully");
                alert("Rejected!")
                window.location.reload();
            });
        } else {
            alert("Opportunity not rejected")
        }
    }

    return (
        <table className="User-Table">
            <thead>
                <tr>
                    <th> Job Code </th>
                    <th> Job Name </th>
                    <th> Description </th>
                    <th> Region </th>
                    <th> Address </th>
                    <th> Category(-ies) </th>
                    <th> Qualification </th>
                    <th> Pay </th>
                    <th> Accept </th>
                    <th> Reject </th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => <tr>
                    {
                        columns.map(column => <td style={{ textAlign: 'center' }}>{row[column]}</td>)

                    }
                    <td><FontAwesomeIcon icon={faCheck} onClick={() => Accept(row[columns[0]])}> </FontAwesomeIcon></td>
                    <td><FontAwesomeIcon icon={faX} onClick={() => Reject(row[columns[0]])}> </FontAwesomeIcon></td>
                </tr>)}
            </tbody>
        </table>
    )
}
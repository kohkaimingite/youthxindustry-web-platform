// JavaScript source code
import NavBar from '../components/NavBar'
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

export default function LogAppTable({ data }) {
    const columns = data[0] && Object.keys(data[0]);

    function Accept(appID) {
        axios.post("http://localhost:3001/AcceptApplication", {
            AppID: parseInt(appID)
        }).then((response) => {
            console.log("Updated Sucessfully");
            alert("Accepted!")
        });
    }

    function Reject(appID) {
        axios.post("http://localhost:3001/RejectApplication", {
            AppID: parseInt(appID)
        }).then((response) => {
            console.log("Updated Sucessfully");
            alert("Rejected!")
        });
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
                    columns.map(column => <td style={{ textAlign: 'left' }}>{row{column}}</td>)

                }
                <td><FontAwesomeIcon icon={faCheck} onClick={() => Accept(row[columns[0]])}> </FontAwesomeIcon></td>
                <td><FontAwesomeIcon icon={faX} onClick={() => Reject(row[columns[0]])}> </FontAwesomeIcon></td>
            </tr>)}
        </table>
        )

    }
}

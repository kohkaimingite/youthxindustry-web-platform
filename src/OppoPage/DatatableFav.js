// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';

export default function DatatableFav({ data }) {
    const [OppoList, setOppoList] = useState([]);
    const columns = data[0] && Object.keys(data[0]);
    //const columns = OppoList[0] && Object.keys(OppoList[0]);


    return (

        <table class="oppoTable">
            <tr>
                <th>Job Code</th>
                <th>Job Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Address</th>
                <th>Job Categories</th>
                <th>Delete?</th>

            </tr>
            {data.map(row => <tr>
                {
                    columns.map(column => <td style={{ textAlign: 'left' }}>{row[column]}</td>)

                }
                <td>delete button</td>

            </tr>)}
        </table>


    );
}
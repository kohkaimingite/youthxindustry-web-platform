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

function MyApplication() {
    const [AppList, setAppList] = useState([]);
    const columns = AppList[0] && Object.keys(AppList[0]);
    const getApplication = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/Applications").then((response) => {

            console.log(response);
            setAppList(response.data);

        });
    });
    return (
        
        <div>

        </div>
        
    )
}

export default MyApplication;
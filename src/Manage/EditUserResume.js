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

function EditUserResume() {
    const [Check, setCheck] = useState("");
    const [Resume, setResume] = useState();
    const [ProfList, setProfList] = useState([]);
    const columns = ProfList[0] && Object.keys(ProfList[0]);
    const getProfile = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/profile").then((response) => {

            console.log(response);
            setProfList(response.data);

        });
    });

    return (
        <div className="App">
            <NavBar />
                

                <div className="AlignMiddle">

                    <form method="post">
                        <h3>New Resume: </h3>

                        <br />
                        <label>Upload Your Resume: </label>
                        <input type="file" id='Resume' placeholder="Upload file..." onChange={e => setResume(e.target.value)}></input><br />
                        <button onClick={submit}> Confirm </button>
                        <text align='left'>{Check}</text>
                    </form>
                </div>
        </div>
    )

    function submit() {
        axios.post("http://localhost:3001/EditUResume", {
            Resume: Resume
        }).then(() => {
            console.log("Test");
            /*setCheck(response.data);*/
            window.location = "http://localhost:3000/Profile";
        });
    };
}

export default EditUserResume;
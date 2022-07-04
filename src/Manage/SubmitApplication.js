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


function SubmitApplication() {
    const [ProfList, setProfList] = useState([]);
    const [desc, setdesc] = useState("");
    const [Chars, setChars] = useState(0);
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
            <div className="main">
                <h1>Application</h1>
                <div className="AlignLeft">
                    <h3>Details:</h3>
                    <form action="/action_page.php" method="post">
                        <text>Full Name:</text><br />
                        <text>Email:</text><br />
                        <text>Mobile Number:</text><br />
                        <text>Short Description: </text><br />
                        <text>Resume: </text><br />
                    </form>
                </div>
            
                    <div className="AlignMiddle">
                    <form action="/action_page.php" method="post">
                        <h3>Testing</h3>
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.Name}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.Email}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.ContactNumber}</text>;
                        })}<br />
                            
                        <textarea placeholder="Briefly Describe Why You Want This Opportunity... (250 characters)" id="desc" name="desc" value={desc} onChange={e => { setdesc(e.target.value); setChars(e.target.value.length) }} /*style={styles.textArea}*/ maxLength="250"> </textarea>
                        <h4>Characters typed: {Chars}</h4>
                        <button onClick={submit}> Confirm </button>
                    </form>
                    </div>
            </div>
        </div>
        
        
    )

    function submit() {
        axios.post("http://localhost:3001/SubmitApplication", {
                desc: desc
        }).then(() => {
            console.log("Test");
            /*setCheck(response.data);*/
            window.location = "http://localhost:3000/MyApplications";
        });
    }
}

export default SubmitApplication;
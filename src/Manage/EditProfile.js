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



function EditProfile() {
    /*const Regex = new RegExp('*@*.com');*/
    const [Check, setCheck] = useState("");
    const [Bio, setBio] = useState("");
    const [EmailCheck, setEmailCheck] = useState("test");
    const [Number, setNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [NumberCheck, setNumberCheck] = useState("");
    const [ProfList, setProfList] = useState([]);
    const columns = ProfList[0] && Object.keys(ProfList[0]);
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
                <h1>Profile</h1>
                <div className="AlignLeft">
                    <h3>Details:</h3>
                    <form action="/action_page.php" method="post">
                        {ProfList.map((val, key) => {
                            return <text align="Left">Name: {val.name}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">Email: {val.email}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">Mobile Number: {val.MobileNumber}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">Bio: {val.userbio}</text>;
                        })}<br />
                    </form>

                </div>
                <div className="AlignMiddle">

                    <form method="post">
                        <h3>Changes: </h3>
                        <label>New Email:</label>
                        <input type="Email" id='email' placeholder="Enter A Email..." onChange={e => setEmail(e.target.value)}></input><text color='#FF0000'>{EmailCheck}</text><br />
                        <label>New Mobile Number:</label>
                        <input type="text" id='number' placeholder="Enter A Mobile Number..." onChange={e => setNumber(e.target.value)}></input><text color='#FF0000'>{NumberCheck}</text><br />
                        <label>New Bio: </label>
                        <input type="text" id='bio' placeholder="Enter New Bio..." onChange={e => setBio(e.target.value)}></input><br />
                        <button onClick={submit}> Confirm </button>
                        <text align='left'>{Check}</text>
                    </form>

                </div>
            </div>
        </div>

    )
    //function checkInput() {
    //    if (Regex.test(Email)) {
    //        setEmailCheck("Ok Email")
    //    }
    //    else {
    //        setEmailCheck("Please Enter a Valid Email!")
    //    }
        //    if ('email' == "") {
        //        setEmailCheck("Please Enter an Email!")
        //    }
        //    else if ('email' != "'*'@'*'.com") {
        //        setEmailCheck("Please Enter A Valid Email")
        //    }
        //    else {
        //        setEmailCheck("Ok Email")
        //    }
        //}
    function submit() {
        axios.post("http://localhost:3001/EditProfile", {
            Number: parseInt(Number),
            Email: Email,
            Bio: Bio
        }).then(() => {
            console.log("Test");
            /*setCheck(response.data);*/
            window.location = "http://localhost:3000/EditProfile";
        });
    };
}//ADD IF STATEMENT TO CHECK FOR IF IT IS SUCCESSFUL
export default EditProfile;
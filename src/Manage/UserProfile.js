import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function UserProfile() {
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
                <div className="main">
                <h1>Profile</h1>
                    <div className="AlignLeft">
                    <h3>Details:</h3>
                    <form action="/action_page.php" method="post">
                        <text>Full Name:</text><br />
                        <text>Email:</text><br />
                        <text>Mobile Number:</text><br />
                        <text>Bio: </text><br />
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
                        })}<a href="/EditUserNumber"> <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> </a><br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.UserBio}</text>;
                        })}<a href="/EditUserBio"> <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> </a><br />
                        {/*{ProfList.map((val, key) => {*/}
                        {/*    return <text align="Left">{val.Resume}</text>;*/}
                        {/*})}<br />*/}<a href="/EditUserResume"> <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> </a><br />
                        
                        

                        
                    </form>


                </div>
                <div className="AlignRight">
                    <form action="/action_page.php" method="post">
                    <Link to="/EditProfile"><button class="Button">Edit Profile</button></Link>
                    </form>
                </div>
                </div>
        </div>
    )

    //SQL statement = "SELECT name, email, MobileNumber FROM users WHERE UserID = "id";
    //SQL Update Statement ="UPDATE user SET name = newname, email = newEmail, MobileNumber = newNumber WHERE UserID = "id";

}
export default UserProfile;
import LoggedNavBar from '../components/LoggedNavBar'
import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import profile from './profile.css';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*const fs = require('fs');*/

function UserProfile() {
    
    const [ProfList, setProfList] = useState([]);
    const columns = ProfList[0] && Object.keys(ProfList[0]);
    const [Resume, setResume] = useState();
    const getProfile = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/profile").then((response) => {

            console.log(response);
            setProfList(response.data);

        });
    },[]);

    useEffect(() => {
        axios.get("http://getBlob").then((response) => {

            console.log(response);
            setResume(response.data);
        })
    }, []);
    new File([Resume], "resumes")
    return (


        <div className="App">
            
            <LoggedNavBar />
            <div class="wholeProfile">
                <titleSection>
                    <h1>Profile</h1>
                    
                </titleSection>
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Full Name:</text><br />
                    {ProfList.map((val, key) => {
                        return <h6 style={{ fontSize: "20px" }}>{val.Name}</h6>;
                    })}
                </nameSection>
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Email:</text><br />
                    {ProfList.map((val, key) => {
                        return <h6 style={{ fontSize: "20px" }}>{val.Email}</h6>;
                    })}
                </nameSection>
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Mobile Number:</text><br />
                    {ProfList.map((val, key) => {
                        return <text style={{ fontSize: "20px" }}>{val.ContactNumber} </text>;
                    })}<a href="/EditUserNumber"> <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> </a><br />
                </nameSection>
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Bio: </text><br />
                    {ProfList.map((val, key) => {
                        return <text style={{ fontSize: "20px" }}>{val.UserBio} </text>;
                    })}<a href="/EditUserBio"> <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> </a><br />
                </nameSection>
                
                <nameSection style={{ textAlign: 'left' }}>
                    <text style={{ fontSize: "20px" }}>Resume: </text><br />
                    {/*<button onClick={getResume(Resume)}>Download Resume</button>*/}
                    <a href="/EditUserResume"> <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> </a><br />
                </nameSection>
                







                
                
                    
                </div>
            
        </div>
    )

    //function getResume(file) {
    //    const bitmap = fs.readFileSync(file);
    //    const buf = new Buffer(bitmap);
    //    return buf;
    //}

    //SQL statement = "SELECT name, email, MobileNumber FROM users WHERE UserID = "id";
    //SQL Update Statement ="UPDATE user SET name = newname, email = newEmail, MobileNumber = newNumber WHERE UserID = "id";

}
export default UserProfile;
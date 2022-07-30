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
import hexToArrayBuffer from 'hex-to-array-buffer'




function UserProfile() {
    
    const [ProfList, setProfList] = useState([]);
    const columns = ProfList[0] && Object.keys(ProfList[0]);
    const [Resume, setResume] = useState();
    const [test, setTest] = useState("");
    const [testArray, setTestArray] = useState([]);

    const getProfile = () => {

    };

    //const buffer = new Uint8Array(test.match(/[\da-f]{2}/gi).map(function (h) {
    //    return parseInt(h, 16)
    //}))
    const buffer = hexToArrayBuffer(test)
    //const blob = new buffer.Blob([buffer])
    const blob = new Blob([buffer])
    const blobURL = URL.createObjectURL(blob)


    useEffect(() => {
        axios.get("http://localhost:3001/profile").then((response) => {

            console.log(response);
            setProfList(response.data);

        });
    },[]);

    useEffect(() => {
        axios.get("http://localhost:3001/getblob").then((response) => {

            console.log(response);
            setTestArray(response.data);
            { testArray.map((row, key) => setTest(row["hex"]) )}

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
                




                <h2>{test}</h2>
                <h2>{blobURL}</h2>
                <a download="hello.txt" href={URL.createObjectURL(blob)} id="link">Download</a>
                {/*<h2>{buffer}</h2>*/}
                {/*<h2>{row[0]}</h2>*/}
                {/*{testArray.map((row, key) => <h2>{row[0]}</h2> )}*/}
                
                <img scr={blobURL} alt="Girl in a jacket"  width="500" height="600"/>

                
                
                    
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
// JavaScript source code
// JavaScript source code
import LoggedNavBar from '../components/LoggedNavBar'
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
    const [ProfList, setProfList] = useState([]);
    const [charCount, setCharCount] = useState(0);
    const columns = ProfList[0] && Object.keys(ProfList[0]);
    useEffect(() => {
        axios.get("http://localhost:3001/profile").then((response) => {

            console.log(response);
            setProfList(response.data);

        });
    });


    return (
        <div className="App">
            <LoggedNavBar />
            <div className="wholeProfile">
                <titleSection2>
                    <h1>Edit Bio</h1>
                </titleSection2>
                    <leftSection style={{ textAlign: "left" }}>
                        <text style={{ fontSize: "20px" }}>Current Bio:</text><br/>
                            {ProfList.map((val, key) => {
                                return <text style={{ fontSize: "20px" }}>{val.UserBio} </text>;
                            })}
                </leftSection>
                <textarea placeholder="Provide A New Bio! Maximum of 500 Characters" id="Bio" name="Bio" value={Bio} onChange={e => { setBio(e.target.value); setCharCount(e.target.value.length) }} style={{width:'700px'}} maxLength="500"> </textarea><br/>
                <text style={{ fontSize: "20px" }} > Current Characters: {charCount}</text><br/>
                <Button variant="primary" type="submit" onClick={submit}>Update Bio</Button>
            </div>
            
        </div>

    )
    function submit() {
        axios.post("http://localhost:3001/EditUBio", {
            Bio: Bio
        }).then(() => {
            console.log("Test");
            window.location = "http://localhost:3000/Profile";
        });
    };
}
export default EditProfile;
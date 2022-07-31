// JavaScript source code
import PartnerNavBar from '../components/PartnerNavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

function EditCompany() {
    const [Check, setCheck] = useState("");
    const [Bio, setBio] = useState("");
    const [CompList, setCompList] = useState([]);
    const columns = CompList[0] && Object.keys(CompList[0]);
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3001/Company").then((response) => {

            console.log(response);
            setCompList(response.data);

        });
    },[]);

    return (
        <div className="App">
            <PartnerNavBar />
            <div className="wholeProfile">
                <titleSection2>
                    <h1>Edit Company Bio</h1>
                </titleSection2>
                <leftSection style={{ textAlign: "left" }}>
                    <text style={{ fontSize: "20px" }}>Current Bio:</text><br />
                    {CompList.map((val, key) => {
                        return <text style={{ fontSize: "20px" }}>{val.UserBio} </text>;
                    })}
                </leftSection>
                <textarea placeholder="Provide A New Bio! Maximum of 500 Characters" id="Bio" name="Bio" value={Bio} onChange={e => { setBio(e.target.value); setCharCount(e.target.value.length) }} style={{ width: '700px' }} maxLength="500"> </textarea><br />
                <text style={{ fontSize: "20px" }} > Current Characters: {charCount}</text><br />
                <Button variant="primary" type="submit" onClick={submit}>Update Bio</Button>
            </div>

        </div>
    )
    function submit() {
        axios.post("http://localhost:3001/EditCBio", {
            Bio: Bio
        }).then(() => {
            console.log("Test");
            /*setCheck(response.data);*/
            window.location = "http://localhost:3000/Company";
        });

    };


}

export default EditCompany;
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
    const [Number, setNumber] = useState(0);
    const [CompList, setCompList] = useState([]);

    const [Check, setCheck] = ("(6|8|9)\d{7}");
    const columns = CompList[0] && Object.keys(CompList[0]);

    useEffect(() => {
        axios.get("http://localhost:3001/Company").then((response) => {

            console.log(response);
            setCompList(response.data);

        });
    }, []);

    return (
        <div className="App">
            <PartnerNavBar />
            <div className="wholeProfile">
                <titleSection2>
                    <h1>Edit Company Number</h1>
                </titleSection2>
                <leftSection style={{ textAlign: "left" }}>
                    <text style={{ fontSize: "20px" }}>Current Number:</text><br />
                    {CompList.map((val, key) => {
                        return <text style={{ fontSize: "20px" }}>{val.ContactNumber} </text>;
                    })}
                </leftSection>
                <input type='Number' id='Number' name='Number' pattern="(6|8|9)\d{7}" required onChange={e => { setNumber(e.target.value);}} style={{ width: '200px' }}></input><br />
                <Button onClick={submit}>Update Contact Number</Button><br />
            </div>

        </div>
    )
    function submit() {
        if (/^(6|8|9)\d{7}$/.test(Number) && Number.length == 8) {
            axios.post("http://localhost:3001/EditCNumber", {
                Number: parseInt(Number),
            }).then(() => {
                console.log("Test");
                /*setCheck(response.data);*/
                window.location = "http://localhost:3000/Company";
                alert("Contact Number Successsfully Updated")
            });
        } else {
            alert("Please enter a Valid Contact Number")
        }

    };

}

export default EditCompany;
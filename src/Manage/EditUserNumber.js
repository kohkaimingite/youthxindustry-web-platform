// JavaScript source code
import LoggedNavBar from '../components/LoggedNavBar'
import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



function EditProfile() {
    const [Number, setNumber] = useState("");
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
            <LoggedNavBar />
            <div className="wholeProfile">
                <titleSection2>
                    <h1>Edit Contacts Number</h1>
                </titleSection2>
                <leftSection style={{ textAlign: "left" }}>
                    <text style={{ fontSize: "20px" }}>Current Number:</text><br />
                    {ProfList.map((val, key) => {
                        return <text style={{ fontSize: "20px" }}>{val.ContactNumber} </text>;
                    })}
                </leftSection>
                <input type='Number' id='Number' name='Number' pattern="(6|8|9)\d{7}" required onChange={e => { setNumber(e.target.value); }} style={{ width: '200px' }}></input><br />
                <Button onClick={submit}>Update Contact Number</Button><br />
            </div>


        </div>

    )
    function submit() {
        if (/^(6|8|9)\d{7}$/.test(Number) && Number.length == 8) {
            axios.post("http://localhost:3001/EditUNumber", {
                Number: parseInt(Number),
            }).then(() => {
                console.log("Test");
                /*setCheck(response.data);*/
                window.location = "http://localhost:3000/Profile";
                alert("Contact Number Successsfully Updated")
            });
        } else {
            alert("Please enter a Valid Contact Number")
        }
    };
}
export default EditProfile;
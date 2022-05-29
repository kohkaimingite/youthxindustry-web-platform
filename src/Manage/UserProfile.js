import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';


function UserProfile() {
    const [Email1, setEmail] = useState("test1");
    const [Name1, setName] = useState("test2");
    const [Number1, setNumber] = useState("test3");
    const [ProfList, setProfList] = useState([]);
    const getProfile = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/profile").then((response) => {

            console.log(response);
            setProfList(response.data);
            setEmail(ProfList[1]);
            setName(ProfList[1]);
            setNumber(ProfList[1]);
        });
    });
    
    const [Email, setEmail] = useState(ProfList.Email);
    const [Name, setName] = useState(ProfList.Name);
    const [Number, setNumber] = useState(ProfList.MobileNumber);
    
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
                        <text>Mobile Number:</text>
                    </form>
                    
                    </div>
                    <div className="AlignMiddle">
                    <form action="/action_page.php" method="post">
                        <h3>Testing</h3>
                        {ProfList.map((val, key) => {
                            return <h2>{val.Name}</h2>;
                        })}
                        <text align="Left">{ProfList[1]}</text><br />
                        <text align="Left">{ProfList[2]}</text><br />
                        <text align="Left">{ProfList[3]}</text><br />
                        <Link to="/EditProfile"><button class = "Button">Edit Profile</button></Link>
                    </form>
                    <table class="oppoTable">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            

                        </tr>
                        {ProfList.map(row => <tr>
                            {
                                columns.map(column => <td style={{ textAlign: 'left' }}>{row[column]}</td>)
                            }

                        </tr>)}
                    </table>
                    {ProfList.map((val, key) => {
                        return <h2>{val.Name}</h2>;
                    })}

                    </div>
                </div>
        </div>
    )

    //SQL statement = "SELECT name, email, MobileNumber FROM users WHERE UserID = "id";
    //SQL Update Statement ="UPDATE user SET name = newname, email = newEmail, MobileNumber = newNumber WHERE UserID = "id";

}
export default UserProfile;
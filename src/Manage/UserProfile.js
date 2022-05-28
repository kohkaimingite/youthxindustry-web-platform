import NavBar from '../components/NavBar'
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';


function UserProfile() {
    const [ProfList, setProfList] = useState([]);
    const getProfile = () => {
        axios.get("http://localhost:3001/Profile").then((response) => {

            console.log(response);
            setProfList(response.data);
            
        });
    };
    const [Email, setEmail] = useState(ProfList[0]);
    const [Name, setName] = useState(ProfList[1]);
    const [Number, setNumber] = useState(ProfList[2]);
    
    
    
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
                        <button type="button" onClick={() => setName(ProfList[0]) && setEmail(ProfList[1]) && setNumber(ProfList[2])}>Load Deatils</button>
                    </form>
                    
                    </div>
                    <div className="AlignMiddle">
                    <form action="/action_page.php" method="post">
                        <h3>Testing</h3>
                        
                        <text align="Left">{Name}</text><br />
                        <text align="Left">timmy@xqc.com</text><br />
                        <text align="Left">12345678</text><br />
                    </form>
                    </div>
                </div>
        </div>
    )

    //SQL statement = "SELECT name, email, MobileNumber FROM users WHERE UserID = "id";
    //SQL Update Statement ="UPDATE user SET name = newname, email = newEmail, MobileNumber = newNumber WHERE UserID = "id";

}
export default UserProfile;
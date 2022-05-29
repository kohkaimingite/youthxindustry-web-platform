import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';


function UserProfile() {
    
    const [ProfList, setProfList] = useState([]);
    const getProfile = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/Profile").then((response) => {

            console.log(response);
            setProfList(response.data);

        });
    });
    
    const [Email, setEmail] = useState(ProfList.Email);
    const [Name, setName] = useState(ProfList.Name);
    const [Number, setNumber] = useState(ProfList.MobileNumber);
    const columns = ProfList[0] && Object.keys(ProfList[0]);
    
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
                        <text align="Left">{Name}</text><br />
                        <text align="Left">{Email}</text><br />
                        <text align="Left">{Number}</text><br />

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
// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function OppoPage() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    return (
        
        
        <div className="App">
            <NavBar />
            <div className="main">
            <h1>Search Function</h1>
            <table class="oppoTable table-hover">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>City</th>
                    <th>Period</th>
                    
                </tr>


                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                </tr>
                

                </table>
                </div>
        </div>


    );
}



export default OppoPage;

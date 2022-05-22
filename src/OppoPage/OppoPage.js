// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible'


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
                <div class="sidenav">

                    <h2>Filter!</h2>
                    <h4>Filter for Job</h4>
                    <div>
                        <form action="/action_page.php">
                            <input type="checkbox" id="IT" name="IT" value="IT" />
                            <label for="IT"> IT</label><br />
                            <input type="checkbox" id="Finance" name="Finance" value="Finance" />
                            <label for="Finance"> Finance</label><br />
                            <input type="checkbox" id="Healthcare" name="Healthcare" value="Healthcare" />
                            <label for="Healthcare"> Healthcare</label><br />
                        </form>

                    </div>
                    <h4>Filter for Location</h4>
                    <div>
                        <form action="/action_page.php">
                            <input type="checkbox" id="North" name="North" value="North" />
                            <label for="North"> North</label><br />
                            <input type="checkbox" id="South" name="South" value="South" />
                            <label for="South"> South</label><br />
                            <input type="checkbox" id="East" name="East" value="East" />
                            <label for="East"> East</label><br />
                            <input type="checkbox" id="West" name="West" value="West" />
                            <label for="West"> West</label><br />
                        </form>

                    </div>
                    <input type="text" placeholder="Search.." />
                    <button>submit/search</button>
                </div>
                
            <table class="oppoTable">
                <tr>
                    <th>Job Name</th>
                    <th>Company</th>
                    <th>Pay?</th>
                    <th>Location</th>
                    
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

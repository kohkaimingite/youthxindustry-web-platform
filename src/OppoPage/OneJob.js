// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import "./StyleSheet1.css" ;


function OneJob() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (


        <div className="App">
            <NavBar />
            <h1 style={{ padding: '0px 20px', textAlign: 'left' }}>Reviews</h1>
            <hr style={{ border: '100px', width: '30%', height: '3px'}}/>
            <h4 style={{ padding: '0px 20px', textAlign: 'left' }}>User star rating</h4>
            <h5 style={{ padding: '0px 20px', textAlign: 'left' }}>Average 3.5 out of 5</h5>

            
            <div class="side">
                <div>5 star</div>
            </div>
            <div class="middlee">
                <div class="containerBack">
                    <div class="bar5"></div>
                </div>
            </div>
            <div class="side right">
                <div>150</div>
                </div>


            <div class="side">
                <div>4 star</div>
            </div>
            <div class="middlee">
                <div class="containerBack">
                    <div class="bar4"></div>
                </div>
            </div>
            <div class="side right">
                <div>150</div>
            </div>
            <div class="side">
                <div>3 star</div>
            </div>
            <div class="middlee">
                <div class="containerBack">
                    <div class="bar3"></div>
                </div>
            </div>
            <div class="side right">
                <div>150</div>
            </div>
            

            <div class="side">
                <div>2 star</div>
            </div>
            <div class="middlee">
                <div class="containerBack">
                    <div class="bar2"></div>
                </div>
            </div>
            <div class="side right">
                <div>150</div>
            </div>

            <div class="side">
                <div>1 star</div>
            </div>
            <div class="middlee">
                <div class="containerBack">
                    <div class="bar1"></div>
                </div>
            </div>
            <div class="side right">
                <div>150</div>
            </div>
            <h3>HI</h3>
        </div>




    );
}



export default OneJob;

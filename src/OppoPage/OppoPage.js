// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";

function OppoPage() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    return (

        <div className="main">
            <NavBar />
            <h1>Search Function</h1>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            <List input={inputText} />
        </div>
    );
}

export default OppoPage;

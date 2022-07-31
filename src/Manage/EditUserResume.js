// JavaScript source code
import LoggedNavBar from '../components/LoggedNavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import hexToArrayBuffer from 'hex-to-array-buffer'
const arrayBufferToHex = require('array-buffer-to-hex')


function EditUserResume() {
    const [Check, setCheck] = useState("");
    const [Resume, setResume] = useState();
    const [ProfList, setProfList] = useState([]);
    const columns = ProfList[0] && Object.keys(ProfList[0]);
    //const fileSelector = document.getElementById('resume');
    //fileSelector.addEventListener('change', (event) => {
    //    const fileList = event.target.files;
    //    console.log(fileList);
    //});
    const getProfile = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/profile").then((response) => {

            console.log(response);
            setProfList(response.data);

        });
    });

    return (
        <div className="App">
            <LoggedNavBar />
                

                <div className="AlignMiddle">

                <form>
                        <h3>New Resume: </h3>

                        <br />
                    <label>Upload Your Resume: </label>
                    <input name="resume123" type="file" id='Resume' placeholder="Upload file..." onChange={e => setResume(e.target.value)}></input><br />
                    <button onClick={submit}> Confirm </button>
                        <text align='left'>{Check}</text>
                    </form>
            </div>

        </div>
    )
    function stringToBinary(str) {
        let strOut = "";
        for (var i = 0; i < str.length; i++) {
            strOut += str[i].charCodeAt(0).toString(2);
        }
        return strOut
    }

    function ArrayBufferToBinary(buffer) {
        // Convert an array buffer to a string bit-representation: 0 1 1 0 0 0...
        var dataView = new DataView(buffer);
        var response = "", offset = (8 / 8);
        for (var i = 0; i < dataView.byteLength; i += offset) {
            response += dataView.getInt8(i).toString(2);
        }
        return response;
    }

    function submit() {
       
        //File theFile;   method="POST" action="/XIAOQUAN" reader.readAsText(documentBlob)
        //theFile = new File(resume)
        const file = new File([Resume], "Resume")


        const file123 = document.getElementById('Resume').files[0];
        const reader = new FileReader()
        //reader.readAsBinaryString(file123)
        //reader.readAsArrayBuffer(file123)
        reader.readAsDataURL(file123)
        reader.onloadend = () => {
            const butt = reader.result
            const string = arrayBufferToHex(reader.result)
            const binaryString = reader.result // Binary string.
            var hexa = parseInt(binaryString, 2).toString(16).toUpperCase();
            var asshoe = "x'"+hexa+"'"
            const lol = reader.readAsText(file123);
            const documentBlob = new Blob([file123], { type: 'application/pdf' })

            axios.post("http://localhost:3001/EditUResume", {
                //Resume: string
                Resume: binaryString
            }).then(() => {
                console.log("Test");
                /*setCheck(response.data);*/
                window.location = "http://localhost:3000/Profile";
            });
        }


        
        //reader.onload = function (e) {
        //    const blob = new Blob([new Uint8Array(Resume)], { type: file.pdf });
        //    console.log(blob instanceof Blob)
            
        //};

        //const fileSelector = document.getElementById('file-selector');
        //fileSelector.addEventListener('change', (event) => {
        //    const fileList = event.target.files;
        //    console.log(fileList);
        //});
        
        //axios.post("http://localhost:3001/XIAOQUAN", {
        //    Resume: file123.name
        //}).then(() => {
        //    console.log("Test");
        //    /*setCheck(response.data);*/
        //    /*window.location = "http://localhost:3000/Profile";*/
        //});
    };
}

export default EditUserResume;
// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function uploadFile({ data }) {
    const imageFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb("Please upload only images.", false);
        }
    };
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __basedir + "/resources/static/assets/uploads/");
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
        },
    });
    var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
    module.exports = uploadFile;
    //testing(row[columns[0]],wtfTesting(row[columns[0]]) ), row[columns[0]]
    //addFav()
    //addFav(testing(row[columns[0]],wtfTesting(row[columns[0]]) ), row[columns[0]])
    
    
    return (
        
        
        

            
        );
}
//<td><button>{row[columns[0]]}</button></td>
//addFav(checkFav(getFav()))
//, row[columns[0]]
//<td><button onClick={() => addFav( checkFav( row[columns[0]]) , row[columns[0]] ) }>{row[columns[0]]}</button></td>
//<td><button onClick={() => { addFav(testing(), row[columns[0]]); wtfTesting(row[columns[0]]) }}>{row[columns[0]]}</button></td>
//<td><button onClick={() => addFav(testing( wtfTesting(row[columns[0]]) ), row[columns[0]])}>{row[columns[0]]} {test}</button></td>
//row[columns[0]])
//<td><button onClick={() => addFav(testing(row[columns[0]],wtfTesting(row[columns[0]]) ), row[columns[0]])}>{row[columns[0]]} {test}</button></td>
const testwew =
{
    position: "fixed"
        

}
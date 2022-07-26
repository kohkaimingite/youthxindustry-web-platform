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
    const fs = require("fs");
    const db = require("../models");
    const Image = db.images;
    const uploadFiles = async (req, res) => {
        try {
            console.log(req.file);
            if (req.file == undefined) {
                return res.send(`You must select a file.`);
            }
            Image.create({
                type: req.file.mimetype,
                name: req.file.originalname,
                data: fs.readFileSync(
                    __basedir + "/resources/static/assets/uploads/" + req.file.filename
                ),
            }).then((image) => {
                fs.writeFileSync(
                    __basedir + "/resources/static/assets/tmp/" + image.name,
                    image.data
                );
                return res.send(`File has been uploaded.`);
            });
        } catch (error) {
            console.log(error);
            return res.send(`Error when trying upload images: ${error}`);
        }
    };
    module.exports = {
        uploadFiles,
    };
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
// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DatatableFav({ data }) {
    const [OppoList, setOppoList] = useState([]);
    const columns = data[0] && Object.keys(data[0]);
    //const columns = OppoList[0] && Object.keys(OppoList[0]);
    function deleteFav(oppoID) {
        if (window.confirm("Remove from favourites?")) {

            axios.post("http://localhost:3001/deleteFav", {
                OppID: parseInt(oppoID),
                UserID: 2
            }).then(() => {
                alert("Removed from your favourites");
                console.log("Deleted sucessfully!");
            });
        } else {
            alert("Opportunity not removed")
        }
    }
   
    return (

        <table class="oppoTable">
            <tr>
                <th>Job Code</th>
                <th>Job Name</th>
                
                <th>Region</th>
                
                <th>Job Categories</th>
                <th>Diploma</th>
                <th>Pay</th>
                <th>Delete?</th>

            </tr>
            {data.map(row => <tr>
                <td style={{ textAlign: 'left' }}>{row["OppID"]}</td>
                <td style={{ textAlign: 'left' }}><a href={"/Oppo/" + row["OppID"]}>{row["Name"]}</a></td>

                <td style={{ textAlign: 'left' }}>{row["Location"]}</td>

                <td style={{ textAlign: 'left' }}>{row["Type"]}</td>
                <td style={{ textAlign: 'left' }}>{row["Qualification"]}</td>
                <td style={{ textAlign: 'left' }}>{row["Pay"]}</td>
                <td><FontAwesomeIcon icon={faTrash} onClick={() => deleteFav(row[columns[0]])}>delete {row[columns[0]]}</FontAwesomeIcon></td>

            </tr>)}
        </table>


    );
}
// onClick={() => deleteFav({row[columns[0]]})}
//<td><button>{row[columns[1]]}</button></td>
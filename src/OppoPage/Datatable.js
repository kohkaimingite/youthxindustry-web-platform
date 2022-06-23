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

export default function Datatable({ data }) {
    const [OppoList, setOppoList] = useState([]);
    const columns = data[0] && Object.keys(data[0]);
    
    const [userID, setUserID] = useState(2);
    const [favList, setFavList] = useState([]);
    const [lol, setLol] = useState([]);
    const favColumns = favList[0] && Object.keys(favList[0]);
    const [test, setTest] = useState("0");
    const [wtf, setWtf] = useState([]);
    //const columns = OppoList[0] && Object.keys(OppoList[0]);
    //,CheckFavOppo
     //       UserID: userID
    useEffect(() => {
        axios.post("http://localhost:3001/FavOppo", {
            
        }).then((response) => {
            console.log("added sucessfully!");
            setWtf(response.data);
            return wtf;
        });

    });
    function wtfTesting(oppoID) {
        axios.post("http://localhost:3001/FavOppo", {
            OppID: parseInt(oppoID)
        }).then((response) => {
            console.log("added sucessfully!");
            setWtf(response.data);
            return wtf;
        });

    }
    //testing(row[columns[0]],wtfTesting(row[columns[0]]) ), row[columns[0]]
    //addFav()
    //addFav(testing(row[columns[0]],wtfTesting(row[columns[0]]) ), row[columns[0]])
    function testing(table,trash) {
        
        for (var i = 0; i < wtf.length; i++) {
            if (wtf[i].OppID === table) {
                setTest("1");
                alert("You alrdy added this in fav");
                return false;
                break;
            } 
        }

    }
    
    //addFav(testing( wtfTesting(row[columns[0]]) ), row[columns[0]])
    function addFav(boo,oppoID) {
        if (boo !== false) {
            axios.post("http://localhost:3001/addFav", {
                OppID: parseInt(oppoID),
                UserID: 2
            }).then(() => {
                console.log("added sucessfully!");
                alert("added")
                setTest("0")
            });
        } else {
            alert(boo)
            
        }
    }
    //alert("cannot add");
    //errorrr
    function getFav() {
        axios.post("http://localhost:3001/FavOppo", {
            UserID: userID
        }).then((response) => {
            console.log("added sucessfully!");
            setFavList(response.data);
            return favList;
        });
    }
    
    function checkFav(oppoID) {
        getFav();
        favList.map((val, key) => {
            if (oppoID === favList.OppID) {
                setTest("1")
                return false;
                
            } else {

                return true;
            }
        })
    }

    
    return (
        
        <table class="oppoTable">

            <tr>
                <th>Job Code</th>
                <th>Job Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Address</th>
                <th>Job Categories</th>
                
                

            </tr>
            {data.map(row => <tr>
                {
                    columns.map(column => <td style={{ textAlign: 'left' }}>{row[column]}</td>)
                    
                }
                
            </tr>)}
        </table>
        

            
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
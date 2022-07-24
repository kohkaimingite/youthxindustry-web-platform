// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import OppoViewFormat from './OppoViewFormat.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar,faLocationDot,faHeart } from "@fortawesome/free-solid-svg-icons";

export default function LoggedDatatable({ data }) {
    const [OppoList, setOppoList] = useState([]);
    const columns = data[0] && Object.keys(data[0]);
    
    const [userID, setUserID] = useState(2);
    const [favList, setFavList] = useState([]);
    const [lol, setLol] = useState([]);
    const favColumns = favList[0] && Object.keys(favList[0]);
    const [test, setTest] = useState("0");
    
    const [checkFavList, setCheckFavList] = useState([]);
    //const columns = OppoList[0] && Object.keys(OppoList[0]);
    //,CheckFavOppo
     //       UserID: userID
    useEffect(() => {
        axios.post("http://localhost:3001/FavOppo", {
            
        }).then((response) => {
            console.log("added sucessfully!");
            setCheckFavList(response.data);
            return checkFavList;
        });

    });
    function checkFavListFunction(oppoID) {
        axios.post("http://localhost:3001/FavOppo", {
            OppID: parseInt(oppoID)
        }).then((response) => {
            console.log("added sucessfully!");
            setCheckFavList(response.data);
            return checkFavList;
        });

    }
    //testing(row[columns[0]],wtfTesting(row[columns[0]]) ), row[columns[0]]
    //addFav()
    //addFav(testing(row[columns[0]],wtfTesting(row[columns[0]]) ), row[columns[0]])
    function deleteFav(oppoID) {
        axios.post("http://localhost:3001/deleteFav", {
            OppID: parseInt(oppoID),
            UserID: 2
        }).then(() => {
            console.log("Deleted sucessfully!");
        });
    }
    const [checkFavBoolean, setCheckFavBoolean] = useState(true);
    function testing(table) {
        
        for (var i = 0; i < checkFavList.length; i++) {
            if (checkFavList[i].OppID === table) {
                setTest("1");
                deleteFav(table)
                alert("Removed from your favourites");
                return false;
                break;
            } 
        }

    }
    function colourFav(table) {

        for (var i = 0; i < checkFavList.length; i++) {
            if (checkFavList[i].OppID === table) {
                
                return true;
                break;
            }
        }

    }
    
    //addFav(testing( wtfTesting(row[columns[0]]) ), row[columns[0]])
    function addFav(boo,oppoID) {
        if (boo !== false) {
            axios.post("http://localhost:3001/addFav", {
                OppID: parseInt(oppoID),
                
            }).then(() => {
                console.log("added sucessfully!");
                alert("added")
                setTest("0")
            });
        } else {
            
            
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

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9",
        red:"#f04f4f"

    };
    return (
        <div >
            
            
            <div style={{height:"120px", backgroundColor: "red", borderRadius: "5px", marginLeft: "auto", marginRight: "2%", marginBottom: "20px", width: "79%"}} >
                <div class="badCard">
                    <div class="content">
                        <h6 style={{ textAlign: 'left'}}>Job ID <FontAwesomeIcon icon={faStar} ></FontAwesomeIcon></h6>

                        <h4 class="job-title" style={{ textAlign: 'left' }}>Job name</h4>
                        <h5 class="company" style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faLocationDot} ></FontAwesomeIcon> Location</h5>
                        
                        
                    </div>
                </div>

            </div>

            <div style={{ height: "120px", borderRadius: "5px", marginLeft: "auto", marginRight: "2%", marginBottom: "20px", width: "79%" }} >
                <div class="badCard">
                    <div class="content">
                        <h6 style={{ textAlign: 'left' }}>Job ID <FontAwesomeIcon icon={faStar} ></FontAwesomeIcon></h6>
                        <a class="sideCard">test</a>
                        <h4 class="job-title" style={{ textAlign: 'left' }}>Job name</h4>
                        
                        <h5 class="company" style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faLocationDot} ></FontAwesomeIcon> Location</h5>


                    </div>
                </div>

            </div>
            

            
        <div class="test">

            
                
                {data.map((row, key) =>
                    <div style={{ height: "120px", borderRadius: "5px", marginLeft: "auto", marginRight: "2%", marginBottom: "20px", width: "79%" }} >
                        <div class="badCard">
                            <div class="content">
                                <h6 style={{ textAlign: 'left' }}>Job ID : {row["OppID"]}  <FontAwesomeIcon icon={faHeart} size="lg" color={colourFav(row[columns[0]]) ? colors.red : colors.grey} onClick={() => addFav(testing(row[columns[0]]), row[columns[0]])}>{row[columns[0]]} {test}</FontAwesomeIcon></h6>
                                <a class="sideCard">{row["Type"]}</a>
                                <h4 class="job-title" style={{ textAlign: 'left' }}><a href={"/Oppo/" + row["OppID"]}>{row["Name"]}</a></h4>

                                <h5 class="company" style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faLocationDot} ></FontAwesomeIcon> {row["Location"]}</h5>


                            </div>
                        </div>

                    </div>
                )}
            
            
        </div>
        </div>

            
        );
}
//{<table class="oppoTable">
//    data.map((row, key) => <tr>
//        <td style={{ textAlign: 'left' }}>{row["OppID"]}</td>
//        <td style={{ textAlign: 'left' }}><a href={"/Oppo/" + row["OppID"]}>{row["Name"]}</a></td>

//        <td style={{ textAlign: 'left' }}>{row["Location"]}</td>

//        <td style={{ textAlign: 'left' }}>{row["Type"]}</td>
//        <td style={{ textAlign: 'left' }}>{row["Qualification"]}</td>
//        <td style={{ textAlign: 'left' }}>{row["Pay"]}</td>
//        <td><FontAwesomeIcon icon={faStar} color={colourFav(row[columns[0]]) ? colors.orange : colors.grey} onClick={() => addFav(testing(row[columns[0]]), row[columns[0]])}>{row[columns[0]]} {test}</FontAwesomeIcon></td>

//    </tr>)</table>
//}



//<td style={{ textAlign: 'left' }}>{row["Description"]}</td>
//<td style={{ textAlign: 'left' }}>{row["Address"]}</td>
//, checkFavListFunction(row[columns[0]])
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

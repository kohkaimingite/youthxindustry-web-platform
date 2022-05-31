// JavaScript source code
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';
import Datatable from './Datatable';
require('es6-promise').polyfill();
require('isomorphic-fetch');


const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

function MakingReview() {
    
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)
    const [jobList, setJobList] = useState([]);
    const [data, setData] = useState([]);
    const columns = data[0] && Object.keys(data[0]);
    const [userID,setUserID] = useState(1);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [jobChose, setJobChose] = useState("0");
    const [charCount, setCharCount] = useState(0);
    const [check, setCheck] = useState(false);
    const handleClick = value => {
        setRating(value)

    }
    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    const [test, setTest] = useState("");
    //setCheck(false);
    function verify(job) {
        if (job === "0" && review === "") {
            setTest("Please select job code and enter review!!!")
            return false;

        } else if (review === "") {
            setTest("Please enter review!!!")
            return false;
        } else if (job === "0") {
            setTest("Please select job code!!!")
            return false;
        } else {
            setTest("checked!")
            return true;
        }
            
        
    }
    const addReview = () => {
        axios.post("http://localhost:3001/addReview", {
            OppID: parseInt(jobChose),
            UserID: userID,
            Review: review,
            Rating: rating
        }).then(() => {
            console.log("Added sucessfully!");
        });
    };
     
    function addTest() {
        axios.post("http://localhost:3001/addReview", {
            OppID: parseInt(jobChose),
            UserID: userID,
            Review: review,
            Rating: rating
        }).then(() => {
            console.log("Added sucessfully!");
        });
    };
    function submit(checkStatus) {
        if (checkStatus === true) {
            addTest();
        } else {
            return;
        }

    }

    useEffect(() => {
        axios.get("http://localhost:3001/getReview").then((response) => {

            console.log(response);
            setJobList(response.data);
        });

    });
    return (
        <div className="App">
            <NavBar />
            
            
            <div className="main">
                
                <h2>Star rating and review</h2>
                <div style={styles.stars}>
                    {stars.map((_, index) => {
                        return (
                            <FontAwesomeIcon icon={faStar} key={index}
                                size={24}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(hoverValue || rating) > index ? colors.orange : colors.grey}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}></FontAwesomeIcon>



                        )
                    })}
                </div>
                <div >
                    
                    <h4>Chose job code</h4>
                    <select onChange={(e) => setJobChose(e.target.value)} >
                        <option value="0">Select Job Code:</option>
                        {jobList.map((val, key) => {
                            return <option value={ val.OppID }  >{val.OppID}</option>;
                        })}
                        
                    </select>
                    <h4>{jobChose}</h4>
                </div>

                <textarea placeholder="Provide some reviews! Maximum 150 characters" id="review" name="review" value={review} onChange={e => { setReview(e.target.value); setCharCount(e.target.value.length) }} style={styles.textArea} maxLength="150"> </textarea>
                <h2>{review}</h2>
                <button onClick={() => submit(verify(jobChose))}>Submitttttttt</button>
                <h4>{test}</h4>
                <h4>Characters typed: {charCount}</h4>
                 
            </div>
            

        </div>
    );
}
//{val.OppID}
//<button onClick={addTest}>Submitttttttt</button>
//<button onClick={addReview}>Submitttttttt</button>
//<button onClick={() => submit(verify(jobChose))}>Submitttttttt</button>
//<button onClick={() => addTest()}>Submitttttttt</button>

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    textArea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 200,
        width: 300

    },
    stars: {
        display: "flex",
        flexDirection: "row"
    },
    
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

};

export default MakingReview;
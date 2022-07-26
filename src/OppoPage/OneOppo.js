// JavaScript source code
import NavBar from '../components/NavBar'
import ListNavBar from '../components/ListNavBar'
import LoggedNavBar from '../components/LoggedNavBar'
//LoggedNavBar
import { React, useState, useEffect } from "react";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';
import LoggedDatatable from './LoggedDatatable';
import testoneopp from './testoneopp.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import {faDollarSign, faStar, faLocationDot, faHeart, faGraduationCap, faComputer, faCoins, faBriefcaseMedical, faConciergeBell, faBookOpen, faCompassDrafting, faPalette, faCalendarDays, faUtensils, faGlobe, faBox, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";

import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
require('es6-promise').polyfill();
require('isomorphic-fetch');


function OneOppo() {
    //button to scrol up input-files
    const [showScrollBtn, setShowScrollBtn] = useState("");
    const { id } = useParams();
    
    const [oneOppo, setOneOppo] = useState([]);
    const [oneOppoType, setOneOppoType] = useState("");
    const [oneOppoCompany, setOneOppoCompany] = useState([]);
    const [suggestedOpp, setSuggestedOpp] = useState([]);
    
    
    

    // display file name if file has been selected
    
    
    useEffect(() => {
        window.addEventListener('scroll', scrollAppear );
    }, []);

    useEffect(() => {
        axios.post("http://localhost:3001/getoneOppo", {
            OppID: id
        }).then((response) => {
            console.log("got one oppo!");
            setOneOppo(response.data);
            setOneOppoType(response.data[0].Type)
            return oneOppo;
        });
    });
    useEffect(() => {
        axios.post("http://localhost:3001/getSuggestedJobByType", {
            OppID: id,
            Type: oneOppoType
        }).then((response) => {
            console.log("got suggested oppo!");
            setSuggestedOpp(response.data);
            return setSuggestedOpp;
        });
    });
    useEffect(() => {
        axios.post("http://localhost:3001/getOneOppoCompany", {
            OppID: id
        }).then((response) => {
            console.log("got one oppo company!");
            setOneOppoCompany(response.data);
            return oneOppoCompany;
        });
    });
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    
    const scrollAppear = () => {
        if (window.pageYOffset  > 100) {

            setShowScrollBtn(true);
        } else {

            setShowScrollBtn(false);
        }
    }
    function iconJobType(jobType) {
        if (jobType === "IT") {
            return faComputer
        } else if (jobType === "Finance") {
            return faCoins
        } else if (jobType === "Healthcare") {
            return faBriefcaseMedical
        } else if (jobType === "Education") {
            return faBookOpen
        } else if (jobType === "Customer Service") {
            return faConciergeBell
        } else if (jobType === "Engineering") {
            return faCompassDrafting
        } else if (jobType === "Art") {
            return faPalette
        } else if (jobType === "Event") {
            return faCalendarDays
        } else if (jobType === "F&B") {
            return faUtensils
        } else if (jobType === "Tourism") {
            return faGlobe
        } else if (jobType === "Retail") {
            return faBox
        } else if (jobType === "Marketing") {
            return faMoneyBillTrendUp
        }

    }
    
    return (
        //onSubmit={ilterdata(OppoList)}
        //
         //class="oppoNFavTitle"
        <div className="App">
            <LoggedNavBar />


            <div>

                <div style={{ textAlign: 'left' }}>
                    <div class="testreal">
                    <topSectionTEST>

                            <jobHeaderTEST>
                                <div class="cardJobTtitle">
                                        {oneOppo.map((row, key) => <h6>Job ID: {row["OppID"]}</h6>)}
                                        {oneOppo.map((row, key) => <h2>{row["Name"]}</h2>)}
                                    {oneOppo.map((row, key) => <h6><FontAwesomeIcon icon={iconJobType(row["Type"])} >
                                    </FontAwesomeIcon> {row["Type"]}</h6>)}
                                    {oneOppo.map((row, key) => <h6><FontAwesomeIcon icon={faLocationDot} >
                                    </FontAwesomeIcon> {row["Location"]}</h6>)}
                                    {oneOppo.map((row, key) => <h6><FontAwesomeIcon icon={faDollarSign} >
                                    </FontAwesomeIcon> {row["Pay"]}</h6>)}
                                </div>
                                <div class ="cardJobDetail" >
                                    <h3 >Job Details</h3>
                                    <h5>Description:</h5>
                                    {oneOppo.map((row, key) => <p style={{ fontSize: "15px" }}>{row["Description"]}</p>)}
                                    <h5>Address: </h5>
                                    {oneOppo.map((row, key) => <p style={{ fontSize: "15px" }}>{row["Address"]}</p>)}
                                    
                                    
                                    <h5>Qualification Requirements: </h5>
                                    {oneOppo.map((row, key) => <p style={{ fontSize: "15px" }}>{row["Qualification"]}</p>)}
                                    
                                    
                                    
                                    </div>
                        </jobHeaderTEST>
                            <companyTEST>
                                <div class="cardCompany">
                                    {oneOppoCompany.map((row, key) => <h3>{row["Name"]}</h3>)}
                                    
                                    {oneOppoCompany.map((row, key) => <h5>{row["UserBio"]}</h5>)}
                                    <h5>Contact Number:</h5>
                                    {oneOppoCompany.map((row, key) => <p style={{ fontSize: "15px" }}>{row["ContactNumber"]}</p>)}

                                    
                                    <div style={{ marginBottom: "10px" }}>
                                        {oneOppoCompany.map((row, key) => <button class="btn btn-primary" style={{ marginTop: "20px", textAlign: "left" }} ><a style={{ color: "white", fontWeight: "500", textDecoration: "none",paddingLeft:"7px" ,paddingRight:"7px"}} href={"/ViewCompanyProfile/" + row["Name"]}>View Company profile</a></button>)}<br/>
                                        {oneOppo.map((row, key) => <button class="btn btn-primary" style={{ marginTop: "10px" }} ><a style={{ color: "white", fontWeight: "500", textDecoration: "none", paddingLeft: "7px", paddingRight: "7px"}} href={"/SubmitApplication/" + row["OppID"]}>Apply Now</a></button>)}
                                    </div>
                                </div>
                                <div class="cardSuggest">
                                    
                                    <h3 class="cardSuggestTitle">Related jobs by Category</h3>
                                    <div style={{  padding: "24px 32px" }} >
                                        
                                        {suggestedOpp.map((row, i, key) =>
                                            <div>
                                                <h6>Job ID: {row["OppID"]}</h6>
                                                <a href={"/Oppo/" + row["OppID"]}><h4>{row["Name"]}</h4></a>
                                                <h6>Pay: {row["Pay"]}</h6>
                                                {i === key.length - 1 ? <hr style={{ visibility: "hidden" }} /> : <hr />}
                                                </div>
                                        
                                            )}

                                        </div>
                                    </div>  
                        </companyTEST>
                        </topSectionTEST>
                        </div>
                    
                </div>
                
                
                
                
                
                <button id="scrollUp" class="scrollToTop" onClick={scrollToTop} style={{ opacity: showScrollBtn ? 100 : 0 }}><FontAwesomeIcon icon={faArrowUpLong} class="arrowUp" /></button>
            </div>
            
            
            
        </div>


    );
}
//isVisible ? 'opacity-100' : 'opacity-0'
                //opacity: showScrollBtn ? 100 : 0 
                //opacity: showScrollBtn ? 100 : 0 
//<Datatable data={search(OppoList)} />
//<Datatable data={typeBox(search(OppoList))} />
export default OneOppo;

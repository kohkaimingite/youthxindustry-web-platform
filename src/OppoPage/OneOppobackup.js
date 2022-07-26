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
    //button to scrol up
    const [showScrollBtn, setShowScrollBtn] = useState("");
    const { id } = useParams();
    
    const [oneOppo, setOneOppo] = useState([]);
    const [oneOppoCompany, setOneOppoCompany] = useState([]);
    useEffect(() => {
        window.addEventListener('scroll', scrollAppear );
    }, []);
    useEffect(() => {
        axios.post("http://localhost:3001/getoneOppo", {
            OppID: id
        }).then((response) => {
            console.log("got one oppo!");
            setOneOppo(response.data);
            return oneOppo;
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
    
    return (
        //onSubmit={ilterdata(OppoList)}
        //
         //class="oppoNFavTitle"
        <div className="App">
            <LoggedNavBar />


            <div>

                <div style={{ textAlign: 'left' }}>

                    <topSection>
                        <jobHeader>
                    {oneOppo.map((row, key) => <h5>Job ID: {row["OppID"]}</h5>)}
                    {oneOppo.map((row, key) => <h2>{row["Name"]}</h2>)}
                    {oneOppo.map((row, key) => <h5>Type: {row["Type"]}</h5>)}
                    {oneOppo.map((row, key) => <h5>Region: {row["Location"]}</h5>)}
                    </jobHeader>
                        <company>
                            {oneOppoCompany.map((row, key) => <h2>{row["Name"]}</h2>)}
                            {oneOppoCompany.map((row, key) => <h4>{row["UserBio"]}</h4>)}
                            {oneOppoCompany.map((row, key) => <h4>Contact Number: {row["ContactNumber"]}</h4>)}

                            {oneOppoCompany.map((row, key) => <button style={{ marginTop: "50px" }} ><a href={"/ViewCompanyProfile/" + row["Name"]}>View Company profile</a></button>)}
                            <div style={{ marginBottom: "10px" }}>
                                
                                {oneOppo.map((row, key) => <button style={{ marginTop: "10px" }} ><a href={"/SubmitApplication/" + row["OppID"]}>Apply Now</a></button>)}
                                </div>  
                        </company>
                    </topSection>
                    <bottomSection>
                <h3 style={{ marginTop:"50px" }}>Job Details</h3>
                    {oneOppo.map((row, key) => <h5>Description: {row["Description"]}</h5>)}
                    {oneOppo.map((row, key) => <h5>Address: {row["Address"]}</h5>)}
                    {oneOppo.map((row, key) => <h5>Pay: SGD{row["Pay"]}</h5>)}
                        {oneOppo.map((row, key) => <h5 style={{ marginBottom: "50px"}}>Qualification Requirements: {row["Qualification"]}</h5>)}
                        </bottomSection>
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

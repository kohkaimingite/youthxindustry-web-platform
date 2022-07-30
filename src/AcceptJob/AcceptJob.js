import React, { useState, useEffect, Fragment } from "react";
import Axios from 'axios';
import LoggedNavBar from "../components/LoggedNavBar";
import { red } from "@mui/material/colors";



export default function AcceptJob() {

    Axios.defaults.withCredentials = true;

    const [oppList, setOppList] = useState([]);
    const [status, setStatus] = useState('');
    
    useEffect(() => {
        Axios.post("http://localhost:3001/getApprovedOppoToAccept").then((response) => {

            setOppList(response.data);
            console.log(response.data);


        });
    }, []);

    const acceptApprovedOppo = (OppID) => {
        if (window.confirm("Accept Offer? You will no longer be able to accept another offer!")) {
            Axios.post("http://localhost:3001/userAcceptsOffer", {
                OppID: OppID
            }).then(() => {
                console.log("Accepted");    
                window.location.reload();

            })
                .catch((err) => {
                    if (err.response.status === 409) {
                        setStatus("You had already accepted an offer!");
                    } else {
                        setStatus("No server response!");
                    }
                });
        } else {
            window.alert("Action Cancelled")
        }
    }


    return (
        <div>
            <LoggedNavBar />
            <h1 style={{ textAlign: "left" }}>Accept Offers</h1>
            <p style={{ textAlign: "left", marginLeft: '12px', fontSize: '16px', color: 'red' }}>*Once an offer is accepted, you can no longer be able to accept other offers</p>
            <div className="ApprovedTableDiv" >
                <h1 style={{ fontSize: '20px' }}>Offers received: {oppList.length}</h1>
                <p style={{ color: 'red' }}> {status}</p>
                <table className="AddOppoPartnerApprovedTable">
                    <tbody>
                        <tr>
                            <th>Job Code</th>
                            <th>Job Name</th>   
                            <th>Action</th>

                        </tr>
                        {oppList.map((opp) => (
                            <tr key={opp.OppID}>
                                <td>{opp.OppID}</td>
                                <td>{opp.Name}</td>
                                <td>
                                    <button type="button" class="btn btn-primary" onClick={() => acceptApprovedOppo(opp.OppID)}>Accept</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>       
        )
};
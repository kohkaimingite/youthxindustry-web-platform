import React, { useState, useEffect } from "react";
import Axios from 'axios';
import LoggedNavBar from "../components/LoggedNavBar";
import emailjs from '@emailjs/browser';



export default function AcceptJob() {

    Axios.defaults.withCredentials = true;

    const [oppList, setOppList] = useState([]);
    const [status, setStatus] = useState('');
    const [acceptedText, setAcceptedText] = useState('');

    const emailInfo = {
        OppID: '',
        Company: '',
        CompanyEmail: '',
        Applicant: '',
        Number: '',
    };


    function EmailAccept(OppID) {
        Axios.post("http://localhost:3001/oppForEmailAcceptance", {
            OppID: parseInt(OppID),
        }).then((response) => {
            emailInfo.OppID = response.data[0].OppID;
            emailInfo.Company = response.data[0].Name;
            emailInfo.CompanyEmail = response.data[0].Email;
            Axios.post("http://localhost:3001/userForEmailAcceptance", {
            }).then((response) => {
                emailInfo.Applicant = response.data[0].Name;
                emailInfo.Number = response.data[0].ContactNumber;
                emailjs.send('service_x7yymg6', 'template_fmppy0o', emailInfo, 'IsHv-S74WPDFFkoTT')
                    .then((result) => {
                        console.log(result.text);
                        console.log(emailInfo);
                        setAcceptedText("Job Accepted! JobCode:" + OppID);
                    }, (error) => {
                        console.log(error.text);
                    });
            });

        });
    }
    console.log(emailInfo);

    useEffect(() => {
        Axios.post("http://localhost:3001/getApprovedOppoToAccept").then((response) => {

            setOppList(response.data);
            console.log(response.data);


        });
    }, []);

    function acceptApprovedOppo(OppID) {
        if (window.confirm("Accept Offer? You will no longer be able to accept another offer! An email will also be send to notify the company.")) {
            Axios.post("http://localhost:3001/userAcceptsOffer", {
                OppID: parseInt(OppID),

            }).then((response) => {
                console.log("Accepted");
                EmailAccept(OppID);


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
            <h1 style={{ textAlign: "left" }}>Accept Offer</h1>
            <p style={{ textAlign: "left", marginLeft: '12px', fontSize: '16px', color: 'red' }}>*Once an offer is accepted, you will no longer be able to accept other offers</p>
            <div className="ApprovedTableDiv" >
                <h1 style={{ fontSize: '20px' }}>Offers received: {oppList.length}</h1>
                <p style={{ color: 'limegreen' }}>{acceptedText}</p>
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
                                    <button type="button" class="btn btn-primary" onClick={() => { acceptApprovedOppo(opp.OppID) }}>Accept</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};
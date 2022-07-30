import React, { useState, useEffect, Fragment } from "react";
import Axios from 'axios';
import PartnerNavBar from '../components/PartnerNavBar';
import "./AddOppoPartnerApproved.css";



export default function AddOppoPartnerApproved() {

    Axios.defaults.withCredentials = true;

    const [oppList, setOppList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/oppListingWithStatus").then((response) => {

            setOppList(response.data);
            console.log(response.data);


        });
    }, []);

    const submitApprovedOppo = (OppID) => {
        Axios.post("http://localhost:3001/postApprovedOppo", {
            OppID: OppID
        }).then(() => {
            console.log("Posted");
            window.location.reload();

        })
            .catch(() => {
                console.log("Not posted");
            });

    }

    return (
        <div>
            <PartnerNavBar />
            <h1 style={{ textAlign: "left" }}>Add Approved Opportunities </h1>
            <p style={{ textAlign: "left", marginLeft: '12px', fontSize: '16px', color: 'blue' }}>*To approve an opportunity, click on submit Oppo</p>
            <p style={{ textAlign: "left", marginLeft: '12px', fontSize: '16px', color: 'red' }}>*Opportunities have to be approved by admin before you are allowed to post</p>
            <div className="ApprovedTableDiv" >
                <table className="AddOppoPartnerApprovedTable">
                    <tbody>
                        <tr>
                            <th>Job Code</th>
                            <th>Job Name</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                        {oppList.map((opp) => (
                            <tr key={opp.OppID}>
                                <td>{opp.OppID}</td>
                                <td>{opp.Name}</td>

                                <td>
                                    <Fragment>
                                        {opp.Confirmed === 1 ?
                                            (
                                                <span style={{ color: 'limegreen' }}>Approved</span>
                                            ) :

                                            opp.Confirmed === 2 ?
                                                (
                                                    <span style={{ color: 'orangered' }}>Not Approved</span>
                                                ) :
                                                (
                                                    <span>Pending </span>)}
                                    </Fragment>

                                </td>
                                <td>
                                    <Fragment>
                                        {opp.Confirmed === 1 ?
                                            (
                                                <button type="button" class="btn btn-primary" onClick={() => submitApprovedOppo(opp.OppID)}>Add</button>
                                            ) : (
                                                <button disabled type="button" title="Button is enabled when status is approved" style={{ pointerEvents: 'auto' }} class="btn btn-primary">Add</button>)}
                                    </Fragment>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )

}
import NavBar from '../components/NavBar';
import axios from 'axios';
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function OppoPartner() {

    const [oppList, setOppList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/oppListing").then((response) => {

            console.log(response);
            setOppList(response.data);

        });
    });


    const styleDiv = {
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const styleButton = {
        display: "flex",
        justifyContent: 'center',
        height: '5vh',
       
    };

    return (
        <div>
            <NavBar />
            <div style={styleButton}>
                <Link to="/AddOppoPartner" className="btn btn-primary" style={{ width: '10%' }}>Add Opportunity</Link>
            </div>
            <div style={styleButton}>
                <Link to="/DeleteOppoPartner" className="btn btn-primary" style={{ width: '10%' }}>Delete Opportunity</Link>
            </div>
            <div style={styleDiv} className="OppoPartner">
            <table style={{
                backgroundColor: '#f3f3f3',
                width: '1300px',
                height: '300px'} }>
                    <tr>
                        <th>Job Code</th>
                        <th>Job Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Address</th>
                        <th>Job Categories</th>
                        <th>Edit/Delete</th>
                </tr>
                {oppList.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.OppID}</td>
                            <td>{val.Name}</td>
                            <td>{val.Description}</td>
                            <td>{val.Location}</td>
                            <td>{val.Address}</td>
                            <td>{val.Type}</td>
                        </tr>
                    )
                })}
            </table>
            </div>
            </div>
    );

}
import NavBar from '../components/NavBar';
import Axios from 'axios';
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';

export default function OppoPartner() {

    Axios.defaults.withCredentials = true;
    const [oppList, setOppList] = useState([]);
    const columns = oppList[0] && Object.keys(oppList[0]);


    const delOppoPartner = (oppId) => {
        Axios.post("http://localhost:3001/deleteOppPartner", {
            oppId: oppId
        }).then(() => {
            console.log("Deleted sucessfully!");
        });
    }




    useEffect(() => {
        Axios.get("http://localhost:3001/oppListing").then((response) => {

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
            <div style={styleDiv} className="OppoPartner">
                <table style={{
                    backgroundColor: '#f3f3f3',
                    width: '1300px',
                    height: '300px',
                }}>
                    <tr>
                        <th>Job Code</th>
                        <th>Job Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Address</th>
                        <th>Job Categories</th>
                        <th>Edit/Delete</th>

                    </tr>
                    {oppList.map(row => <tr>
                        {
                            columns.map(column => <td>{row[column]}</td>)


                        }
                        <Button style={{

                            backgroundColor: '#008000',
                        }}>
                            <FontAwesomeIcon icon={faPencil} />
                        </Button>
                        <Button
                            style={{

                                backgroundColor: '#B22222',
                            }}
                            onClick={() => delOppoPartner(row[columns[0]])}>

                            <FontAwesomeIcon icon={faTrash} />
                        </Button>

                    </tr>

                    )}
                </table>
            </div>
        </div>
    );

}
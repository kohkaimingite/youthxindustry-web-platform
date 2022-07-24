import NavBar from '../components/NavBar';
import Axios from 'axios';
import { React, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import ReadOnlyRow from './ReadOnlyRows';
import EditableRows from './EditableRows';
import "./ForOppoPartner.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function OppoPartner() {

    Axios.defaults.withCredentials = true;

    const [oppList, setOppList] = useState([]);
    const [editFormData, setEditFormData] = useState({
        name: "",
        description: "",
        location: "",
        address: "",
        type: "",
        qualification: "",
        pay: "",
    });

    const [editOppId, setEditOppId] = useState(null);
    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }



    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedOppo = {
            jobcode: editOppId,
            name: editFormData.name,
            description: editFormData.description,
            location: editFormData.location,
            address: editFormData.address,
            type: editFormData.type,
            qualification: editFormData.qualification,
            pay: editFormData.pay,
        }
        const newOppo = [...oppList];

        const index = oppList.findIndex((opp) => opp.OppID === editOppId);

        newOppo[index] = editedOppo;

        setOppList(newOppo);
        setEditOppId(null);

        Axios.post("http://localhost:3001/updateOppPartner", {
            oppId: editOppId,
            name: editedOppo.name,
            description: editedOppo.description,
            location: editedOppo.location,
            address: editedOppo.address,
            type: editedOppo.type,
            qualification: editedOppo.qualification,
            pay: editedOppo.pay,

        })


    }

    const handleEditClick = (event, opp) => {
        event.preventDefault();
        setEditOppId(opp.OppID);

        const formValues = {
            name: opp.Name,
            description: opp.Description,
            location: opp.Location,
            address: opp.Address,
            type: opp.Type,
            qualification: opp.Qualification,
            pay: opp.Pay,
        }

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditOppId(null);
    }

    const handleDeleteClick = (oppId) => {
        const newOppo = [...oppList];
        const index = oppList.findIndex((opp) => opp.OppID === oppId);
        newOppo.splice(index, 1);
        setOppList(newOppo);
        if (
            window.confirm("Confirm Deletion of Job Code: " + oppId + " ?")
        ) {
            Axios.post("http://localhost:3001/deleteOppPartner", {
                oppId: oppId
            }).then(() => {
                console.log("Successfully Deleted.");
            })
                .catch(() => {
                    console.log("Not successfuly deleted.");
                });
        } else {
            window.alert("Action cancelled")
        }
    };


    
    useEffect(() =>  {
        Axios.get("http://localhost:3001/oppListing").then((response) => {

            setOppList(response.data);

        });
    }, [oppList]);


    const styleButton = {
        display: 'flex',
        justifyContent: 'center',
        height: '5vh',

    };

    return (
        <div>
            <NavBar />
            <div style={styleButton}>
                <p style={{ paddingRight: '40px' }}>Number of Opportunities: {oppList.length}</p>
                <Link to="/AddOppoPartner" style={{ width: '10%', height: '100%' }}><FontAwesomeIcon icon={faPlus} />Add Opportunity  </Link>
            </div>
            <div className="OppoPartner">
                <form onSubmit={handleEditFormSubmit}>
                    <table class="OppoPartnerTable">

                        <tr>
                            <th style={{ textAlign: "left" }}>Job Code</th>
                            <th style={{ textAlign: "left" }}>Job Name</th>
                            <th style={{ textAlign: "left" }}>Description</th>
                            <th style={{ textAlign: "left" }}>Location</th>
                            <th style={{ textAlign: "left" }}>Address</th>
                            <th style={{ textAlign: "left" }}>Job Categories</th>
                            <th style={{ textAlign: "left" }}>Qualification</th>
                            <th style={{ textAlign: "left" }}>Pay (SGD) </th>
                            <th style={{ textAlign: "left" }}>Edit</th>
                            <th style={{ textAlign: "left" }}>Delete</th>

                        </tr>
                        {oppList.map((opp) => (
                            <Fragment>
                                {editOppId === opp.OppID ?
                                    (
                                        <EditableRows editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                                    ) : (
                                        <ReadOnlyRow opp={opp} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />)}
                            </Fragment>
                        ))}
                    </table>
                </form>
            </div>
        </div>
    );

}
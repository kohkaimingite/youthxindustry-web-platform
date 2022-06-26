import NavBar from '../components/NavBar';
import Axios from 'axios';
import { React, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import ReadOnlyRow from './ReadOnlyRows';
import EditableRows from './EditableRows';


export default function OppoPartner() {

    Axios.defaults.withCredentials = true;

    const [oppList, setOppList] = useState([]);
    const [editFormData, setEditFormData] = useState({
        name: "",
        description: "",
        location: "",
        address: "",
        type: "",
    });

    const [editOppId, setEditOppId] = useState(null);
    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData};
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
        display: 'flex',
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
                <form onSubmit={handleEditFormSubmit}>
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
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                    {oppList.map((opp) => (
                        <Fragment>
                            {editOppId === opp.OppID ?
                                (
                                    <EditableRows editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                                ) : (
                                    <ReadOnlyRow opp={opp} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>)}
                        </Fragment>
                            ))}          
                    </table>
                    </form>
            </div>
        </div>
    );

}